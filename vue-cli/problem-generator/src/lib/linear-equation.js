import {Fraction} from './fract';

export class LinearEquation {
	constructor (a,b,c,d) {
		this.a = a;
		this.b = (this.rand_sign()==='-') ? - b: b;
		this.c = c;
		this.d = (this.rand_sign()==='-') ? - d: d;
		this.x = new Fraction(0, this.a - this.c, this.d - this.b);
		this.x.normalize();
		console.log("Solution", this.x);
		console.log("b",this.b);
	}
	rand_sign () {
		return Math.random() >= 0.5 ? '-' : '+';
	}
}
