/**
 * Created by RockyF on 14-5-12.
 */

class StringUtils {
	static format(fmt:string, ...params):string{
		var result:string = fmt;
		for(var i = 0, len:number = params.length; i < len; i++){
			result = result.replace('{' + i + '}', params[i]);
		}

		return result;
	}
}

class ColorUtils{
	static toWeb(color:number, alpha:number = 1):string{
		var b:number = color % 256;
		var g:number = (color >> 8) % 256;
		var r:number = color >> 16;
		return StringUtils.format('rgba({0}, {1}, {2}, {3})', r, g, b, alpha);
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