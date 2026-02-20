/**
 * Starfield Renderer
 * Music-reactive starfield with twinkling stars, shooting stars on beats,
 * and nebula clouds that pulse with energy. Designed as a subtle page
 * background that responds to whatever song is playing.
 *
 * Standalone mode: call Starfield.initStandalone(canvas) to run an
 * independent animation loop. Feed it frame data via onFrame(frameData)
 * when the Visualizer is playing; it falls back to idle animation otherwise.
 */
window.Renderers["starfield"] = (function () {
  "use strict";

  var W = 0, H = 0;
  var analysis = null;
  var stars = [];
  var shootingStars = [];
  var nebulae = [];
  var STAR_COUNT = 300;
  var lastBeat = -1;
  var energySmooth = 0;
  var time = 0;

  // Warm parchment-tinted star color (matches landing page palette)
  var STAR_COLOR = { r: 232, g: 224, b: 208 }; // #e8e0d0

  // Nebula palette — deep purples and golds from the landing page
  var NEBULA_COLORS = [
    { r: 138, g: 92, b: 246, a: 0.015 },  // purple-glow
    { r: 201, g: 168, b: 76, a: 0.012 },   // gold
    { r: 42, g: 26, b: 62, a: 0.025 },     // purple-deep
    { r: 57, g: 255, b: 20, a: 0.006 },    // neon-green hint
    { r: 0, g: 255, b: 247, a: 0.008 }     // neon-cyan hint
  ];

  function createStars(w, h) {
    stars = [];
    for (var i = 0; i < STAR_COUNT; i++) {
      stars.push({
        x: Math.random() * w,
        y: Math.random() * h,
        size: 0.4 + Math.random() * 1.6,
        baseBrightness: 0.2 + Math.random() * 0.6,
        brightness: 0.3,
        twinkleSpeed: 0.3 + Math.random() * 1.5,
        twinkleOffset: Math.random() * Math.PI * 2,
        drift: 0.01 + Math.random() * 0.06
      });
    }
  }

  function createNebulae(w, h) {
    nebulae = [];
    var count = 4 + Math.floor(Math.random() * 3);
    for (var i = 0; i < count; i++) {
      var col = NEBULA_COLORS[i % NEBULA_COLORS.length];
      nebulae.push({
        x: Math.random() * w,
        y: Math.random() * h,
        radius: 80 + Math.random() * 200,
        color: col,
        breatheSpeed: 0.15 + Math.random() * 0.3,
        breatheOffset: Math.random() * Math.PI * 2,
        driftX: (Math.random() - 0.5) * 0.08,
        driftY: (Math.random() - 0.5) * 0.04,
        pulse: 0
      });
    }
  }

  function spawnShootingStar(w, h) {
    var angle = -0.15 - Math.random() * 0.5; // downward-right
    var speed = 300 + Math.random() * 400;
    shootingStars.push({
      x: Math.random() * w * 0.8,
      y: Math.random() * h * 0.4,
      vx: Math.cos(angle) * speed,
      vy: -Math.sin(angle) * speed,
      life: 1,
      decay: 0.8 + Math.random() * 0.6,
      length: 30 + Math.random() * 50,
      brightness: 0.7 + Math.random() * 0.3
    });
  }

  function drawStars(ctx, dt, energy, twinkleMultiplier) {
    for (var i = 0; i < stars.length; i++) {
      var s = stars[i];

      // Drift slowly rightward
      s.x += s.drift * dt * 60;
      if (s.x > W) s.x -= W;

      // Twinkle — faster during intense sections
      var speed = s.twinkleSpeed * (1 + twinkleMultiplier * 2);
      s.brightness = s.baseBrightness +
        Math.sin(time * speed + s.twinkleOffset) * 0.25;

      // Energy boost — stars get brighter during intense music
      s.brightness += energy * 0.3;
      if (s.brightness < 0.05) s.brightness = 0.05;
      if (s.brightness > 1) s.brightness = 1;

      ctx.beginPath();
      ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(" + STAR_COLOR.r + "," + STAR_COLOR.g + "," +
        STAR_COLOR.b + "," + s.brightness + ")";
      ctx.fill();

      // Bright stars get a subtle glow
      if (s.brightness > 0.7 && s.size > 1) {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size * 3, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(" + STAR_COLOR.r + "," + STAR_COLOR.g + "," +
          STAR_COLOR.b + "," + ((s.brightness - 0.7) * 0.15) + ")";
        ctx.fill();
      }
    }
  }

  function drawShootingStars(ctx, dt) {
    for (var i = shootingStars.length - 1; i >= 0; i--) {
      var ss = shootingStars[i];
      ss.x += ss.vx * dt;
      ss.y += ss.vy * dt;
      ss.life -= ss.decay * dt;

      if (ss.life <= 0 || ss.x > W + 50 || ss.y > H + 50) {
        shootingStars.splice(i, 1);
        continue;
      }

      var tailX = ss.x - (ss.vx / Math.sqrt(ss.vx * ss.vx + ss.vy * ss.vy)) * ss.length * ss.life;
      var tailY = ss.y - (ss.vy / Math.sqrt(ss.vx * ss.vx + ss.vy * ss.vy)) * ss.length * ss.life;

      var grad = ctx.createLinearGradient(tailX, tailY, ss.x, ss.y);
      grad.addColorStop(0, "rgba(232,224,208,0)");
      grad.addColorStop(1, "rgba(232,224,208," + (ss.life * ss.brightness * 0.8) + ")");

      ctx.beginPath();
      ctx.moveTo(tailX, tailY);
      ctx.lineTo(ss.x, ss.y);
      ctx.strokeStyle = grad;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Head glow
      ctx.beginPath();
      ctx.arc(ss.x, ss.y, 2, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255,255,240," + (ss.life * 0.6) + ")";
      ctx.fill();
    }
  }

  function drawNebulae(ctx, dt, energy) {
    for (var i = 0; i < nebulae.length; i++) {
      var n = nebulae[i];

      // Gentle drift
      n.x += n.driftX * dt * 60;
      n.y += n.driftY * dt * 60;
      if (n.x < -n.radius) n.x = W + n.radius;
      if (n.x > W + n.radius) n.x = -n.radius;
      if (n.y < -n.radius) n.y = H + n.radius;
      if (n.y > H + n.radius) n.y = -n.radius;

      // Pulse toward energy, decay back
      n.pulse += (energy - n.pulse) * 2 * dt;

      // Breathe + pulse
      var breathe = Math.sin(time * n.breatheSpeed + n.breatheOffset);
      var scale = 1 + breathe * 0.08 + n.pulse * 0.25;
      var alpha = n.color.a * (1 + breathe * 0.3 + n.pulse * 1.5);

      var r = n.radius * scale;
      var grad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, r);
      grad.addColorStop(0, "rgba(" + n.color.r + "," + n.color.g + "," +
        n.color.b + "," + alpha + ")");
      grad.addColorStop(0.6, "rgba(" + n.color.r + "," + n.color.g + "," +
        n.color.b + "," + (alpha * 0.3) + ")");
      grad.addColorStop(1, "rgba(" + n.color.r + "," + n.color.g + "," +
        n.color.b + ",0)");

      ctx.fillStyle = grad;
      ctx.fillRect(n.x - r, n.y - r, r * 2, r * 2);
    }
  }

  function renderFrame(ctx, dt, cursor, currentNotes, songAnalysis) {
    time += dt;
    var energy = 0;
    var twinkleMultiplier = 0;

    if (cursor && songAnalysis) {
      // Get energy from analysis
      energy = songAnalysis.energy[cursor.timelineIndex] || 0;

      // Smooth energy for nebula breathing
      energySmooth += (energy - energySmooth) * 3 * dt;

      twinkleMultiplier = energySmooth;

      // Detect beat hits for shooting stars
      var currentBeat = Math.floor(cursor.totalFracRow / (songAnalysis.rpb || 4));
      if (currentBeat !== lastBeat) {
        lastBeat = currentBeat;
        // Spawn shooting star on strong beats with decent energy
        if (energy > 0.4 && Math.random() < 0.35 + energy * 0.4) {
          spawnShootingStar(W, H);
        }
      }
    } else {
      // Idle mode — gentle ambient twinkle, occasional shooting star
      energySmooth *= 0.98;
      if (Math.random() < 0.001) spawnShootingStar(W, H);
    }

    // Draw layers
    drawNebulae(ctx, dt, energySmooth);
    drawStars(ctx, dt, energySmooth, twinkleMultiplier);
    drawShootingStars(ctx, dt);
  }

  // ---- Standard renderer interface ----
  var renderer = {
    name: "Starfield",

    init: function (ctx, width, height, a) {
      W = width;
      H = height;
      analysis = a;
      time = 0;
      lastBeat = -1;
      energySmooth = 0;
      shootingStars = [];
      createStars(W, H);
      createNebulae(W, H);
    },

    resize: function (width, height) {
      W = width;
      H = height;
      createStars(W, H);
      createNebulae(W, H);
    },

    render: function (fd) {
      var ctx = fd.ctx;
      W = fd.width;
      H = fd.height;
      var dt = fd.dt || 1 / 60;

      // Dark background
      ctx.fillStyle = "#0a0a0f";
      ctx.fillRect(0, 0, W, H);

      renderFrame(ctx, dt, fd.cursor, fd.currentNotes, fd.analysis);
    },

    destroy: function () {
      analysis = null;
      stars = [];
      shootingStars = [];
      nebulae = [];
    }
  };

  // ---- Standalone mode for landing page background ----
  // Runs its own animation loop on a separate canvas, fed by Visualizer frame callbacks.
  var standalone = {
    canvas: null,
    ctx: null,
    raf: null,
    lastTime: 0,
    latestFrameData: null
  };

  renderer.initStandalone = function (canvasEl) {
    standalone.canvas = canvasEl;
    standalone.ctx = canvasEl.getContext("2d");
    standalone.latestFrameData = null;
    standalone.lastTime = 0;

    function sizeCanvas() {
      var dpr = window.devicePixelRatio || 1;
      var cw = window.innerWidth;
      var ch = window.innerHeight;
      canvasEl.width = cw * dpr;
      canvasEl.height = ch * dpr;
      canvasEl.style.width = cw + "px";
      canvasEl.style.height = ch + "px";
      standalone.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      W = cw;
      H = ch;
      createStars(W, H);
      createNebulae(W, H);
    }

    sizeCanvas();
    window.addEventListener("resize", sizeCanvas);
    time = 0;
    lastBeat = -1;
    energySmooth = 0;
    shootingStars = [];

    function loop(timestamp) {
      standalone.raf = requestAnimationFrame(loop);
      var now = timestamp / 1000;
      var dt = standalone.lastTime ? now - standalone.lastTime : 1 / 60;
      standalone.lastTime = now;
      if (dt > 0.1) dt = 1 / 60;

      standalone.ctx.clearRect(0, 0, W, H);

      var fd = standalone.latestFrameData;
      var cursor = fd ? fd.cursor : null;
      var notes = fd ? fd.currentNotes : null;
      var a = fd ? fd.analysis : null;

      renderFrame(standalone.ctx, dt, cursor, notes, a);
    }

    standalone.raf = requestAnimationFrame(loop);
  };

  // Feed frame data from Visualizer callback
  renderer.onFrame = function (frameData) {
    standalone.latestFrameData = frameData;
  };

  renderer.destroyStandalone = function () {
    if (standalone.raf) cancelAnimationFrame(standalone.raf);
    standalone.raf = null;
    standalone.canvas = null;
    standalone.ctx = null;
    standalone.latestFrameData = null;
  };

  return renderer;
})();
