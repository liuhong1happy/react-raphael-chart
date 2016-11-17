"use strict";

var Vector2 = function Vector2(x, y) {
    this.x = x;
    this.y = y;
};

Vector2.prototype = {
    "length": function length() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    },
    "normalize": function normalize() {
        var len = this.length();
        var inv = len == 0 ? 0 : 1 / len;
        return new Vector2(this.x * inv, this.y * inv);
    },
    "add": function add(v) {
        return new Vector2(this.x + v.x, this.y + v.y);
    },
    "multiply": function multiply(f) {
        return new Vector2(this.x * f, this.y * f);
    },
    "dot": function dot(v) {
        return this.x * v.x + this.y * v.y;
    },
    "angle": function angle(v) {
        return Math.acos(this.dot(v) / (this.length() * v.length())) * 180 / Math.PI;
    }
};

module.exports = Vector2;