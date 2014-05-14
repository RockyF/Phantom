/**
 * Created by RockyF on 14-5-12.
 */

class Stage {
	canvas:any;
	context:any;

	frameRate:number;
	root:DisplayObject;

	private sign:number;

	constructor(canvas:any, root:DisplayObject) {
		this.canvas = canvas;
		this.context = this.canvas.getContext('2d');
		root.root = root;
		root.stage = this;
		this.root = root;
		Graphics.context = this.context;
	}

	start():void {
		this.stop();

		setInterval(this.onTimer, 1000 / this.frameRate);
	}

	stop():void {
		if (this.sign > 0) {
			clearInterval(this.sign);
		}
	}

	onTimer = ():void=> {
		this.root.draw();
	}
}

class PEvent {
	static ACTIVATE:string = 'activate';
	static ADDED:string = 'added';
	static ADDED_TO_STAGE:string = 'addedToStage';
	static CANCEL:string = 'cancel';
	static CHANGE:string = 'change';
	static CLEAR:string = 'clear';
	static COMPLETE:string = 'complete';
	static CONNECT:string = 'connect';
	static COPY:string = 'copy';
	static CUT:string = 'cut';
	static DEACTIVATE:string = 'deactivate';
	static DISPLAYING:string = 'displaying';
	static ENTER_FRAME:string = 'enterFrame';
	static EXIT_FRAME:string = 'exitFrame';
	static FRAME_CONSTRUCTED:string = 'frameConstructed';
	static FULLSCREEN:string = 'fullScreen';
	static INIT:string = 'init';
	static MOUSE_LEAVE:string = 'mouseLeave';
	static OPEN:string = 'open';
	static PASTE:string = 'pause';
	static REMOVED:string = 'remove';
	static REMOVED_FROM_STAGE:string = 'removedFromStage';
	static RENDER:string = 'render';
	static RESIZE:string = 'resize';
	static SCROLL:string = 'scroll';
	static SELECT:string = 'select';
	static SELECT_ALL:string = 'selectAll';
	static SOUND_COMPLETE:string = 'soundComplete';
	static TAB_CHILDREN_CHANGE:string = 'tabChildrenChange';
	static TAB_ENABLED_CHANGE:string = 'tabEnabledChange';
	static TAB_INDEX_CHANGE:string = 'tabIndexChange';
	static UNLOAD:string = 'unload';

	type:string;

	constructor(type:string) {
		this.type = type;
	}
}

class PMouseEvent{
	static MOUSE_MOVE:string = 'mouseMove';
	static MOUSE_DOWN:string = 'mouseMove';
	static MOUSE_UP:string = 'mouseUp';
	static MOUSE_OVER:string = 'mouseOver';
	static MOUSE_OUT:string = 'mouseOut';
	static ROLL_OVER:string = 'rollOver';
	static ROLL_OUT:string = 'rollOut';
}

class EventDispatcher {
	listenersMap:any = [];

	addEventListener(type:string, listener:any):void {
		var listeners = this.listenersMap[type];
		if (!listeners) {
			listeners = this.listenersMap[type] = [];
		}

		listeners.push(listener);
	}

	dispatchEvent(event:any):void {
		var listeners = this.listenersMap[event.type];
		if (listeners) {
			for (var i = 0, len = listeners.length; i < len; i++) {
				listeners[i].call(this, event);
			}
		}
	}

	hasEventListener(type:string):boolean {
		return this.listenersMap[type];
	}
}

class StringUtils {
	static format(fmt:string, ...params):string{
		var result:string = fmt;
		for(var i = 0, len:number = params.length; i < len; i++){
			result = result.replace('{' + i + '}', params[i]);
		}

		return result;
	}
}

class Color {
	color:number = 0;
	alpha:number = 1;

	constructor(color:number = 0, alpha:number = 1){
		this.color = color;
		this.alpha = alpha;
	}

	toWeb():string{
		var b:number = this.color % 256;
		var g:number = (this.color >> 8) % 256;
		var r:number = this.color >> 16;
		return StringUtils.format('rgba({0}, {1}, {2}, {3})', r, g, b, this.alpha);
	}

	toHex():string{
		return '#' + this.color.toString(16);
	}

	fromWeb(value:string):void{
		value = value.substring(value.indexOf('(') + 1, value.lastIndexOf(')'));
		var arr = value.split(',');

		var r = parseInt(arr[0]);
		var g = parseInt(arr[1]);
		var b = parseInt(arr[2]);
		this.color = r << 16 + g << 8 + b;
		if(arr.length == 4){
			this.alpha = parseFloat(arr[3]);
		}
	}

	fromHex(value:string):void{
		if(value.indexOf('#')){
			value = value.substr(0);
		}
		this.color = parseInt(value, 16);
	}
}

class Point {
	x:number = 0;
	y:number = 0;

	constructor(x:number = 0, y:number = 0){
		this.x = x;
		this.y = y;
	}

	distance(p:any):number{
		return Math.sqrt((p.x + this.x) * (p.x + this.x) + (p.y + this.y) * (p.y + this.y));
	}
}

class Rect {
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

class Graphics {
	static context:any;
}

interface IDrawable {
	draw():void;
}

class DisplayObject extends EventDispatcher implements IDrawable {
	children:any = [];
	parent:any;
	root:any;
	stage:any;

	constructor(){
		super();
	}

	draw():void {
		
	}

	contains(child:any):boolean {
		return this.getChildIndex(child) >= 0;
	}

	getChildIndex(child:any):number {
		return this.children.indexOf(child);
	}

	setChildIndex(child:any, index:number):any {
		if (this.contains(child) && index >= 0 && index < this.children.length) {
			this.children.splice(this.getChildIndex(child), 1);
			this.children.splice(index, 0, child);
		}
		return this;
	}

	addChild(child:any):any {
		if (!this.contains(child)) {
			child.remove();
			child.parent = this;
			child.root = this.root;
			this.children.push(child);

			child.dispatchEvent(new PEvent(PEvent.ADDED));
			if(this.stage){
				this.broadcastAddedToStage(child);
			}
		}
		return this;
	}

	addChildAt(child:any, index:number):any {
		this.addChild(child);
		this.setChildIndex(child, index);
		return this;
	}

	getChildAt(index:number):any{
		if (index >= 0 && index < this.children.length) {
			return this.children[index];
		}

		return null;
	}

	remove():boolean {
		if (this.parent) {
			this.parent.removeChild(this);

			return true;
		}
		return false;
	}

	removeChild(child:any):any {
		if (this.contains(child)) {
			this.children.splice(this.getChildIndex(child), 1);
			var onStage = child.stage != null;

			child.parent = null;

			child.dispatchEvent(new PEvent(PEvent.REMOVED));
			if(onStage){
				this.broadcastRemovedFromStage(child);
			}
			return true;
		}
		return this;
	}

	broadcastAddedToStage=(child):void=>{
		child.stage = child.parent.stage;
		child.root = child.parent.root;
		child.dispatchEvent(new PEvent(PEvent.ADDED_TO_STAGE));
		for(var i = 0, len = this.children; i < len; i++){
			child.broadcastAddedToStage(this.children[i]);
		}
	};

	broadcastRemovedFromStage=(child):void=>{
		child.stage = null;
		child.root = null;
		child.dispatchEvent(new PEvent(PEvent.REMOVED_FROM_STAGE));
		for(var i = 0, len = this.children; i < len; i++){
			child.broadcastRemovedFromStage(this.children[i]);
		}
	};
}

class Shape extends DisplayObject implements IDrawable {
	draw():void {
	}
}

class Sprite extends DisplayObject {

}

class Rectantle extends Shape {

}