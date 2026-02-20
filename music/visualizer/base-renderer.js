/* base-renderer.js — factory for music video renderer boilerplate
 *
 * Eliminates repeated beat-detection logic found in every video renderer.
 * Handles: window.Renderers registration, lastBeat tracking, beatPulse decay.
 * Renderers keep their own W/H/analysis/flashAlpha and other state.
 *
 * Usage:
 *
 *   (function() {
 *     var W = 0, H = 0, analysis = null;
 *     var beatPulse = 0, flashAlpha = 0;
 *
 *     function init(ctx, w, h, anal) { W = w; H = h; analysis = anal; ... }
 *     function resize(w, h) { W = w; H = h; }
 *
 *     function render(frameData) {
 *       var dt = frameData.dt, cursor = frameData.cursor;
 *       beatPulse = frameData.beatPulse;  // sync from factory
 *       if (!cursor) return;
 *
 *       if (frameData.beatChanged) {
 *         // spawn effects, change scenes ...
 *       }
 *       flashAlpha *= Math.exp(-5 * dt);  // renderer manages own flash
 *       // ... draw ...
 *     }
 *
 *     BaseRenderer('slug', 'Display Name', {
 *       beatDecay: 8,  // exponential decay rate (default 8)
 *       init: init, render: render, resize: resize
 *     });
 *   })();
 */
(function() {
    'use strict';

    window.BaseRenderer = function(slug, displayName, config) {
        var lastBeat = -1;
        var beatPulse = 0;

        var beatDecay = config.beatDecay !== undefined ? config.beatDecay : 8;
        var useExpDecay = config.expDecay !== undefined ? config.expDecay : true;

        window.Renderers[slug] = {
            name: displayName,

            init: function(ctx, w, h, analysis) {
                lastBeat = -1;
                beatPulse = 0;
                if (config.init) config.init(ctx, w, h, analysis);
            },

            resize: function(w, h) {
                if (config.resize) config.resize(w, h);
            },

            render: function(frameData) {
                var dt = frameData.dt || 1 / 60;
                var cursor = frameData.cursor;

                // Beat detection
                var beatChanged = false;
                if (cursor) {
                    var b = cursor.beat;
                    if (b !== lastBeat) {
                        beatChanged = true;
                        beatPulse = 1;
                        lastBeat = b;
                    }
                }

                // Decay
                if (useExpDecay) {
                    beatPulse *= Math.exp(-beatDecay * dt);
                } else {
                    beatPulse *= beatDecay;
                }

                // Patch onto frameData
                frameData.beatPulse = beatPulse;
                frameData.beatChanged = beatChanged;

                config.render(frameData);
            },

            destroy: function() {
                if (config.destroy) config.destroy();
            }
        };
    };
})();
