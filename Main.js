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
};

var Test = (function (_super) {
    __extends(Test, _super);
    function Test(canvas) {
        var _this = this;
        _super.call(this);
        this.boxs = [];
        this.sx = 1;
        this.sy = 1;
        this.o = 0;
        this.onTimer = function () {
            _this.o += 0.05;

            _this.circle.rotation = _this.o;
            /*this.boxs[0].scaleX = this.o;
            this.boxs[0].scaleY = this.o;*/
            /*for(var i = 0; i < 100; i++){
            var box = this.boxs[i];
            
            box.rotation += box.sr;
            }*/
            /*this.sprite.x += this.sx;
            this.sprite.y += this.sy;
            
            if(this.sprite.x + this.sprite.width >= this.canvas.width || this.sprite.x <= 0){
            this.sx = -this.sx;
            }
            if(this.sprite.y + this.sprite.height >= this.canvas.height || this.sprite.y <= 0){
            this.sy = -this.sy;
            }*/
        };
        this.canvas = canvas;
        this.stage = new phantom.Stage(canvas);
        this.init();
    }
    Test.prototype.init = function () {
        var bg = new Box(0xFF0000, 0.5, 300, 200);
        bg.x = bg.y = 20;
        this.stage.root.addChild(bg);

        /*for(var i = 0; i < 100; i++){
        var box = new TBox();
        box.x = Math.random() * this.canvas.width;
        box.y = Math.random() * this.canvas.height;
        this.stage.root.addChild(box);
        this.boxs.push(box);
        }*/
        this.circle = new Circle(20);
        this.circle.x = 100;
        this.circle.y = 100;
        this.stage.root.addChild(this.circle);
        //setInterval(this.onTimer, 1000 / 30);
    };
    return Test;
})(phantom.DisplayObject);

var Box = (function (_super) {
    __extends(Box, _super);
    function Box(color, alpha, width, height, anchorX, anchorY) {
        if (typeof anchorX === "undefined") { anchorX = 0; }
        if (typeof anchorY === "undefined") { anchorY = 0; }
        _super.call(this);

        this.graphics.lineStyle(3, 0xFFFFFF, 0.5, false, "nomal", null, "round");
        this.graphics.beginFill(color, alpha);
        this.graphics.drawRect(0, 0, width, height);
        this.graphics.endFill();
        this.anchorPoint = new phantom.Point(anchorX, anchorY);
    }
    return Box;
})(phantom.Shpae);

var TBox = (function (_super) {
    __extends(TBox, _super);
    function TBox() {
        _super.call(this, Math.ceil(0xFFFFFF * Math.random()), 0.5, 50, 50, 50 * Math.random(), 50 * Math.random());
        this.sr = Math.random();
    }
    return TBox;
})(Box);

var Circle = (function (_super) {
    __extends(Circle, _super);
    function Circle(r) {
        _super.call(this);
        this.o = 0;

        this.graphics.lineStyle(1, 0xFFFFFF, 0.5);
        this.graphics.beginFill(0xFFFFFF, 0.6);
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
})(phantom.Shpae);
