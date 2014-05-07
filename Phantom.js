/**
* Created by lenovo on 14-5-7.
*/
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var phantom;
(function (phantom) {
    var Phantom = (function () {
        function Phantom() {
        }
        Phantom.init = function (canvas) {
            Phantom.canvas = canvas;
            Phantom.context = canvas.getContext("2d");
        };
        return Phantom;
    })();
    phantom.Phantom = Phantom;

    var Stage = (function () {
        function Stage() {
        }
        return Stage;
    })();
    phantom.Stage = Stage;

    var ColorUtils = (function () {
        function ColorUtils() {
        }
        ColorUtils.transToWeb = function (color, alpha) {
            return StringUtils.format("#{0}{1}", Math.ceil(alpha * 256).toString(16), color.toString(16));
        };
        return ColorUtils;
    })();
    phantom.ColorUtils = ColorUtils;

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
                result = result.replace("{" + i + "}", params[i]);
            }

            return result;
        };
        return StringUtils;
    })();
    phantom.StringUtils = StringUtils;

    var Graphics = (function () {
        function Graphics() {
        }
        Graphics.prototype.beginFill = function (color, alpha) {
            if (typeof alpha === "undefined") { alpha = 1; }
            this.fillStyle = ColorUtils.transToWeb(color, alpha);
        };

        Graphics.prototype.drawRect = function (x, y, width, height) {
            if (this.fillStyle) {
                this._context.fillRect(x, y, width, height);
            }
        };

        Graphics.prototype.draw = function (stage, context) {
            if (this.fillStyle) {
                context.fillStyle = this.fillStyle;
                context.fillRect(x, y, width, height);
            }
            return false;
        };
        return Graphics;
    })();
    phantom.Graphics = Graphics;

    var DisplayObject = (function () {
        function DisplayObject() {
            this.graphics = new Graphics();
        }
        return DisplayObject;
    })();
    phantom.DisplayObject = DisplayObject;

    var Sprite = (function (_super) {
        __extends(Sprite, _super);
        function Sprite() {
            _super.call(this);
        }
        Sprite.prototype.draw = function (stage, context) {
            return undefined;
        };
        return Sprite;
    })(DisplayObject);
    phantom.Sprite = Sprite;
})(phantom || (phantom = {}));
