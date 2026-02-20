/**
 * Sheet Music Renderer — scrolling grand-staff notation for the visualizer.
 *
 * Adapted from the Cathedral Organ's SheetMusic module to work with the
 * visualizer renderer API.  Draws treble + bass staves, clefs, noteheads,
 * stems, accidentals, ledger lines, bar lines, and a glowing playhead —
 * all driven by the engine's frameData.
 */
window.Renderers['sheet-music'] = (function () {
  'use strict';

  // ── Colors ──

  var CHANNEL_COLORS = [
    '#b8954a',   // ch0 gold
    '#c06080',   // ch1 rose
    '#9b7ab8',   // ch2 purple
    '#cccccc'    // ch3 silver
  ];
  var CHANNEL_COLORS_DIM = [
    'rgba(184,149,74,0.2)',
    'rgba(192,96,128,0.2)',
    'rgba(155,122,184,0.2)',
    'rgba(204,204,204,0.2)'
  ];
  var CHANNEL_COLORS_MED = [
    'rgba(184,149,74,0.6)',
    'rgba(192,96,128,0.6)',
    'rgba(155,122,184,0.6)',
    'rgba(204,204,204,0.6)'
  ];

  var STAFF_LINE_COLOR = 'rgba(216,207,192,0.3)';
  var CURSOR_COLOR     = 'rgba(184,149,74,0.6)';
  var LEDGER_COLOR     = 'rgba(216,207,192,0.2)';
  var BG_COLOR         = '#110e18';

  // ── Layout constants ──

  var LINE_SPACING  = 10;
  var STAFF_GAP     = 60;
  var NOTE_HEAD_RX  = 6;
  var NOTE_HEAD_RY  = 4.5;
  var CURSOR_X_FRAC = 0.15;
  var PIXELS_PER_ROW = 40;
  var SCROLL_MARGIN  = 80;

  // ── State ──

  var W = 0, H = 0;
  var staffTop = 0, trebleBottom = 0, bassTop = 0, bassBottom = 0;
  var cursorX = 0;

  var timeline = [];       // [{row, midi, channel, duration, staffPos, sharp}]
  var totalRows = 0;
  var maxNoteDurationRows = 1;
  var rpb = 4;

  // ── Note → staff position ──

  var DIATONIC_MAP = [0, 0, 1, 1, 2, 3, 3, 4, 4, 5, 5, 6];
  var IS_SHARP     = [0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0];

  function midiToStaffPos(midi) {
    var octave   = Math.floor(midi / 12) - 1;
    var semitone = midi % 12;
    return {
      pos:   (octave - 4) * 7 + DIATONIC_MAP[semitone],
      sharp: IS_SHARP[semitone]
    };
  }

  function staffPosToY(pos) {
    if (pos >= 0) {
      return trebleBottom - (pos - 2) * (LINE_SPACING / 2);
    }
    return bassTop - (pos + 2) * (LINE_SPACING / 2);
  }

  // ── Build timeline from visualizer analysis ──
  //
  // The engine's analysis.timeline is row-indexed: timeline[row][ch] = noteObj | null
  // We need a flat list with duration for notation rendering, similar to what the
  // organ's sheet-music.js builds from raw pattern data.

  function buildTimeline(analysis) {
    timeline = [];
    maxNoteDurationRows = 1;
    if (!analysis || !analysis.timeline) return;

    var rows = analysis.timeline;
    totalRows = rows.length;
    rpb = analysis.rpb || 4;
    var numCh = analysis.numChannels || 4;

    // For each channel, walk forward and coalesce consecutive held notes
    for (var ch = 0; ch < numCh; ch++) {
      var noteStart = -1;
      var noteMidi  = 0;

      for (var r = 0; r < rows.length; r++) {
        var cell = rows[r] ? rows[r][ch] : null;

        if (cell && cell.midi > 0) {
          if (cell.held && noteStart >= 0 && noteMidi === cell.midi) {
            // Continuation of the same note — extend duration
            continue;
          }
          // New note — close previous if any
          if (noteStart >= 0) {
            pushNote(noteStart, noteMidi, ch, r - noteStart);
          }
          noteStart = r;
          noteMidi  = cell.midi;
        } else {
          // Gap or null — close previous
          if (noteStart >= 0) {
            pushNote(noteStart, noteMidi, ch, r - noteStart);
            noteStart = -1;
          }
        }
      }
      // Close trailing note
      if (noteStart >= 0) {
        pushNote(noteStart, noteMidi, ch, rows.length - noteStart);
      }
    }

    timeline.sort(function (a, b) { return a.row - b.row; });
  }

  function pushNote(row, midi, channel, duration) {
    var dur = Math.max(duration, 1);
    if (dur > maxNoteDurationRows) maxNoteDurationRows = dur;
    var sp = midiToStaffPos(midi);
    timeline.push({
      row:      row,
      midi:     midi,
      channel:  channel,
      duration: dur,
      staffPos: sp.pos,
      sharp:    sp.sharp
    });
  }

  // Binary search — find first timeline entry with row >= threshold
  function findFirst(rowThreshold) {
    var lo = 0, hi = timeline.length;
    while (lo < hi) {
      var mid = (lo + hi) >> 1;
      if (timeline[mid].row < rowThreshold) lo = mid + 1;
      else hi = mid;
    }
    return lo;
  }

  // ── Layout ──

  function computeLayout(width, height) {
    W = width;
    H = height;
    var totalStaffH = LINE_SPACING * 4 * 2 + STAFF_GAP;
    staffTop     = (H - totalStaffH) / 2;
    trebleBottom = staffTop + LINE_SPACING * 4;
    bassTop      = trebleBottom + STAFF_GAP;
    bassBottom   = bassTop + LINE_SPACING * 4;
    cursorX      = SCROLL_MARGIN + (W - SCROLL_MARGIN * 2) * CURSOR_X_FRAC;
  }

  // ── Drawing helpers ──

  function drawStaves(ctx) {
    ctx.strokeStyle = STAFF_LINE_COLOR;
    ctx.lineWidth = 1;
    for (var i = 0; i < 5; i++) {
      var y = staffTop + i * LINE_SPACING;
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
    }
    for (var j = 0; j < 5; j++) {
      var y2 = bassTop + j * LINE_SPACING;
      ctx.beginPath(); ctx.moveTo(0, y2); ctx.lineTo(W, y2); ctx.stroke();
    }
    // Brace hint
    ctx.strokeStyle = 'rgba(216,207,192,0.15)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(SCROLL_MARGIN - 20, staffTop);
    ctx.lineTo(SCROLL_MARGIN - 20, bassBottom);
    ctx.stroke();
    ctx.lineWidth = 1;
  }

  function drawClefs(ctx) {
    ctx.fillStyle = 'rgba(216,207,192,0.45)';
    drawTrebleClef(ctx, SCROLL_MARGIN - 8, staffTop + LINE_SPACING * 2);
    drawBassClef(ctx, SCROLL_MARGIN - 8, bassTop + LINE_SPACING);
  }

  function drawTrebleClef(ctx, cx, cy) {
    ctx.save();
    ctx.strokeStyle = 'rgba(216,207,192,0.4)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(cx + 2, cy + LINE_SPACING * 2.5);
    ctx.bezierCurveTo(cx - 8, cy + LINE_SPACING * 1.5, cx - 8, cy - LINE_SPACING, cx + 2, cy - LINE_SPACING * 0.5);
    ctx.bezierCurveTo(cx + 10, cy, cx + 10, cy + LINE_SPACING * 1.2, cx, cy + LINE_SPACING * 1.5);
    ctx.bezierCurveTo(cx - 6, cy + LINE_SPACING * 1.8, cx - 4, cy + LINE_SPACING * 2.2, cx + 2, cy + LINE_SPACING * 2.5);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(cx + 2, cy - LINE_SPACING * 2);
    ctx.lineTo(cx + 2, cy + LINE_SPACING * 2.5);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(cx + 2, cy + LINE_SPACING * 2.8, 2.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  function drawBassClef(ctx, cx, cy) {
    ctx.save();
    ctx.strokeStyle = 'rgba(216,207,192,0.4)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(cx, cy, LINE_SPACING * 1.2, -Math.PI * 0.8, Math.PI * 0.4);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(cx + 2, cy - LINE_SPACING * 0.3, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(cx + LINE_SPACING * 1.5, cy - LINE_SPACING * 0.5, 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(cx + LINE_SPACING * 1.5, cy + LINE_SPACING * 0.5, 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  function drawCursor(ctx) {
    ctx.strokeStyle = CURSOR_COLOR;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(cursorX, staffTop - 15);
    ctx.lineTo(cursorX, bassBottom + 15);
    ctx.stroke();
    ctx.lineWidth = 1;
    // Glow
    var grad = ctx.createLinearGradient(cursorX - 20, 0, cursorX + 20, 0);
    grad.addColorStop(0, 'rgba(184,149,74,0)');
    grad.addColorStop(0.5, 'rgba(184,149,74,0.06)');
    grad.addColorStop(1, 'rgba(184,149,74,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(cursorX - 20, staffTop - 15, 40, bassBottom - staffTop + 30);
  }

  function drawBarLines(ctx, currentRowFrac) {
    if (totalRows === 0) return;
    var beatsPerBar = 4;
    var rowsPerBar  = rpb * beatsPerBar;

    ctx.strokeStyle = 'rgba(216,207,192,0.12)';
    ctx.lineWidth = 1;

    for (var bar = 0; bar <= Math.ceil(totalRows / rowsPerBar); bar++) {
      var barRow = bar * rowsPerBar;
      var x = cursorX + (barRow - currentRowFrac) * PIXELS_PER_ROW;
      if (x < -10 || x > W + 10) continue;
      ctx.beginPath(); ctx.moveTo(x, staffTop);    ctx.lineTo(x, trebleBottom); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(x, bassTop);     ctx.lineTo(x, bassBottom);   ctx.stroke();
    }
  }

  function drawOneLedger(ctx, x, ly, lw) {
    ctx.beginPath(); ctx.moveTo(x - lw / 2, ly); ctx.lineTo(x + lw / 2, ly); ctx.stroke();
  }

  function drawLedgerLines(ctx, x, y, staffPos) {
    ctx.strokeStyle = LEDGER_COLOR;
    ctx.lineWidth = 1;
    var lw = NOTE_HEAD_RX * 2 + 8;

    if (staffPos >= 0) {
      if (staffPos <= 0) {
        for (var p = 0; p >= staffPos; p -= 2) drawOneLedger(ctx, x, staffPosToY(p), lw);
      }
      if (staffPos >= 12) {
        for (var p2 = 12; p2 <= staffPos; p2 += 2) drawOneLedger(ctx, x, staffPosToY(p2), lw);
      }
    } else {
      if (staffPos >= 0) {
        for (var p3 = 0; p3 <= staffPos; p3 += 2) drawOneLedger(ctx, x, staffPosToY(p3), lw);
      }
      if (staffPos <= -12) {
        for (var p4 = -12; p4 >= staffPos; p4 -= 2) drawOneLedger(ctx, x, staffPosToY(p4), lw);
      }
    }
  }

  function drawNotes(ctx, currentRowFrac) {
    if (timeline.length === 0) return;

    var leftRow  = currentRowFrac - (cursorX + SCROLL_MARGIN) / PIXELS_PER_ROW;
    var rightRow = currentRowFrac + (W - cursorX + SCROLL_MARGIN) / PIXELS_PER_ROW;
    var startIdx = findFirst(leftRow - maxNoteDurationRows);

    for (var i = startIdx; i < timeline.length; i++) {
      var note = timeline[i];
      var noteEnd = note.row + note.duration;
      if (noteEnd < leftRow) continue;
      if (note.row > rightRow) break;

      var x = cursorX + (note.row - currentRowFrac) * PIXELS_PER_ROW;
      var y = staffPosToY(note.staffPos);

      var pastCursor = note.row < currentRowFrac;
      var atCursor   = note.row <= currentRowFrac && noteEnd > currentRowFrac;

      var dimColor    = CHANNEL_COLORS_DIM[note.channel % 4];
      var medColor    = CHANNEL_COLORS_MED[note.channel % 4];
      var brightColor = CHANNEL_COLORS[note.channel % 4];
      var noteColor   = atCursor ? brightColor : (pastCursor ? dimColor : medColor);

      // Duration beam
      var noteW = note.duration * PIXELS_PER_ROW;
      var beamH = 4;
      var beamW = Math.max(1, noteW - NOTE_HEAD_RX);
      ctx.fillStyle = noteColor;
      ctx.fillRect(x + NOTE_HEAD_RX, y - beamH / 2, beamW, beamH);

      // Ledger lines
      drawLedgerLines(ctx, x, y, note.staffPos);

      // Accidental
      if (note.sharp) {
        ctx.fillStyle = noteColor;
        ctx.font = '14px serif';
        ctx.fillText('#', x - NOTE_HEAD_RX - 12, y + 5);
      }

      // Notehead
      ctx.fillStyle = noteColor;
      ctx.beginPath();
      ctx.ellipse(x, y, NOTE_HEAD_RX, NOTE_HEAD_RY, -0.2, 0, Math.PI * 2);
      ctx.fill();

      // Glow on active notes
      if (atCursor) {
        ctx.shadowColor = brightColor;
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.ellipse(x, y, NOTE_HEAD_RX, NOTE_HEAD_RY, -0.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.shadowColor = 'transparent';
      }

      // Stem
      var stemH = LINE_SPACING * 3.5;
      ctx.strokeStyle = noteColor;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      if (note.staffPos >= 0) {
        ctx.moveTo(x + NOTE_HEAD_RX - 1, y);
        ctx.lineTo(x + NOTE_HEAD_RX - 1, y + stemH);
      } else {
        ctx.moveTo(x + NOTE_HEAD_RX - 1, y);
        ctx.lineTo(x + NOTE_HEAD_RX - 1, y - stemH);
      }
      ctx.stroke();
      ctx.lineWidth = 1;
    }
  }

  // ── Renderer API ──

  return {
    name: 'Sheet Music',

    init: function (ctx, width, height, analysis) {
      computeLayout(width, height);
      if (analysis) buildTimeline(analysis);
    },

    resize: function (width, height) {
      computeLayout(width, height);
    },

    render: function (fd) {
      var ctx = fd.ctx;
      W = fd.width;
      H = fd.height;

      // Background
      ctx.fillStyle = BG_COLOR;
      ctx.fillRect(0, 0, W, H);

      // Recompute vertical layout each frame (cheap, handles resize)
      var totalStaffH = LINE_SPACING * 4 * 2 + STAFF_GAP;
      staffTop     = (H - totalStaffH) / 2;
      trebleBottom = staffTop + LINE_SPACING * 4;
      bassTop      = trebleBottom + STAFF_GAP;
      bassBottom   = bassTop + LINE_SPACING * 4;
      cursorX      = SCROLL_MARGIN + (W - SCROLL_MARGIN * 2) * CURSOR_X_FRAC;

      if (!fd.cursor) {
        // Idle — draw staves and clefs, cursor at start
        drawStaves(ctx);
        drawClefs(ctx);
        drawCursor(ctx);
        drawNotes(ctx, -2);
        drawBarLines(ctx, -2);

        ctx.fillStyle = 'rgba(216,207,192,0.15)';
        ctx.font = '14px serif';
        ctx.textAlign = 'center';
        ctx.fillText('Press play to see the score', W / 2, bassBottom + 50);
        ctx.textAlign = 'start';
        return;
      }

      var currentRowFrac = fd.cursor.totalFracRow;

      drawStaves(ctx);
      drawClefs(ctx);
      drawNotes(ctx, currentRowFrac);
      drawCursor(ctx);
      drawBarLines(ctx, currentRowFrac);
    },

    destroy: function () {
      timeline = [];
      totalRows = 0;
    }
  };
})();
