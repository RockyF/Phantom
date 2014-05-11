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
			Graphics.context = this.context;
			DisplayObject.context = this.context;

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
			this.root.draw();
			this.root.onEnterFrame();
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

		distance(p:any):number{
			return Math.sqrt((p.x - this.x) * (p.x - this.x) + (p.y - this.y) * (p.y - this.y));
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

	export class Color{
		static BLACK:Color = new Color(0);
		static WHITE:Color = new Color(0xFFFFFF);

		color:number;
		alpha:number;

		constructor(color:number, alpha:number = 1){
			this.color = color;
			this.alpha = alpha;
		}

		toWeb():string{
			var b:number = this.color % 256;
			var g:number = (this.color >> 8) % 256;
			var r:number = this.color >> 16;
			return stringUtils.format("rgba({0}, {1}, {2}, {3})", r, g, b, this.alpha);
		}

		toHex():string{
			return "#" + this.color.toString(16);
		}

		fromWeb(value:string):void{
			value = value.substr(value.indexOf("(") + 1, value.lastIndexOf(")"));
			var arr = value.split(",");
			var r:number = parseInt(arr[0]);
			var g:number = parseInt(arr[1]);
			var b:number = parseInt(arr[2]);
			var a:number = parseFloat(arr[3]);

			this.color = r << 16 + g << 8 + b;
			this.alpha = a;
		}

		fromHex(value:string):void{
			var index = value.indexOf("#");
			if(index >= 0){
				value = value.substr(1);
			}

			this.color = parseInt(value, 16);
			this.alpha = 0;
		}
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

	export interface IDisplayObject{
		draw(context:any):boolean;
		onEnterFrame():void;
	}

	export class DisplayObject extends EventDispatcher implements IDisplayObject{
		static context:any;

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

		draw():boolean {
			var child:any;
			for(var key in this.children){
				child = this.children[key];
				child.draw();
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

		public dealRTS():void{
			context.translate(this.x, this.y);
			context.scale(this.scaleX, this.scaleY);
			context.rotate(this.rotation);
		}
	}

	export class Shape extends DisplayObject{
		fillColor:Color;
		strokeColor:Color;

		graphics:any;

		constructor(){
			super();
			this.graphics = new Graphics(this);
		}
	}

	export class Rectangle extends Shape{
		constructor(fill:any = Color.WHITE, stroke:any = Color.WHITE, x:number = 0, y:number = 0, width:number = 0, height:number = 0){
			this.fillColor = fill;
			this.strokeColor = stroke;
			this.x = x;
			this.y = y;
			this.width = width;
			this.height = height;
		}

		draw():boolean {
			super.draw();

			if(this.displayObject.alpha == 0 || !this.displayObject.visible){
				return false;
			}

			context.save();
			this.dealRTS();

			this.graphics.beginFill(this.fillColor);
			this.graphics.drawRect(this.x, this.y, this.width, this.height);
			this.graphics.endFill();

			context.restore();

			return true;
		}
	}

	export class Sprite extends DisplayObject{

		onEnterFrame():void{
			super.onEnterFrame();
		}
	}

	export class Graphics{
		static context:any;

		drawing:boolean = false;

		displayObject:any;

		fillMode:boolean = false;
		lineMode:boolean = false;

		constructor(displayObject:any){
			this.displayObject = displayObject;
		}

		clear():void{
			this.drawQueue.splice(0, this.drawQueue.length);

			this.fillMode = false;
			this.lineMode = false;
		}

		beginFill(color:any):void{
			this.fillMode = true;
			context.fillStyle = color.transToWeb();
		}

		lineStyle(thickness:number = NaN, color:any = Color.BLACK, pixelHinting:boolean = false, scaleMode:string = "normal", caps:string = null, joints:string = null, miterLimit:number = 3):void{
			var style = color.transToWeb();

			context.lineWidth = thickness;
			context.lineStyle = style;
			context.strokeStyle = style;
			context.lineCap = caps;
			context.lineJoin = joints;
			context.miterLimit = miterLimit;

			this.lineMode = thickness > 0;
		}

		endFill():void{
			this.fillMode = false;
		}

		drawRect(x:number, y:number, width:number, height:number):void{
			this.pushMethod("drawRect", x, y, width, height);

			this.displayObject.width = Math.max(this.displayObject.width, x + width);
			this.displayObject.height = Math.max(this.displayObject.height, y + height);
			if(this.fillMode){
				context.fillRect(x - this.displayObject.anchorPoint.x, y - this.displayObject.anchorPoint.y, width, height);
			}
			if(this.lineMode){
				context.strokeRect(x - this.displayObject.anchorPoint.x, y - this.displayObject.anchorPoint.y, width, height);
			}
		}

		lineTo(x:number, y:number):void{
			this.displayObject.width = Math.max(this.displayObject.width, x);
			this.displayObject.height = Math.max(this.displayObject.height, y);

			context.lineTo(x, y);
			context.stroke();
		}

		moveTo(x:number, y:number):void{
			context.moveTo(x, y);
		}

		drawCircle(x:number, y:number, r:number):void{
			this.displayObject.width = Math.max(this.displayObject.width, x + r);
			this.displayObject.height = Math.max(this.displayObject.height, y + r);
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
	}
}