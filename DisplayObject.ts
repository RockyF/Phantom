/**
 * Created by RockyF on 2014/5/12.
 */

/// <reference path="Phantom.ts" />



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
	root:any;
	stage:any;

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

	//display sheet
	contains(child:any):boolean{
		return this.getChildIndex(child) >= 0;
	}

	getChildIndex(child:any):number{
		return this.children.indexOf(child);
	}

	addChild(child:any):any{
		this.children.push(child);
	}

	broadcastAddedToStage(child:any):void{
		child.parent = this.stage;
		child.root = this.root;
		for(var i, len = this.children.length; i < len; i++){
			child.broadcastAddedToStage(this.children[i]);
		}
	}
}