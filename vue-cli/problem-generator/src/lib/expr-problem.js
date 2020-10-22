import {Problem} from './problem';
import {rand_expression} from './util';

export class ExprProblem extends Problem
{
	constructor (ctx)
	{
		super(ctx);
		this.expr = rand_expression(ctx.max_val);
		this.result = {};
		this.ctx = ctx;
		this.user_answer = null;
	}

	answer_is_correct()
	{
		return this.user_answer && this.expr.ans == (this.user_answer);
	}
}
