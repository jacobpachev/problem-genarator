export class Problem
{
	constructor(ctx)
	{
		this.ctx = ctx;
		this.user_answer = null;
	}

	update_user_answer(answer)
	{
		this.user_answer = answer;
		this.ctx.check_answers();
	}

	answer_is_correct()
	{
		return this.user_answer && this.answer.obj_equals(this.user_answer);
	}

	is_expr()
	{
		return this.ctx.mode.endsWith("_expr");
	}

	is(name)
	{
		console.log("problem type:",  this.ctx.mode);
		let type = "Unknown";

		switch (this.ctx.mode)
		{
			case "linear":
				type = "LinearEquationProblem";
				break;
			case "fract":
				type = "FractProblem";
				break;
			default:
				break;
		}

		return type == name;
	}
}

if (typeof exports !== "undefined")
{
	exports.Problem = Problem;
}
