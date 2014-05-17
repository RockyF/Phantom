/**
* Created by RockyF on 2014/5/15.
*/
/// <reference path="quark.d.ts" />
/// <reference path="Phantom.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
window.onload = init;

var frameCount = 0;
var timer, container, context, params, width, height, fps, stage;
var fpsContainer;
var loader;

var ballRed;

function init() {
    loader = new Q.ImageLoader();
    loader.addEventListener("complete", onComplete);
    loader.load([{ id: "ball_red", src: "assets/ball_red.png", size: 72 }]);
}

function onComplete(e) {
    ballRed = loader.getImageById("ball_red");

    container = Q.getDOM("container");

    fpsContainer = Q.getDOM("fps");

    params = Q.getUrlParams();
    if (params.mode == undefined)
        params.mode = 1;

    width = 480;
    height = 320;
    fps = 24;

    if (params.mode == 1) {
        var canvas = Q.createDOM("canvas", { width: width, height: height, style: { position: "absolute", backgroundColor: "#fff" } });
        container.appendChild(canvas);
        context = new Q.CanvasContext({ canvas: canvas });
    } else {
        context = new Q.DOMContext({ canvas: container });
    }

    stage = new Q.Stage({
        context: context, width: width, height: height, update: function () {
            frameCount++;
        } });

    timer = new Q.Timer(1000 / fps);
    timer.addListener(stage);
    timer.addListener(Q.Tween);
    timer.start();

    stage.addChild(new Root());
}

var Root = (function (_super) {
    __extends(Root, _super);
    function Root() {
        _super.call(this, {});
        this.particles = [];
        this.particlesRecycle = [];
        this.countPerFrame = 1;
    }
    Root.prototype.update = function (timeInfo) {
        var i, len, particle;
        for (i = 0; i < this.countPerFrame; i++) {
            this.particles.push(this.createParticle());
        }

        for (i = 0, len = this.particles.length; i < len; i++) {
            particle = this.particles[i];
            particle.update();

            if (Root.checkRecycle(particle)) {
                this.recycleParticle(particle);
                len--;
            }
        }

        return true;
    };

    Root.checkRecycle = function (particle) {
        var userData = particle.userData;
        return userData.x < 0 || userData.y < 0 || userData.x > stage.width || userData.y > stage.height || userData.alpha <= 0;
    };

    Root.prototype.createParticle = function () {
        var particle;
        if (this.particlesRecycle.length > 0) {
            particle = this.particlesRecycle.pop();
        } else {
            particle = new Particle();
            particle.userData = new Ball();
        }

        particle.initData();
        this.addChild(particle.userData);
        return particle;
    };

    Root.prototype.recycleParticle = function (particle) {
        this.particlesRecycle.push(particle);
        this.removeChild(particle.userData);
        this.particles.splice(this.particles.indexOf(particle.userData), 1);
    };
    return Root;
})(Q.DisplayObjectContainer);

var Particle = (function () {
    function Particle() {
    }
    Particle.prototype.initData = function () {
        this.x = 200;
        this.y = 200;
        this.a = 1;
        this.r = 0;
        this.vx = Math.random() * 4 - 2;
        this.vy = 0;
        this.va = -Math.random() * 0.1 - 0.01;
        this.vr = Math.random() * 1;

        this.update();
    };

    Particle.prototype.update = function () {
        this.vy += -0.9;
        this.x += this.vx;
        this.y += this.vy;
        this.a += this.va;
        this.r += this.vr;

        this.userData.x = this.x;
        this.userData.y = this.y;
        this.userData.alpha = this.a;
        this.userData.rotation = this.r;
    };
    return Particle;
})();

var Ball = (function (_super) {
    __extends(Ball, _super);
    function Ball(size) {
        if (typeof size === "undefined") { size = 10; }
        _super.call(this, { image: ballRed });
        //this.beginRadialGradientFill(5, 5, 0, 5, 5, 5, [ColorUtils.toWeb(0xFF0000), ColorUtils.toWeb(0xFF0000, 0)], [0, 1]).drawCircle(0, 0, 5).endFill().cache();
    }
    return Ball;
})(Q.Bitmap);
