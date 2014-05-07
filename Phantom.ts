/**
 * Created by lenovo on 14-5-7.
 */

module phantom{
	export class Phantom{
		static canvas:any;
		static context:any;

		static stage:any;

		static init(canvas:any):void{
			Phantom.canvas = canvas;
			Phantom.context = canvas.getContext("2d");

			Phantom.stage = new Stage(Phantom.context);
		}
	}

	export class Stage{
		context:any;
		private signRender:number;

		frameRate:number = 30;

		root:any = new DisplayObject();

		constructor(context:any){
			this.context = context;
		}

		start():void{
			this.signRender = setInterval(this.onRender, 1000 / this.frameRate);
		}

		onRender():void{
			root.draw(this.context);
		}
	}

	export class ColorUtils{
		static transToWeb(color:number, alpha:number):string{
			return StringUtils.format("#{0}{1}", Math.ceil(alpha * 256).toString(16), color.toString(16));
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

	export class Graphics implements IDisplayObject{
		drawing:boolean = false;

		fillStyle:string;
		strokeStyle:string;

		drawQueue:any = [];

		pushMethod(methodName:string, ...params):void{
			this.drawQueue.push({method: methodName, params: params});
		}

		beginFill(color:number, alpha:number = 1):void{
			this.pushMethod("beginFill", color, alpha);
		}

		private _beginFill(context:any, color:number, alpha:number = 1){
			this.fillStyle = ColorUtils.transToWeb(color, alpha);
			if(this.fillStyle){
				context.fillStyle = this.fillStyle;
			}
		}

		drawRect(x:number, y:number, width:number, height:number):void{
			this.pushMethod("drawRect", x, y, width, height);
		}

		private _drawRect(context:any, x:number, y:number, width:number, height:number):void{
			if(this.fillStyle){
				context.fillRect(x, y, width, height);
			}

		}

		draw(stage, context):boolean {
			this.drawing = true;

			var drawEntity:any;
			for(var i:number = 0, len:number = this.drawQueue.length; i < len; i++){
				drawEntity = this.drawQueue[i];

				var params:any = drawEntity.params;
				params.unshift(context);
				this["_" + drawEntity.method].apply(this, params);
			}

			this.drawing = false;
			return false;
		}
	}

	export interface IDisplayObject{
		draw(stage:any, context:any):boolean;
	}

	export class DisplayObject implements IDisplayObject{
		_name:string;
		_x:number;
		_y:number;
		children:any = [];

		graphics:any;

		constructor(){
			this.graphics = new Graphics();
		}

		draw(stage, context):boolean {
			return undefined;
		}

		addChild(child:any):any{
			this.children.push(child);
		}
	}

	export class Sprite extends DisplayObject{
		constructor(){
			super();

		}

		draw(stage, context):boolean {
			return undefined;
		}

	}
}