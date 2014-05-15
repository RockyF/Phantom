declare module Q {
	function inherit(childClass:any, parentClass:any):void;

	function merge(obj:any, props:any, strict?:boolean):any;

	function delegate(func:any, self:any):any;

	function getDOM(id:string):any;

	function createDOM(type:string, props:any):any;

	function use(name:string):any;

	function getElementOffset(elem:any):any;

	function createDOMDrawable(disObj:any, imageObj:any):any;

	function hitTestPoint(obj:any, x:number, y:number, usePolyCollision?:boolean):number;

	function hitTestObject(obj1:any, obj2:any, usePolyCollision?:boolean):boolean;

	function polygonCollision(poly1:any, poly2:any):boolean;

	function doSATCheck(poly1:any, poly2:any, result:any):any;

	function toString():string;

	function trace(...args):void;

	function getUrlParams():any;

	function addMeta(props:any):void;

	function toggleDebugRect(stage:any):void;

	function cacheObject(obj:any, toImage:any, type:string):void;

	class Matrix {
		public a:number;
		public b:number;
		public c:number;
		public d:number;
		public e:number;
		public tx:number;
		public ty:number;

		constructor(a:number, b:number, c:number, d:number, tx:number, ty:number);

		public concat:(mtx) =>any;
		public rotate:(angle) =>any;
		public scale:(sx, sy) =>any;
		public translate:(dx, dy) =>any;
		public identity:() =>any;
		public invert:() =>any;
		public transformPoint:(point, round, returnNew) =>any;
		public clone:() =>any;
		public toString:() =>string;
	}

	class Rectangle {
		public x:number;
		public y:number;
		public width:number;
		public height:number;

		constructor(x:number, y:number, width:number, height:number);

		public intersects:(rect:any) =>boolean;
		public intersection:(rect:any) =>any;
		public union:(rect:any, returnNew:boolean) =>void;
		public containsPoint:(x:number, y:number) =>boolean;
		public clone:() =>any;
		public toString:() =>string;
	}

	enum KEY{
		MOUSE_LEFT,
		MOUSE_MID,
		MOUSE_RIGHT,
		BACKSPACE,
		TAB,
		NUM_CENTER ,
		ENTER ,
		RETURN ,
		SHIFT ,
		CTRL ,
		ALT ,
		PAUSE ,
		CAPS_LOCK ,
		ESC ,
		ESCAPE ,
		SPACE ,
		PAGE_UP ,
		PAGE_DOWN ,
		END ,
		HOME ,
		LEFT ,
		UP ,
		RIGHT ,
		DOWN ,
		PRINT_SCREEN ,
		INSERT ,
		DELETE ,
		ZERO ,
		ONE ,
		TWO ,
		THREE ,
		FOUR ,
		FIVE ,
		SIX ,
		SEVEN ,
		EIGHT ,
		NINE ,
		A ,
		B ,
		C ,
		D ,
		E ,
		F ,
		G ,
		H ,
		I ,
		J ,
		K ,
		L ,
		M ,
		N ,
		O ,
		P ,
		Q ,
		R ,
		S ,
		T ,
		U ,
		V ,
		W ,
		X ,
		Y ,
		Z ,
		CONTEXT_MENU ,
		NUM_ZERO ,
		NUM_ONE ,
		NUM_TWO ,
		NUM_THREE ,
		NUM_FOUR,
		NUM_FIVE,
		NUM_SIX,
		NUM_SEVEN,
		NUM_EIGHT,
		NUM_NINE,
		NUM_MULTIPLY,
		NUM_PLUS,
		NUM_MINUS,
		NUM_PERIOD,
		NUM_DIVISION,
		F1,
		F2,
		F3,
		F4,
		F5,
		F6,
		F7,
		F8,
		F9,
		F10,
		F11,
		F12
	}

	class EventManager {
		public keyState:any;
		public registerStage:(stage:any, events:any, preventDefault:any, stopPropagation:any) =>void;
		public unregisterStage:(stage:any, events:any) =>void;
		public register:(target:any, events:any, callback, preventDefault:any, stopPropagation:any) =>void;
		public unregister:(target:any, events:any, callback:any) =>void;
		public stop:(e:any, continueDefault:any, continuePropagation:boolean) =>void;
	}

	class EventDispatcher {
		public addEventListener:(type:string, listener:any) =>boolean;
		public removeEventListener:(type:string, listener:any) =>boolean;
		public removeEventListenerByType:(type:string) =>boolean;
		public removeAllEventListeners:() =>void;
		public dispatchEvent:(event:any) =>boolean;
		public hasEventListener:(type:string) =>boolean;
	}

	class Context {
		public canvas:any;

		constructor(props:any);

		public startDraw:()=>void;
		public draw:()=>void;
		public endDraw:()=>void;
		public transform:()=>void;
		public remove:(target:any)=>void;
	}

	class CanvasContext extends Context {
		public context:any;
		public clear:()=>void;
	}

	class DOMContext extends Context {
		public hide:(target:any)=>void;
	}

	class UIDUtil {
		static createUID(name:string):string;

		static displayObjectToString(displayObject):boolean;
	}

	class Timer {
		public interval:number;
		public paused:boolean;
		public info:any;

		constructor(interval:number);

		public start():void;

		public stop():void;

		public pause():void;

		public resume():void;

		public delay(callback:any, time:number):void;

		public addListener(obj:any):void;

		public removeListener(obj:any):void;
	}

	class ImageLoader extends EventDispatcher {
		public loading:boolean;

		constructor(...source);

		public load(source):void;

		public getLoaded():boolean;

		public getTotal():number;

		public getLoadedSize():number;

		public getTotalSize():number;
	}

	class Tween {
		public target:any;
		public time:number;
		public delay:number;
		public paused:boolean;
		public loop:boolean;
		public reverse:boolean;
		public interval:number;
		public ease:any;
		public next:any;

		public onStart:any;
		public onUpdate:any;
		public onComplete:any;

		static step():void;

		static add(tween):void;

		static remove(tween):void;

		static to(target, toProps, params):void;

		static from(target, fromProps, params):void;

		constructor(constructortarget:any, newProps:any, params:any);

		public setProps(oldProps, newProps):void;

		public start():void;

		public stop():void;

		public pause():void;

		public resume():void;
	}

	class Easing {
		public Linear:any;
		public Quadratic:any;
		public Cubic:any;
		public Quartic:any;
		public Quintic:any;
		public Sinusoidal:any;
		public Exponential:any;
		public Circular:any;
		public Elastic:any;
		public Back:any;
		public Bounce:any;
	}

	class Audio extends EventDispatcher {
		public src:string;
		public autoPlay:boolean;
		public loop:boolean;

		constructor(src:string, preload:boolean, autoPlay:boolean, loop:boolean);

		public load():void;

		public play():void;

		public stop():void;

		public loaded():boolean;

		public playing():boolean;
	}

	class Drawable {
		public rawDrawable:any;
		public domDrawable:any;

		constructor(drawable:any, isDOM:any);

		public get(obj:any, context:any):void;

		public set(drawable:any, isDOM:any):void;
	}

	class DisplayObject extends EventDispatcher {
		public name:string
		public x:number;
		public y:number;
		public regX:number;
		public regY:number;
		public width:number;
		public height:number;
		public alpha:number;
		public scaleX:number;
		public scaleY:number;
		public rotation:number;
		public visible:boolean;
		public eventEnabled:boolean;
		public transformEnabled:boolean;
		public useHandCursor:boolean;
		public polyArea:any;
		public mask:any;

		public drawable:any;
		public parent:any;
		public context:any;

		constructor(props:any);

		public setDrawable(drawable:any):void;

		public getDrawable(context:any):any;

		public update(timeInfo:any):boolean;

		public render(context:any):void;

		public saveState(list:any):void;

		public getState(propName:string):any;

		public propChanged(prop:any):boolean;

		public hitTestPoint(x:number, y:number, usePolyCollision):number;

		public hitTestObject(object:any, usePolyCollision):boolean;

		public localToGlobal(x:number, y:number):any;

		public globalToLocal(x:number, y:number):any;

		public localToTarget(x:number, y:number, target:any):any;

		public getConcatenatedMatrix(ancestor:any):any;

		public getBounds():any;

		public getCurrentWidth():number;

		public getCurrentHeight():number;

		public getStage():any;

		public cache(toImage:boolean, type:string):any;

		public uncache():any;

		public toImage(type:string):any;

		public toString():string;
	}

	class DisplayObjectContainer extends DisplayObject {
		public eventChildren:boolean;
		public autoSize:boolean;

		constructor(props:any);

		public addChildAt(child:any, index:number):any;

		public addChild(...child):any;

		public removeChildAt(index:number):any;

		public removeChild(child:any):any;

		public removeAllChildren():void;

		public getChildAt(index:number):any;

		public getChildIndex(child:any):number;

		public setChildIndex(child:any, index:number):void;

		public swapChildren(child1:any, child2:any):void;

		public swapChildrenAt(index1:number, index2:number):void;

		public getChildById(id:string):any;

		public removeChildById(id:string):any;

		public sortChildren(keyOrFunction:any):any;

		public contains(child:any):boolean;

		public getNumChildren():number;

		public render(context:any):void;

		public getObjectUnderPoint(x:number, y:number, usePolyCollision:boolean, returnAll:boolean):any;
	}

	class Stage extends DisplayObjectContainer {
		public stageX:number;
		public stageY:number;
		public paused:number;

		constructor(props:any);

		public step(timeInfo:any):void;

		public updatePosition():void;

	}

	class Bitmap extends DisplayObject {
		public id:number;
		public image:any;
		public rectX:number; //ready-only
		public rectY:number; //ready-only
		public rectWidth:number; //ready-only
		public rectHeight:number; //ready-only
		constructor(props:any);

		public setRect(rect:any):void;

		public render(context:any):void;
	}

	class MovieClip extends Bitmap {
		public id:number;
		public interval:number;
		public paused:boolean;
		public useFrames:boolean;
		public currentFrame:number; //read-only
		constructor(props:any);

		public addFrame(frame:any):any;

		public setFrame(frame:any, index):void;

		public getFrame(indexOrLabel):any;

		public play():void;

		public stop():void;

		public gotoAndStop(indexOrLabel:number):void;

		public gotoAndPlay(indexOrLabel:number):void;

		public nextFrame(displayedDelta:number):void;

		public getNumFrames():number;

		public render(context:any):void;
	}

	class Button extends DisplayObjectContainer {
		public state:string
		public enabled:boolean;
		static UP:string;
		static DOWN:string;
		static OVER:string;
		static DISABLE:string;

		constructor(props:any);

		public setUpState(upState:string):void;

		public setOverState(overState:string):void;

		public setDownState(overState:string):void;

		public setDisabledState(overState:string):void;

		public setEnabled(enabled:boolean):any;

		public changeState(state:string):void;

		public setDrawable(drawable:any):void;
	}

	class Graphics extends DisplayObject {
		public id:number;
		public lineWidth:number;
		public strokeStyle:string;
		public lineAlpha:number;
		public lineCap:string; //"butt", "round", "square"
		public lineJoin:string; //"miter", "round", "bevel"
		public miterLimit:number;

		public hasStroke:boolean;
		public hasFill:boolean;

		public fillStyle:string;
		public fillAlpha:number;

		constructor(props:any);

		public lineStyle(thickness?:number, lineColor?:string, alpha?:number, lineCap?:string, lineJoin?:string, miterLimit?:number):any;

		public beginFill(fill:string, alpha?:number):any;

		public endFill():any;

		public beginLinearGradientFill(x0:number, y0:number, x1:number, y1:number, colors, ratios):any;

		public beginRadialGradientFill(x0:number, y0:number, r0:number, x1:number, y1:number, r1:number, colors:any, ratios:any):any;

		public beginBitmapFill(image:any, repetition:string):any;

		public beginPath():any;

		public closePath():any;

		public drawRect(x:number, y:number, width:number, height:number):any;

		public drawRoundRectComplex(x:number, y:number, width:number, height:number, cornerTL:number, cornerTR:number, cornerBR:number, cornerBL:number):any;

		public drawRoundRect(x:number, y:number, width:number, height:number, cornerSize):any;

		public drawCircle(x:number, y:number, radius):any;

		public drawEllipse(x:number, y:number, width:number, height:number):any;

		public drawSVGPath(pathData:any):any;

		public getDrawable(context:any):any;

		public cache(toImage:boolean):any;

		public uncache():void;

		public toImage(type:string):any;

		public clear():void;
	}

	class Text extends DisplayObject {
		public id:number;
		public text:string;
		public font:string;
		public color:string;
		public textAlign:string;
		public outline:boolean;
		public maxWidth:number;
		public lineWidth:number
		public lineSpacing:number;
		public fontMetrics:string;
		static getFontMetrics:any;

		constructor(props:any);

		public setFont(font:string, ignoreFontMetrics:boolean):void;
		public render(context:any):void;

		public getDrawable(context:any):any;
	}
}