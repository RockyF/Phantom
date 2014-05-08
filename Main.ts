/**
 * Created by lenovo on 14-5-7.
 */
/// <reference path="Phantom.ts" />

window.onload = function(){
	var canvas = document.getElementById('canvasStage');
	new Test(canvas);
};

class Test extends phantom.Sprite{
	canvas:any;
	stage:any;
	boxs:any = [];

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

		for(var i = 0; i < 100; i++){
			var box = new Box(Math.ceil(0xFFFFFF * Math.random()), 0.5, 50, 50, 50 * Math.random(), 50 * Math.random());
			box.x = Math.random() * this.canvas.width;
			box.y = Math.random() * this.canvas.height;
			this.stage.root.addChild(box);
			this.boxs.push(box);
		}

		setInterval(this.onTimer, 1000 / 30);

	}

	sx:number = 1;
	sy:number = 1;
	onTimer=()=>{

		for(var i = 0; i < 100; i++){
			var box = this.boxs[i];

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
	}

}

class Box extends phantom.Sprite{
	constructor(color:number, alpha:number, width:number, height:number, anchorX:number = 0, anchorY:number = 0){
		super();

		this.graphics.beginFill(color, alpha);
		this.graphics.drawRect(0, 0, width, height);
		this.graphics.endFill();
		this.anchorPoint = new phantom.Point(anchorX, anchorY);
	}
}