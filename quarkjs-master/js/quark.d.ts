declare module Q{
	class Quark{
		static inherit(childClass:any, parentClass:any): void;
		static merge(obj:any, props:any, strict:boolean = false): any;
		static delegate(func:any, self:any): any;
		static getDOM(id:string): any;
		static createDOM(type:string, props:any):any;
		static use(name:string):any;
		static getElementOffset(elem:any):any;
		static createDOMDrawable(disObj:any, imageObj:any):any;
		static DEG_TO_RAD:number;
		static RAD_TO_DEG:number;
		static hitTestPoint(obj:any, x:number, y:number, usePolyCollision:boolean = false):number;
		static hitTestObject(obj1:any, obj2:any, usePolyCollision:boolean = false):boolean;
		static polygonCollision(poly1:any, poly2:any):boolean;
		static doSATCheck(poly1:any, poly2:any, result:any):any;
		static toString():string;
		static trace(...args):void;
		static getUrlParams():any;
		static addMeta(props:any):void;
		static toggleDebugRect(stage:any):void;
		static cacheObject(obj:any, toImage:any, type:string):void;
	}

	class Matrix{
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
		constructor(x:number, y:number, width:number, height:number);
		public intersects: (rect:any) =>boolean;
		public intersection: (rect:any) =>any;
		public union: (rect:any, returnNew:boolean) =>void;
		public containsPoint: (x:number, y:number) =>boolean;
		public clone: () =>any;
		public toString: () =>string;
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