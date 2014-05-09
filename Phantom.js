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
        function Stage(canvas, root) {
            var _this = this;
            this.frameRate = 30;
            this.backgroundColor = 0x888888;
            this.onRender = function () {
                _this.context.fillStyle = ColorUtils.transToWeb(_this.backgroundColor);
                _this.context.fillRect(0, 0, _this.canvas.width, _this.canvas.height);
                _this.root.draw(_this.context);
                _this.root.onEnterFrame();
            };
            this.canvas = canvas;
            this.root = root;
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
            return stringUtils.format("rgba({0}, {1}, {2}, {3})", r, g, b, alpha);
        };
        return ColorUtils;
    })();
    phantom.ColorUtils = ColorUtils;

    var stringUtils = (function () {
        function stringUtils() {
        }
        stringUtils.format = function (fmt) {
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
        return stringUtils;
    })();
    phantom.stringUtils = stringUtils;

    var Handler = (function () {
        function Handler(method) {
            var params = [];
            for (var _i = 0; _i < (arguments.length - 1); _i++) {
                params[_i] = arguments[_i + 1];
            }
            this.method = method;
            this.params = params;
        }
        Handler.prototype.execute = function () {
            this.method.apply(null, this.params);
        };

        Handler.prototype.executeWitd = function () {
            var params = [];
            for (var _i = 0; _i < (arguments.length - 0); _i++) {
                params[_i] = arguments[_i + 0];
            }
            this.method.apply(null, params.concat(this.params));
        };
        return Handler;
    })();
    phantom.Handler = Handler;

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
            this.lineMode = false;
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
            this.pushMethod("beginFill", color, alpha);
        };

        Graphics.prototype._beginFill = function (context, color, alpha) {
            this.fillMode = true;
            context.fillStyle = ColorUtils.transToWeb(color, alpha * this.displayObject.alpha);
        };

        Graphics.prototype.lineStyle = function (thickness, color, alpha, pixelHinting, scaleMode, caps, joints, miterLimit) {
            if (typeof thickness === "undefined") { thickness = NaN; }
            if (typeof color === "undefined") { color = 0; }
            if (typeof alpha === "undefined") { alpha = 1.0; }
            if (typeof pixelHinting === "undefined") { pixelHinting = false; }
            if (typeof scaleMode === "undefined") { scaleMode = "normal"; }
            if (typeof caps === "undefined") { caps = null; }
            if (typeof joints === "undefined") { joints = null; }
            if (typeof miterLimit === "undefined") { miterLimit = 3; }
            this.pushMethod("lineStyle", thickness, color, alpha, pixelHinting, scaleMode, caps, joints, miterLimit);
        };

        Graphics.prototype._lineStyle = function (context, thickness, color, alpha, pixelHinting, scaleMode, caps, joints, miterLimit) {
            if (typeof thickness === "undefined") { thickness = NaN; }
            if (typeof color === "undefined") { color = 0; }
            if (typeof alpha === "undefined") { alpha = 1.0; }
            if (typeof pixelHinting === "undefined") { pixelHinting = false; }
            if (typeof scaleMode === "undefined") { scaleMode = "normal"; }
            if (typeof caps === "undefined") { caps = null; }
            if (typeof joints === "undefined") { joints = null; }
            if (typeof miterLimit === "undefined") { miterLimit = 3; }
            var style = ColorUtils.transToWeb(color, alpha * this.displayObject.alpha);

            context.lineWidth = thickness;
            context.lineStyle = style;
            context.strokeStyle = style;
            context.lineCap = caps;
            context.lineJoin = joints;
            context.miterLimit = miterLimit;

            this.lineMode = thickness > 0;
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
                context.fillRect(x - this.displayObject.anchorPoint.x, y - this.displayObject.anchorPoint.y, width, height);
            }
            if (this.lineMode) {
                context.strokeRect(x - this.displayObject.anchorPoint.x, y - this.displayObject.anchorPoint.y, width, height);
            }
        };

        Graphics.prototype.lineTo = function (x, y) {
            this.pushMethod("lineTo", x, y);
            this.displayObject.width = Math.max(this.displayObject.width, x);
            this.displayObject.height = Math.max(this.displayObject.height, y);
        };

        Graphics.prototype._lineTo = function (context, x, y) {
            context.lineTo(x, y);
            context.stroke();
        };

        Graphics.prototype.moveTo = function (x, y) {
            this.pushMethod("moveTo", x, y);
        };

        Graphics.prototype._moveTo = function (context, x, y) {
            context.moveTo(x, y);
        };

        Graphics.prototype.drawCircle = function (x, y, r) {
            this.pushMethod("drawCircle", x, y, r);

            this.displayObject.width = Math.max(this.displayObject.width, x + r);
            this.displayObject.height = Math.max(this.displayObject.height, y + r);
        };

        Graphics.prototype._drawCircle = function (context, x, y, r) {
            context.beginPath();
            context.arc(x - this.displayObject.anchorPoint.x, y - this.displayObject.anchorPoint.y, r, 0, Math.PI * 2, true);
            context.closePath();
            if (this.fillMode) {
                context.fill();
            }
            if (this.lineMode) {
                context.stroke();
            }
        };

        Graphics.prototype._dealRTS = function (context) {
            context.translate(this.displayObject.x, this.displayObject.y);
            context.scale(this.displayObject.scaleX, this.displayObject.scaleY);
            context.rotate(this.displayObject.rotation);
        };

        Graphics.prototype.draw = function (context) {
            this.drawing = true;

            context.save();
            this._dealRTS(context);
            var drawEntity;
            for (var i = 0, len = this.drawQueue.length; i < len; i++) {
                drawEntity = this.drawQueue[i];

                var params = drawEntity.params;
                if (params[0] != context) {
                    params.unshift(context);
                }
                this["_" + drawEntity.method].apply(this, params);
            }
            context.restore();

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
            this.alpha = 1;
            this.rotation = 0;
            this.scaleX = 1;
            this.scaleY = 1;
            this.anchorPoint = new Point();
            this.children = [];
        }
        DisplayObject.prototype.draw = function (context) {
            var child;
            for (var key in this.children) {
                child = this.children[key];
                child.draw(context);
                child.onEnterFrame();
            }
            return true;
        };

        DisplayObject.prototype.addChild = function (child) {
            this.children.push(child);
        };

        DisplayObject.prototype.onEnterFrame = function () {
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
            _super.prototype.draw.call(this, context);
            this.graphics.draw(context);
            return true;
        };

        Sprite.prototype.onEnterFrame = function () {
            _super.prototype.onEnterFrame.call(this);
        };
        return Sprite;
    })(DisplayObject);
    phantom.Sprite = Sprite;
})(phantom || (phantom = {}));
