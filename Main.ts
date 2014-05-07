/**
 * Created by lenovo on 14-5-7.
 */

var canvas;

window.onload = function(){
	canvas = document.getElementById('canvasStage');

	phantom.Phantom.init(canvas);
	var sprite:any = new phantom.Sprite();
	sprite.graphics.beginFill(0xFFEEDD, 0.5);
	sprite.graphics.drawRect(0, 0, 100, 20);
};