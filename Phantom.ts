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
			return stringUtils.format("rgba({0}, {1}, {2}, {3})", r, g, b, alpha);
		}
	}

	export class stringUtils{
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
		lineMode:boolean = false;

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
			context.fillStyle = fillStyle;
		}

		lineStyle(thickness:number = NaN, color:number = 0, alpha:number = 1.0, pixelHinting:boolean = false, scaleMode:string = "normal", caps:string = null, joints:string = null, miterLimit:number = 3):void{
			this.pushMethod("lineStyle", thickness, ColorUtils.transToWeb(color, alpha), pixelHinting, scaleMode, caps, joints, miterLimit);
		}

		private _lineStyle(context:any, thickness:number = NaN, lineStyle:string = "", pixelHinting:boolean = false, scaleMode:string = "normal", caps:string = null, joints:string = null, miterLimit:number = 3):void{
			context.lineWidth = thickness;
			context.lineStyle = lineStyle;
			context.strokeStyle = lineStyle;
			context.lineCap = caps;
			context.lineJoin = joints;
			context.miterLimit = miterLimit;

			this.lineMode = thickness > 0;
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
				context.fillRect(x - this.displayObject.anchorPoint.x, y - this.displayObject.anchorPoint.y, width, height);
			}
			if(this.lineMode){
				context.strokeRect(x - this.displayObject.anchorPoint.x, y - this.displayObject.anchorPoint.y, width, height);
			}
		}

		lineTo(x:number, y:number):void{
			this.pushMethod("lineTo", x, y);
			this.displayObject.width = Math.max(this.displayObject.width, x);
			this.displayObject.height = Math.max(this.displayObject.height, y);
		}

		private _lineTo(context:any, x:number, y:number):void{
			context.lineTo(x, y);
			context.stroke();
		}

		moveTo(x:number, y:number):void{
			this.pushMethod("moveTo", x, y);
		}

		private _moveTo(context:any, x:number, y:number):void{
			context.moveTo(x, y);
		}

		drawCircle(x:number, y:number, r:number):void{
			this.pushMethod("drawCircle", x, y, r);

			this.displayObject.width = Math.max(this.displayObject.width, x + r);
			this.displayObject.height = Math.max(this.displayObject.height, y + r);
		}

		private _drawCircle(context:any, x:number, y:number, r:number):void{
			context.beginPath();
			context.arc(x - this.displayObject.anchorPoint.x, y - this.displayObject.anchorPoint.y, r, 0, Math.PI * 2, true);
			context.closePath();
			if(this.fillMode){
				context.fill();
			}
			if(this.lineMode){
				context.stroke();
			}
		}

		public _dealRTS(context:any):void{
			context.translate(this.displayObject.x, this.displayObject.y);
			context.scale(this.displayObject.scaleX, this.displayObject.scaleY);
			context.rotate(this.displayObject.rotation);
		}

		draw(context:any):boolean {
			this.drawing = true;

			context.save();
			this._dealRTS(context);
			var drawEntity:any;
			for(var i:number = 0, len:number = this.drawQueue.length; i < len; i++){
				drawEntity = this.drawQueue[i];

				var params:any = drawEntity.params;
				if(params[0] != context){
					params.unshift(context);
				}
				this["_" + drawEntity.method].apply(this, params);
			}
			context.restore();

			this.drawing = false;
			return false;
		}
	}

	export interface IDisplayObject{
		draw(context:any):boolean;
		onEnterFrame():void;
	}

	export class DisplayObject implements IDisplayObject{
		name:string;
		x:number = 0;
		y:number = 0;
		width:number = 0;
		height:number = 0;
		rotation:number = 0;
		scaleX:number = 1;
		scaleY:number = 1;
		anchorPoint:any = new Point();
		children:any = [];

		draw(context):boolean {
			var child:any;
			for(var key in this.children){
				child = this.children[key];
				child.draw(context);
			}
			this.onEnterFrame();
			return true;
		}

		addChild(child:any):any{
			this.children.push(child);
		}

		onEnterFrame():void{

		}
	}

	export class Shpae extends DisplayObject{
		graphics:any;

		constructor(){
			super();
			this.graphics = new Graphics(this);
		}

		draw(context):boolean {
			this.graphics.draw(context);
			return true;
		}

		onEnterFrame():void{
			super.onEnterFrame();
		}
	}
}