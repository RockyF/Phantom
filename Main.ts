/**
 * Created by lenovo on 14-5-7.
 */
/// <reference path="Phantom.ts" />

window.onload = function(){
	var canvas = document.getElementById('canvasStage');
	new Test(canvas);
};

class Test extends phantom.DisplayObject{
	canvas:any;
	stage:any;
	boxs:any = [];
	circle:any;

	constructor(canvas:any){
		super();
		this.canvas = canvas;
		this.stage = new phantom.Stage(canvas);
		this.init();
	}

	init():void{
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

	}

	sx:number = 1;
	sy:number = 1;
	o:number = 0;
	onTimer=()=>{
		this.o += 0.05;

		this.circle.rotation = this.o;
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
	}

}

class Box extends phantom.Shpae{
	constructor(color:number, alpha:number, width:number, height:number, anchorX:number = 0, anchorY:number = 0){
		super();

		this.graphics.lineStyle(3, 0xFFFFFF, 0.5, false, "nomal", null, "round");
		this.graphics.beginFill(color, alpha);
		this.graphics.drawRect(0, 0, width, height);
		this.graphics.endFill();
		this.anchorPoint = new phantom.Point(anchorX, anchorY);
	}
}

class TBox extends Box{
	sr:number = Math.random();

	constructor(){
		super(Math.ceil(0xFFFFFF * Math.random()), 0.5, 50, 50, 50 * Math.random(), 50 * Math.random());
	}
}

class Circle extends phantom.Shpae{
	o:number = 0;

	constructor(r:number){
		super();

		this.graphics.lineStyle(1, 0xFFFFFF, 0.5);
		this.graphics.beginFill(0xFFFFFF, 0.6);
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