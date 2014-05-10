/**
 * Created by lenovo on 14-5-7.
 */

function trace(...params){
	console.log(params.join(" "));
}

module phantom{
	export class Phantom{

	}

	export class Stage{
		canvas:any;
		context:any;

		private signRender:number;

		frameRate:number = 30;
		backgroundColor:number = 0x888888;

		root:any;

		constructor(canvas:any, root:any){
			this.canvas = canvas;
			this.root = root;
			this.context = this.canvas.getContext("2d");

			this.start();
		}

		start():void{
			this.signRender = setInterval(this.onRender, 1000 / this.frameRate);
			this.canvas.addEventListener("mousedown", this.onMouseDown);
			this.canvas.addEventListener("mouseup", this.onMouseUp);
			this.canvas.addEventListener("mousemove", this.onMouseMove);
		}

		onMouseDown=(event):void=>{
			//console.log("onMouseDown");
		}

		onMouseUp=(event):void=>{
			//console.log("onMouseUp");
		}

		onMouseMove=(event):void=>{
			//console.log(event.offsetX, event.offsetY);
			this.root.dealMouseMove(event.offsetX, event.offsetY);
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
			this.root.onEnterFrame();
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

	export class Rect{
		x:number = 0;
		y:number = 0;
		width:number = 0;
		height:number = 0;

		constructor(x:number = 0, y:number = 0, width:number = 0, height:number = 0){
			this.x = x;
			this.y = y;
			this.width = width;
			this.height = height;
		}

		containsPoint(point:any):boolean{
			return point.x > this.x && point.y > this.y && point.x < this.x + this.width && point.y < this.y + this.height;
		}
	}

	export interface IDisplayObject{
		draw(context:any):boolean;
		onEnterFrame():void;
	}

	export class Event{
		type:string;

		constructor(type:string){
			this.type = type;
		}
	}

	export class MouseEvent extends Event{
		static CLICK:string = "click";
		static BOUBLE_CLICK:string = "doubleClick";
		static MOUSE_DOWN:string = "mouseDown";
		static MOUSE_MOVE:string = "mouseMove";
		static MOUSE_UP:string = "mouseUp";
		static MOUSE_OUT:string = "mouseOut";
		static MOUSE_OVER:string = "mouseOver";
		static MOUSE_WHLEEL:string = "mouseWheel";
		static ROLE_OUT:string = "rollOut";
		static ROLE_OVER:string = "rollOver";

		localX:number;
		localY:number;

		altKey:boolean;
		shiftKey:boolean;
		ctrlKey:boolean;

		buttonDown:boolean;
		delta:number;
	}

	export interface IEventDispatcher{
		addEventListener(typs:string, listener:any):void;
		dispatchEvent(event:any):void;
		hasEventListener(type:string):boolean;
		removeEventListener(type:string, listener:any):void;
	}

	export class EventDispatcher implements IEventDispatcher{
		listenersMap:any = [];
		target:any;

		constructor(target:any = null){
			this.target = target;
		}

		addEventListener(type:string, listener:any):void {
			var listeners = this.listenersMap[type];
			if(!listeners){
				listeners = this.listenersMap[type] = [];
			}
			listeners.push(listener);
		}

		dispatchEvent(event:any):void {
			var listeners = this.listenersMap[event.type];
			if(listeners){
				for(var key in listeners){
					var listener = listeners[key];
					listener.call(this, event);
				}
			}
		}

		hasEventListener(type:string):boolean {
			return this.listenersMap[type];
		}

		removeEventListener(type:string, listener:any):void {
			var listeners = this.listenersMap[type];
			if(listeners){
				var index = listeners.indexOf(listener);
				listeners.splice(index, 1);
			}
		}
	}

	export class DisplayObject extends EventDispatcher implements IDisplayObject{
		name:string;
		x:number = 0;
		y:number = 0;
		width:number = 0;
		height:number = 0;
		alpha:number = 1;
		rotation:number = 0;
		visible:boolean = true;
		scaleX:number = 1;
		scaleY:number = 1;
		anchorPoint:any = new Point();

		drawBound:any = new Rect();

		mouseX:number;
		mouseY:number;
		mouseEnable:boolean = true;
		mouseChildren:boolean = true;

		children:any = [];

		draw(context):boolean {
			var child:any;
			for(var key in this.children){
				child = this.children[key];
				child.draw(context);
				child.onEnterFrame();
			}
			return true;
		}

		dealMouseMove(mouseX:number, mouseY:number):void{
			this.mouseX = mouseX;
			this.mouseY = mouseY;

			var attacked:boolean = this.hitTest(this.mouseX, this.mouseY);
			//trace(attacked);
			if(attacked){
				if(this.mouseEnable){
					var event:any = new MouseEvent(MouseEvent.MOUSE_MOVE);
					event.localX = this.mouseX - this.x;
					event.localY = this.mouseY - this.y;
					this.dispatchEvent(event);
				}

				if(this.mouseChildren){
					var child:any;
					for(var key in this.children){
						child = this.children[key];
						child.dealMouseMove(this.mouseX, this.mouseY);
					}
				}
			}
		}

		onEnterFrame():void{

		}

		addChild(child:any):any{
			this.children.push(child);
		}

		getRect():any{
			return new Rect(this.x, this.y, this.width, this.height);
		}

		hitTest(x:number, y:number):boolean{
			return x > this.x && y > this.y && x < this.x + this.width && y < this.y + this.height;
		}
	}

	export class Sprite extends DisplayObject{
		graphics:any;

		constructor(){
			super();
			this.graphics = new Graphics(this);
		}

		draw(context):boolean {
			super.draw(context);
			this.graphics.draw(context);
			return true;
		}

		onEnterFrame():void{
			super.onEnterFrame();
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

		clear():void{
			this.drawQueue.splice(0, this.drawQueue.length);

			context.lineWidth = 1;
			context.lineStyle = "#000000";
			context.strokeStyle = "#000000";
			context.lineCap = "";
			context.lineJoin = "";
			context.miterLimit = "";

			this.fillMode = false;
			this.lineMode = false;
		}

		beginFill(color:number, alpha:number = 1):void{
			this.pushMethod("beginFill", color, alpha);
		}

		private _beginFill(context:any, color, alpha){
			this.fillMode = true;
			context.fillStyle = ColorUtils.transToWeb(color, alpha * this.displayObject.alpha);
		}

		lineStyle(thickness:number = NaN, color:number = 0, alpha:number = 1.0, pixelHinting:boolean = false, scaleMode:string = "normal", caps:string = null, joints:string = null, miterLimit:number = 3):void{
			this.pushMethod("lineStyle", thickness, color, alpha, pixelHinting, scaleMode, caps, joints, miterLimit);
		}

		private _lineStyle(context:any, thickness:number = NaN, color:number = 0, alpha:number = 1.0, pixelHinting:boolean = false, scaleMode:string = "normal", caps:string = null, joints:string = null, miterLimit:number = 3):void{
			var style = ColorUtils.transToWeb(color, alpha * this.displayObject.alpha);

			context.lineWidth = thickness;
			context.lineStyle = style;
			context.strokeStyle = style;
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
			if(this.displayObject.alpha == 0 || !this.displayObject.visible){
				return false;
			}
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
			return true;
		}
	}
}