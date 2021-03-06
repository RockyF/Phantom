/// <reference path="Phantom.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var tbs;
(function (tbs) {
    var DisplayTest = (function (_super) {
        __extends(DisplayTest, _super);
        function DisplayTest() {
            _super.call(this);

            this.addChild(new Box());
        }
        return DisplayTest;
    })(Sprite);
    tbs.DisplayTest = DisplayTest;
})(tbs || (tbs = {}));

var Box = (function (_super) {
    __extends(Box, _super);
    function Box() {
        _super.call(this);
        this.addEventListener(PEvent.ADDED, this.onAdded);
        this.addEventListener(PEvent.ADDED_TO_STAGE, this.onAddedToStage);
    }
    Box.prototype.onAdded = function (event) {
        if (typeof event === "undefined") { event = null; }
        console.log('onAdded', this.a);
    };

    Box.prototype.onAddedToStage = function (event) {
        console.log('onAddedToStage');
    };
    return Box;
})(Sprite);

window.onload = function () {
    var canvas = document.getElementById('canvasStage');
    var stage = new Stage(canvas, new tbs.DisplayTest());
};
