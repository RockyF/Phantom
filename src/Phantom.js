/**
* Created by RockyF on 14-5-12.
*/
var StringUtils = (function () {
    function StringUtils() {
    }
    StringUtils.format = function (fmt) {
        var params = [];
        for (var _i = 0; _i < (arguments.length - 1); _i++) {
            params[_i] = arguments[_i + 1];
        }
        var result = fmt;
        for (var i = 0, len = params.length; i < len; i++) {
            result = result.replace('{' + i + '}', params[i]);
        }

        return result;
    };
    return StringUtils;
})();

var ColorUtils = (function () {
    function ColorUtils() {
    }
    ColorUtils.toWeb = function (color, alpha) {
        if (typeof alpha === "undefined") { alpha = 1; }
        var b = color % 256;
        var g = (color >> 8) % 256;
        var r = color >> 16;
        return StringUtils.format('rgba({0}, {1}, {2}, {3})', r, g, b, alpha);
    };
    return ColorUtils;
})();

var Color = (function () {
    function Color(color, alpha) {
        if (typeof color === "undefined") { color = 0; }
        if (typeof alpha === "undefined") { alpha = 1; }
        this.color = 0;
        this.alpha = 1;
        this.color = color;
        this.alpha = alpha;
    }
    Color.prototype.toWeb = function () {
        var b = this.color % 256;
        var g = (this.color >> 8) % 256;
        var r = this.color >> 16;
        return StringUtils.format('rgba({0}, {1}, {2}, {3})', r, g, b, this.alpha);
    };

    Color.prototype.toHex = function () {
        return '#' + this.color.toString(16);
    };

    Color.prototype.fromWeb = function (value) {
        value = value.substring(value.indexOf('(') + 1, value.lastIndexOf(')'));
        var arr = value.split(',');

        var r = parseInt(arr[0]);
        var g = parseInt(arr[1]);
        var b = parseInt(arr[2]);
        this.color = r << 16 + g << 8 + b;
        if (arr.length == 4) {
            this.alpha = parseFloat(arr[3]);
        }
    };

    Color.prototype.fromHex = function (value) {
        if (value.indexOf('#')) {
            value = value.substr(0);
        }
        this.color = parseInt(value, 16);
    };
    return Color;
})();

var Point = (function () {
    function Point(x, y) {
        if (typeof x === "undefined") { x = 0; }
        if (typeof y === "undefined") { y = 0; }
        this.x = 0;
        this.y = 0;
        this.x = x;
        this.y = y;
    }
    Point.prototype.distance = function (p) {
        return Math.sqrt((p.x + this.x) * (p.x + this.x) + (p.y + this.y) * (p.y + this.y));
    };
    return Point;
})();
