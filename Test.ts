
/// <reference path="Phantom.ts" />

module tbs{
	export class DisplayTest extends Sprite{
		constructor(){
			super();

			this.addChild(new Box());
		}
	}
}

class Box extends Sprite{
	constructor(){
		super();
		this.addEventListener(PEvent.ADDED, this.onAdded);
		this.addEventListener(PEvent.ADDED_TO_STAGE, this.onAddedToStage);
	}

	onAdded(event:any):void{
		console.log('onAdded');
	}

	onAddedToStage(event:any):void{
		console.log('onAddedToStage');
	}
}

window.onload = function(){
	var canvas = document.getElementById('canvasStage');
	var stage = new Stage(canvas, new tbs.DisplayTest());

};