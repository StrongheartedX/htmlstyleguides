/* video-utils.js — shared helpers for music video renderers */
(function() {
    'use strict';

    window.lerp = function(a, b, t) { return a + (b - a) * t; };

    window.lerpExp = function(current, target, speed, dt) {
        return current + (target - current) * (1 - Math.exp(-speed * dt));
    };

    window.clamp01 = function(v) { return v < 0 ? 0 : v > 1 ? 1 : v; };

    window.rand = function(min, max) { return min + Math.random() * (max - min); };

    window.randInt = function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    window.pickRandom = function(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    };

    window.hexToRgb = function(hex) {
        return {
            r: parseInt(hex.slice(1, 3), 16),
            g: parseInt(hex.slice(3, 5), 16),
            b: parseInt(hex.slice(5, 7), 16)
        };
    };

    window.rgba = function(hex, a) {
        var c = hexToRgb(hex);
        return 'rgba(' + c.r + ',' + c.g + ',' + c.b + ',' + a + ')';
    };
})();
