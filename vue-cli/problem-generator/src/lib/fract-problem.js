import {Problem} from './problem';
import {Fraction} from './fract';
import {rand_sign, rand_fraction} from './util';

export class FractProblem extends Problem
{
	constructor (ctx)
	{
		super(ctx);
		this.fracts = [];
		this.signs = [];
		this.result = {};
		for (let i = 0; i < ctx.n_terms; i++)
		{
			this.fracts[i] = rand_fraction(ctx.max_val);
			this.signs[i] = rand_sign();
		}
		this.compute_answer();
	}

	compute_answer()
	{
		this.answer = new Fraction(0,0,1);
		for(let i = 0; i < this.fracts.length; i++)
		{
			if (this.signs[i] == "+")
				this.answer.add(this.fracts[i]);
			else
			{
				let tmp = this.fracts[i].clone();
				tmp.neg();
				this.answer.add(tmp);
			}
		}
	}
}

if (typeof exports !== "undefined")
{
	exports.FracProblem = FractProblem;
}
