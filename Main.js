/**
* Created by lenovo on 14-5-7.
*/
/// <reference path="Phantom.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
window.onload = function () {
    var canvas = document.getElementById('canvasStage');
    new Test(canvas);
    var a = new CanvasRenderingContext2D();
};

var Test = (function (_super) {
    __extends(Test, _super);
    function Test(canvas) {
        _super.call(this);
        this.boxs = [];
        this.canvas = canvas;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.stage = new phantom.Stage(canvas, this);
        this.init();
    }
    Test.prototype.init = function () {
        /*var bg = new Box(0xFF0000, 0.5, 300, 200);
        bg.x = bg.y = 20;
        this.addChild(bg);*/
        this.circle = new Circle(20);
        this.circle.x = 100;
        this.circle.y = 100;
        this.circle.addEventListener(phantom.MouseEvent.MOUSE_MOVE, this.onMouseMove);

        //this.circle.alpha = 0.5;
        this.addChild(this.circle);
    };

    Test.prototype.onMouseMove = function (event) {
        console.log(event.localX, event.localY);
    };
    return Test;
})(phantom.Sprite);

var Box = (function (_super) {
    __extends(Box, _super);
    function Box(color, alpha, width, height, anchorX, anchorY) {
        if (typeof anchorX === "undefined") { anchorX = 0; }
        if (typeof anchorY === "undefined") { anchorY = 0; }
        _super.call(this);

        this.graphics.lineStyle(3, 0xFFFFFF, 1, false, "nomal", null, "ound");
        this.graphics.beginFill(color, alpha);
        this.graphics.drawRect(0, 0, width, height);
        this.graphics.endFill();
        this.anchorPoint = new phantom.Point(anchorX, anchorY);
    }
    return Box;
})(phantom.Sprite);

var Circle = (function (_super) {
    __extends(Circle, _super);
    function Circle(r) {
        _super.call(this);
        this.o = 0;

        this.graphics.lineStyle(1, 0xFFFFFF, 1);
        this.graphics.beginFill(0xFFFFFF, 0.5);
        this.graphics.drawCircle(0, 0, r);
        this.graphics.moveTo(0, 0);
        this.graphics.lineTo(r, 0);
        this.graphics.endFill();
    }
    Circle.prototype.onEnterFrame = function () {
        _super.prototype.onEnterFrame.call(this);
        this.o += 0.05;

        this.rotation = this.o;
    };
    return Circle;
})(phantom.Sprite);
