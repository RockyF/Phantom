declare module Q{
	function inherit(childClass:any, parentClass:any): void;
	function merge(obj:any, props:any, strict:boolean = false): any;
	function delegate(func:any, self:any): any;
	function getDOM(id:string): any;
	function createDOM(type:string, props:any):any;
	function use(name:string):any;
	function getElementOffset(elem:any):any;
	function createDOMDrawable(disObj:any, imageObj:any):any;
	function hitTestPoint(obj:any, x:number, y:number, usePolyCollision:boolean = false):number;
	function hitTestObject(obj1:any, obj2:any, usePolyCollision:boolean = false):boolean;
	function polygonCollision(poly1:any, poly2:any):boolean;
	function doSATCheck(poly1:any, poly2:any, result:any):any;
	function toString():string;
	function trace(...args):void;
	function getUrlParams():any;
	function addMeta(props:any):void;
	function toggleDebugRect(stage:any):void;
	function cacheObject(obj:any, toImage:any, type:string):void;

	class Matrix{
		public a:number;
		public b:number;
		public c:number;
		public d:number;
		public e:number;
		public tx:number;
		public ty:number;

		constructor(a:number, b:number, c:number, d:number, tx:number, ty:number);
		public concat: (mtx) =>any;
		public rotate: (angle) =>any;
		public scale: (sx, sy) =>any;
		public translate: (dx, dy) =>any;
		public identity: () =>any;
		public invert: () =>any;
		public transformPoint: (point, round, returnNew) =>any;
		public clone: () =>any;
		public toString: () =>string;
	}

	class Rectangle{
		public x:number;
		public y:number;
		public width:number;
		public height:number;

		constructor(x:number, y:number, width:number, height:number);
		public intersects: (rect:any) =>boolean;
		public intersection: (rect:any) =>any;
		public union: (rect:any, returnNew:boolean) =>void;
		public containsPoint: (x:number, y:number) =>boolean;
		public clone: () =>any;
		public toString: () =>string;
	}

	enum KEY{
		MOUSE_LEFT : 1,
		MOUSE_MID : 2,
		MOUSE_RIGHT : 3,

		BACKSPACE : 8,
		TAB : 9,
		NUM_CENTER : 12,
		ENTER : 13,
		RETURN : 13,
		SHIFT : 16,
		CTRL : 17,
		ALT : 18,
		PAUSE : 19,
		CAPS_LOCK : 20,
		ESC : 27,
		ESCAPE : 27,
		SPACE : 32,
		PAGE_UP : 33,
		PAGE_DOWN : 34,
		END : 35,
		HOME : 36,
		LEFT : 37,
		UP : 38,
		RIGHT : 39,
		DOWN : 40,
		PRINT_SCREEN : 44,
		INSERT : 45,
		DELETE : 46,

		ZERO : 48,
		ONE : 49,
		TWO : 50,
		THREE : 51,
		FOUR : 52,
		FIVE : 53,
		SIX : 54,
		SEVEN : 55,
		EIGHT : 56,
		NINE : 57,

		A : 65,
		B : 66,
		C : 67,
		D : 68,
		E : 69,
		F : 70,
		G : 71,
		H : 72,
		I : 73,
		J : 74,
		K : 75,
		L : 76,
		M : 77,
		N : 78,
		O : 79,
		P : 80,
		Q : 81,
		R : 82,
		S : 83,
		T : 84,
		U : 85,
		V : 86,
		W : 87,
		X : 88,
		Y : 89,
		Z : 90,

		CONTEXT_MENU : 93,
		NUM_ZERO : 96,
		NUM_ONE : 97,
		NUM_TWO : 98,
		NUM_THREE : 99,
		NUM_FOUR : 100,
		NUM_FIVE : 101,
		NUM_SIX : 102,
		NUM_SEVEN : 103,
		NUM_EIGHT : 104,
		NUM_NINE : 105,
		NUM_MULTIPLY : 106,
		NUM_PLUS : 107,
		NUM_MINUS : 109,
		NUM_PERIOD : 110,
		NUM_DIVISION : 111,
		F1 : 112,
		F2 : 113,
		F3 : 114,
		F4 : 115,
		F5 : 116,
		F6 : 117,
		F7 : 118,
		F8 : 119,
		F9 : 120,
		F10 : 121,
		F11 : 122,
		F12 : 123
	}

	class EventManager{
		public registerStage: (stage:any, events:any, preventDefault:any, stopPropagation:any) =>void;
		public unregisterStage: (stage:any, events:any) =>void;
		public register: (target:any, events:any, callback, preventDefault:any, stopPropagation:any) =>void;
		public unregister: (target:any, events:any, callback:any) =>void;
		public stop: (e:any, continueDefault:any, continuePropagation:boolean) =>void;
	}

	class EventDispatcher{
		public addEventListener: (type:string, listener:any) =>boolean;
		public removeEventListener: (type:string, listener:any) =>boolean;
		public removeEventListenerByType: (type:string) =>boolean;
		public removeAllEventListeners: () =>void;
		public dispatchEvent: (event:any) =>boolean;
		public hasEventListener: (type:string) =>boolean;
	}

	class Context{
		constructor(props:any);
		public startDraw: ()=>void;
		public draw: ()=>void;
		public endDraw: ()=>void;
		public transform: ()=>void;
		public remove: (target:any)=>void;
	}

	class CanvasContext extends Context{
		public clear: ()=>void;
	}

	class DOMContext extends Context{
		public hide: (target:any)=>void;
	}

	class UIDUtil{
		static createUID(name:string):string;
		static displayObjectToString(displayObject):boolean;
	}

	class Timer{
		constructor(interval:number);
		public start():void;
		public stop():void;
		public pause():void;
		public resume():void;
		public delay(callback:any, time:number):void;
		public addListener(obj:any):void;
		public removeListener(obj:any):void;
	}

	class ImageLoader{
		constructor(source:any);
		public load(source):void;
		public getLoaded():boolean;
		public getTotal():number;
		public getLoadedSize():number;
		public getTotalSize():number;
	}

	class Tween{
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

	class Audio extends EventDispatcher{
		constructor(src:string, preload:boolean, autoPlay:boolean, loop:boolean);
		public load():void;
		public play():void;
		public stop():void;
		public loaded():boolean;
		public playing():boolean;
	}

	class Drawable{
		constructor(drawable:any, isDOM:any);
		public get(obj:any, context:any):void;
		public set(drawable:any, isDOM:any):void;
	}

	class DisplayObject extends EventDispatcher{
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
		public cache (toImage:boolean, type:string):any;
		public uncache():any;
		public toImage(type:string):any;
		public toString():string;
	}

	class DisplayObjectContainer extends DisplayObject{
		constructor(props:any);
		public addChildAt(child:any, index:number):any;
		public addChild(child:any):any;
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

	class Stage extends DisplayObjectContainer{
		constructor(props:any);
		public step(timeInfo:any):void;
		public updatePosition():void;
		public updatePosition():void;

	}

	class Bitmap extends DisplayObject{
		constructor(props:any);
		public setRect(rect:any):void;
		public render(context:any):void;
	}

	class MovieClip extends Bitmap{
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

	class Button extends DisplayObjectContainer{
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

	class Graphics extends DisplayObject{
		constructor(props:any);
		public lineStyle(thickness:number = 1, lineColor:string = "0", alpha:number = 1, lineCap:string = "round", lineJoin:string = "round", miterLimit:number = 1):any;
		public beginFill(fill:string, alpha:number = 1):any;
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

	class Text extends DisplayObject{
		static getFontMetrics = function(font:string):any;

		constructor(props:any);
		public setFont = function(font:string, ignoreFontMetrics:boolean):void;
		public render = function(context:any):void;
		public getDrawable(context:any):any;
	}
}