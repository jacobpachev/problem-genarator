import {Problem} from './problem';
import {rand_linear_equation} from './util';

export class LinearEquationProblem extends Problem
{
	constructor (ctx)
	{
		super(ctx);
		this.eq = rand_linear_equation(ctx.max_val);
		this.result = {};
		this.ctx = ctx;
		this.user_answer = null;
	}

	answer_is_correct()
	{
		return this.user_answer && this.eq.x.obj_equals(this.user_answer);
	}
}
