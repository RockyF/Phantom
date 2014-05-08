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
        return Phantom;
    })();
    phantom.Phantom = Phantom;

    var Stage = (function () {
        function Stage(canvas) {
            var _this = this;
            this.frameRate = 30;
            this.backgroundColor = 0x888888;
            this.root = new DisplayObject();
            this.onRender = function () {
                _this.context.fillStyle = ColorUtils.transToWeb(_this.backgroundColor);
                _this.context.fillRect(0, 0, _this.canvas.width, _this.canvas.height);
                _this.root.draw(_this.context);
            };
            this.canvas = canvas;
            this.context = this.canvas.getContext("2d");

            this.start();
        }
        Stage.prototype.start = function () {
            this.signRender = setInterval(this.onRender, 1000 / this.frameRate);
        };

        Stage.prototype.stop = function () {
            if (this.signRender > 0) {
                clearInterval(this.signRender);
            }
        };
        return Stage;
    })();
    phantom.Stage = Stage;

    var ColorUtils = (function () {
        function ColorUtils() {
        }
        ColorUtils.transToWeb = function (color, alpha) {
            if (typeof alpha === "undefined") { alpha = 1; }
            var b = color % 256;
            var g = (color >> 8) % 256;
            var r = color >> 16;
            return StringUtils.format("rgba({0}, {1}, {2}, {3})", r, g, b, alpha);
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

    var Point = (function () {
        function Point(x, y) {
            if (typeof x === "undefined") { x = 0; }
            if (typeof y === "undefined") { y = 0; }
            this.x = 0;
            this.y = 0;
            this.x = x;
            this.y = y;
        }
        return Point;
    })();
    phantom.Point = Point;

    var Graphics = (function () {
        function Graphics(displayObject) {
            this.drawing = false;
            this.fillMode = false;
            this.fillStyle = "";
            this.strokeStyle = "";
            this.drawQueue = [];
            this.displayObject = displayObject;
        }
        Graphics.prototype.pushMethod = function (methodName) {
            var params = [];
            for (var _i = 0; _i < (arguments.length - 1); _i++) {
                params[_i] = arguments[_i + 1];
            }
            this.drawQueue.push({ method: methodName, params: params });
        };

        Graphics.prototype.beginFill = function (color, alpha) {
            if (typeof alpha === "undefined") { alpha = 1; }
            this.pushMethod("beginFill", ColorUtils.transToWeb(color, alpha));
        };

        Graphics.prototype._beginFill = function (context, fillStyle) {
            this.fillMode = true;
            this.fillStyle = fillStyle;
            context.fillStyle = this.fillStyle;
        };

        Graphics.prototype.endFill = function () {
            this.pushMethod("endFill");
        };

        Graphics.prototype._endFill = function (context) {
            this.fillMode = false;
        };

        Graphics.prototype.drawRect = function (x, y, width, height) {
            this.pushMethod("drawRect", x, y, width, height);

            this.displayObject.width = Math.max(this.displayObject.width, x + width);
            this.displayObject.height = Math.max(this.displayObject.height, y + height);
        };

        Graphics.prototype._drawRect = function (context, x, y, width, height) {
            if (this.fillMode) {
                context.save();
                context.translate(this.displayObject.x, this.displayObject.y);
                context.rotate(this.displayObject.rotation);
                context.fillRect(x - this.displayObject.anchorPoint.x, y - this.displayObject.anchorPoint.y, width, height);
                context.restore();
            }
        };

        Graphics.prototype.draw = function (context) {
            this.drawing = true;

            var drawEntity;
            for (var i = 0, len = this.drawQueue.length; i < len; i++) {
                drawEntity = this.drawQueue[i];

                var params = drawEntity.params;
                if (params[0] != context) {
                    params.unshift(context);
                }
                this["_" + drawEntity.method].apply(this, params);
            }

            this.drawing = false;
            return false;
        };
        return Graphics;
    })();
    phantom.Graphics = Graphics;

    var DisplayObject = (function () {
        function DisplayObject() {
            this.x = 0;
            this.y = 0;
            this.width = 0;
            this.height = 0;
            this.rotation = 0;
            this.anchorPoint = new Point();
            this.children = [];
        }
        DisplayObject.prototype.draw = function (context) {
            var child;
            for (var key in this.children) {
                child = this.children[key];
                child.draw(context);
            }
            return true;
        };

        DisplayObject.prototype.addChild = function (child) {
            this.children.push(child);
        };
        return DisplayObject;
    })();
    phantom.DisplayObject = DisplayObject;

    var Sprite = (function (_super) {
        __extends(Sprite, _super);
        function Sprite() {
            _super.call(this);
            this.graphics = new Graphics(this);
        }
        Sprite.prototype.draw = function (context) {
            this.graphics.draw(context);
            return true;
        };
        return Sprite;
    })(DisplayObject);
    phantom.Sprite = Sprite;
})(phantom || (phantom = {}));
