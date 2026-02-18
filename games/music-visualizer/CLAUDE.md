# Music Visualizer

Canvas-based music visualizer synced to the chiptune song library (57 songs). Pluggable renderer system — new visual styles can be authored independently.

## Architecture

```
music-visualizer/
  index.html              # Hub: full-viewport canvas + overlay UI
  engine.js               # Core: audio, cursor, analysis, canvas, renderer dispatch
  renderers/
    particle-field.js     # Particle bursts from channel quadrants
    waveform-grid.js      # Scrolling note blocks in horizontal lanes
    spectrum-rings.js     # Concentric rotating rings per channel
```

### Engine (`engine.js`) — `window.Visualizer`

Creates an `AudioContext` shared with `ChipPlayer` via `initExternal()`. On song load, normalizes the tracker-native JSON to compact format and runs pre-analysis.

**Pre-analysis** produces:
- `pitchRange` — min/max MIDI across all channels
- `channelRoles` — heuristic role per channel (lead/harmony/bass/percussion)
- `timeline[]` — flattened row-by-row note data for the full sequence
- `energy[]` — 0.0–1.0 per row (note density + pitch spread)
- `sectionChanges[]` — row indices where patterns change
- `totalDuration`, `secondsPerRow`, `secondsPerBeat`

**Song cursor** mirrors ChipPlayer's deterministic timing (`60 / (bpm * rpb)`) from `AudioContext.currentTime`. Computed every frame with fractional interpolation.

**Public API**: `init(canvas)`, `loadSong(json)`, `setRenderer(name)`, `play()`, `stop()`, `setVolume(v)`, `getRendererList()`, `getAnalysis()`, `getSong()`

### Dependencies (not modified)

- `games/audio-tracker/playback-engine.js` — ChipPlayer audio engine
- `games/audio-tracker/songs/index.json` — song manifest (title, category, BPM)
- `games/audio-tracker/songs/*.json` — song data files

## Writing a New Renderer

Register on the global `window.Renderers` object. The engine handles all DOM, audio, and timing — renderers just draw.

```js
window.Renderers['my-renderer'] = {
  name: 'Display Name',

  // Called on song load or renderer switch
  init(ctx, width, height, analysis) {
    // Set up internal state, color palettes, etc.
    // `analysis` contains pitchRange, channelRoles, timeline, energy, etc.
  },

  // Called every animation frame during playback
  render(frameData) {
    // Draw to frameData.ctx (already DPR-scaled, cleared)
  },

  // Optional — called on window resize
  resize(width, height) {},

  // Optional — cleanup when switching away
  destroy() {}
};
```

### `frameData` passed to `render()`

| Field | Type | Description |
|---|---|---|
| `ctx` | CanvasRenderingContext2D | DPR-scaled, pre-cleared |
| `width`, `height` | number | CSS pixels (not physical) |
| `dt` | number | Delta time in seconds since last frame |
| `cursor` | object or null | `{ seqIndex, rowIndex, globalRow, fractionalRow, totalFracRow, beat, bar, elapsed, timelineIndex }` |
| `currentNotes` | array | `[ch0, ch1, ch2, ch3]` — each `{ midi, freq, instrument, wave, vol, channel, normalized }` or `null` |
| `analysis` | object | Pre-computed song analysis (see above) |
| `song` | object | Normalized song JSON |

`cursor` is `null` when stopped. `currentNotes[i].normalized` is 0.0–1.0 within the song's pitch range.

### Renderer rules

- Never touch DOM or manage audio — just draw on the provided `ctx`
- Use `frameData.analysis.channelRoles` to assign visual meaning to channels
- Use `frameData.cursor.beat` / `fractionalRow` for beat-synced effects
- Use `frameData.analysis.energy[cursor.timelineIndex]` for intensity effects
- Handle `cursor === null` gracefully (idle/stopped state)

### Adding to the hub

1. Create `renderers/my-renderer.js`
2. Add a `<script>` tag in `index.html` before the inline `<script>` block
3. It auto-appears in the renderer dropdown

## Embeddability

Other pages can embed a visualizer background:

```html
<canvas id="bg-viz" style="position:fixed;top:0;left:0;width:100%;height:100%"></canvas>
<script src="games/audio-tracker/playback-engine.js"></script>
<script src="games/music-visualizer/engine.js"></script>
<script src="games/music-visualizer/renderers/particle-field.js"></script>
<script>
  Visualizer.init(document.getElementById('bg-viz'));
  fetch('games/audio-tracker/songs/crystal-caves.json')
    .then(r => r.json())
    .then(json => {
      Visualizer.loadSong(json);
      Visualizer.setRenderer('particle-field');
    });
</script>
```
