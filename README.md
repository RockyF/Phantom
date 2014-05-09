Phantom
=======
Phantom is a framework for javascript dependenced on html5 canvas.
Phantom looks like as3-lang, because it's written by typescript.
Phantom is just include Graphics

it's easy to draw some baseGraphics

example:

/// <reference path="Phantom.ts" />

window.onload = function(){
	var canvas = document.getElementById('canvasStage');
	new Test(canvas);
};

class Test extends phantom.Sprite{
	canvas:any;
	stage:any;
	boxs:any = [];
	circle:any;

	constructor(canvas:any){
		super();
		this.canvas = canvas;
		this.stage = new phantom.Stage(canvas, this);
		this.init();
	}

	init():void{
		var bg = new Box(0xFF0000, 0.5, 300, 200);
		bg.x = bg.y = 20;
		this.addChild(bg);

		this.circle = new Circle(20);
		this.circle.x = 100;
		this.circle.y = 100;
		this.circle.alpha = 0.5;
		this.addChild(this.circle);
	}

}

class Box extends phantom.Sprite{
	constructor(color:number, alpha:number, width:number, height:number, anchorX:number = 0, anchorY:number = 0){
		super();

		this.graphics.lineStyle(3, 0xFFFFFF, 1, false, "nomal", null, "ound");
		this.graphics.beginFill(color, alpha);
		this.graphics.drawRect(0, 0, width, height);
		this.graphics.endFill();
		this.anchorPoint = new phantom.Point(anchorX, anchorY);
	}
}

class Circle extends phantom.Sprite{
	o:number = 0;

	constructor(r:number){
		super();

		this.graphics.lineStyle(1, 0xFFFFFF, 1);
		this.graphics.beginFill(0xFFFFFF, 0.5);
		this.graphics.drawCircle(0, 0, r);
		this.graphics.moveTo(0, 0);
		this.graphics.lineTo(r, 0);
		this.graphics.endFill();
	}

	onEnterFrame():void{
		super.onEnterFrame();
		this.o += 0.05;

		this.rotation = this.o;
	}
}
