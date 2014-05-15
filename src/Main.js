/**
* Created by RockyF on 2014/5/15.
*/
/// <reference path="quark.d.ts" />
window.onload = init;

var timer, container, context, params, width, height, fps, stage;

function init() {
    container = Q.getDOM("container");

    params = Q.getUrlParams();
    if (params.mode == undefined)
        params.mode = 2;

    width = 480;
    height = 320;
    fps = 60;

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

    draw();
}

function draw() {
    var g1 = new Q.Graphics({ width: 200, height: 200, x: 20, y: 20 });
    g1.lineStyle(1, "#00f").beginFill("#0ff").drawRect(0.5, 0.5, 100, 100).endFill().cache();

    var g2 = new Q.Graphics({ width: 200, height: 200, x: 150, y: 20 });
    g2.lineStyle(10, "#431608").beginFill("#0ff").drawRoundRect(5, 5, 90, 90, 20).endFill().cache();

    var g3 = new Q.Graphics({ width: 200, height: 200, x: 270, y: 20 });
    g3.lineStyle(2, "#7db9e8").drawCircle(2, 2, 50).beginRadialGradientFill(50, 50, 0, 50, 50, 50, ["#7db9e8", "#1E5799"], [0, 1]).endFill().cache();

    var g4 = new Q.Graphics({ width: 200, height: 200, x: 20, y: 150 });
    g4.drawEllipse(5, 5, 150, 100).lineStyle(5, "#12161f").beginFill("#0ff").endFill().cache();

    var g5 = new Q.Graphics({ width: 200, height: 200, x: 200, y: 150 });
    g5.lineStyle(4, "#111").beginLinearGradientFill(0, 0, 60, 0, ["#959595", "#010101", "#4e4e4e", "#383838", "#1b1b1b"], [0, 0.5, 0.76, 0.87, 1]).drawRect(2, 2, 60, 100).endFill().cache();

    var svgPath = "M153 334 C153 334 151 334 151 334 C151 339 153 344 156 344 C164 344 171 339 171 334 C171 322 164 314 156 314 C142 314 131 322 131 334 C131 350 142 364 156 364 C175 364 191 350 191 334 C191 311 175 294 156 294 C131 294 111 311 111 334 C111 361 131 384 156 384 C186 384 211 361 211 334 C211 300 186 274 156 274";
    var g6 = new Q.Graphics({ width: 500, height: 500, x: 200, y: -130 });
    g6.drawSVGPath(svgPath).lineStyle(4, "#0f0").endFill().cache();

    stage.addChild(g1, g2, g3, g4, g5, g6);
}

var frameCount = 0;
var fpsContainer = Q.getDOM("fps");
setInterval(function () {
    fpsContainer.innerHTML = "FPS:" + frameCount;
    frameCount = 0;
}, 1000);
