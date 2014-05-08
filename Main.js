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
        this.onTimer = function () {
            for (var i = 0; i < 100; i++) {
                var box = _this.boxs[i];

                box.rotation += Math.random() / 10;
            }
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

        for (var i = 0; i < 100; i++) {
            var box = new Box(Math.ceil(0xFFFFFF * Math.random()), 0.5, 50, 50, 50 * Math.random(), 50 * Math.random());
            box.x = Math.random() * this.canvas.width;
            box.y = Math.random() * this.canvas.height;
            this.stage.root.addChild(box);
            this.boxs.push(box);
        }

        setInterval(this.onTimer, 1000 / 30);
    };
    return Test;
})(phantom.Sprite);

var Box = (function (_super) {
    __extends(Box, _super);
    function Box(color, alpha, width, height, anchorX, anchorY) {
        if (typeof anchorX === "undefined") { anchorX = 0; }
        if (typeof anchorY === "undefined") { anchorY = 0; }
        _super.call(this);

        this.graphics.beginFill(color, alpha);
        this.graphics.drawRect(0, 0, width, height);
        this.graphics.endFill();
        this.anchorPoint = new phantom.Point(anchorX, anchorY);
    }
    return Box;
})(phantom.Sprite);
