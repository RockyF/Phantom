/**
 * Created by lenovo on 14-5-7.
 */

module phantom{
	export class Phantom{

	}

	export class Stage{
		canvas:any;
		context:any;

		private signRender:number;

		frameRate:number = 30;
		backgroundColor:number = 0x888888;

		root:any = new DisplayObject();

		constructor(canvas){
			this.canvas = canvas;
			this.context = this.canvas.getContext("2d");

			this.start();
		}

		start():void{
			this.signRender = setInterval(this.onRender, 1000 / this.frameRate);
		}

		stop():void{
			if(this.signRender > 0){
				clearInterval(this.signRender);
			}
		}

		onRender=()=>{
			this.context.fillStyle = ColorUtils.transToWeb(this.backgroundColor);
			this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
			this.root.draw(this.context);
		}
	}

	export class ColorUtils{
		static transToWeb(color:number, alpha:number = 1):string{
			var b:number = color % 256;
			var g:number = (color >> 8) % 256;
			var r:number = color >> 16;
			return StringUtils.format("rgba({0}, {1}, {2}, {3})", r, g, b, alpha);
		}
	}

	export class StringUtils{
		static format(fmt:string, ...params):string{
			var result:string = fmt;
			for(var i:number = 0, len:number = params.length; i < len; i++){
				result = result.replace("{" + i + "}", params[i]);
			}

			return result;
		}
	}

	export class Point{
		x:number = 0;
		y:number = 0;

		constructor(x:number = 0, y:number = 0){
			this.x = x;
			this.y = y;
		}
	}

	export class Graphics{
		drawing:boolean = false;

		displayObject:any;

		fillMode:boolean = false;
		fillStyle:string = "";
		strokeStyle:string = "";

		drawQueue:any = [];

		constructor(displayObject:any){
			this.displayObject = displayObject;
		}

		pushMethod(methodName:string, ...params):void{
			this.drawQueue.push({method: methodName, params: params});
		}

		beginFill(color:number, alpha:number = 1):void{
			this.pushMethod("beginFill", ColorUtils.transToWeb(color, alpha));
		}

		private _beginFill(context:any, fillStyle:string){
			this.fillMode = true;
			this.fillStyle = fillStyle;
			context.fillStyle = this.fillStyle;
		}

		endFill():void{
			this.pushMethod("endFill");
		}

		private _endFill(context:any){
			this.fillMode = false;
		}

		drawRect(x:number, y:number, width:number, height:number):void{
			this.pushMethod("drawRect", x, y, width, height);

			this.displayObject.width = Math.max(this.displayObject.width, x + width);
			this.displayObject.height = Math.max(this.displayObject.height, y + height);
		}

		private _drawRect(context:any, x:number, y:number, width:number, height:number):void{
			if(this.fillMode){
				context.save();
				context.translate(this.displayObject.x, this.displayObject.y);
				context.rotate(this.displayObject.rotation);
				context.fillRect(x - this.displayObject.anchorPoint.x, y - this.displayObject.anchorPoint.y, width, height);
				context.restore();
			}
		}

		draw(context:any):boolean {
			this.drawing = true;

			var drawEntity:any;
			for(var i:number = 0, len:number = this.drawQueue.length; i < len; i++){
				drawEntity = this.drawQueue[i];

				var params:any = drawEntity.params;
				if(params[0] != context){
					params.unshift(context);
				}
				this["_" + drawEntity.method].apply(this, params);
			}

			this.drawing = false;
			return false;
		}
	}

	export interface IDisplayObject{
		draw(context:any):boolean;
	}

	export class DisplayObject implements IDisplayObject{
		name:string;
		x:number = 0;
		y:number = 0;
		width:number = 0;
		height:number = 0;
		rotation:number = 0;
		anchorPoint:any = new Point();
		children:any = [];

		draw(context):boolean {
			var child:any;
			for(var key in this.children){
				child = this.children[key];
				child.draw(context);
			}
			return true;
		}

		addChild(child:any):any{
			this.children.push(child);
		}
	}

	export class Sprite extends DisplayObject{
		graphics:any;

		constructor(){
			super();
			this.graphics = new Graphics(this);
		}

		draw(context):boolean {
			this.graphics.draw(context);
			return true;
		}
	}
}