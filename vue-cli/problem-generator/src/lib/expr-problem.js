import {Problem} from './problem';
import {interval_rand} from './util';
import {Fraction} from './fract';
import { simplify, parse } from 'mathjs';

export class ExprProblem extends Problem
{
	constructor (ctx)
	{
		super(ctx);
		this.ctx = ctx;
		this.expr = { str: this.gen_expr()};
		this.expr.tex = parse(this.expr.str).toTex();
		this.user_answer = null;
	}

	answer_is_correct()
	{
		return this.user_answer && simplify(this.result + "-(" + this.user_answer + ")").toString() === "0";
	}

	gen_expr()
	{
		throw "gen_expr() must be implemented in the derived class";
	}

	get_var_by_ind(ind)
	{
		return String.fromCharCode(ind + 97); // 'a' + ind
	}

	// TODO: probably needs a better name
	gen_term()
	{
		let s = "";

		// n_terms is really the number of variables in a term here
		for (let i = 0; i < this.ctx.n_terms; i++)
		{
			if (s.length)
				s += "*";
			s += this.get_var_by_ind(i) + "^" + interval_rand(-this.ctx.max_val, this.ctx.max_val);
		}

		let k = interval_rand(-this.ctx.max_val, this.ctx.max_val);

		if (Math.abs(k) < 2)
			k = this.ctx.max_val - 1;

		return { k, var_expr: s };
	}
}

export class PowerRatioExprProblem extends ExprProblem
{
	constructor(ctx)
	{
		super(ctx);
	}

	dump_tree(expr_tree)
	{
		console.log("Data:", expr_tree);
		if (!expr_tree.args)
			return;
		console.log("Children:");
		for (let arg of expr_tree.args)
		{
			this.dump_tree(arg);
		}
	}

	find_mul_num_arg(tree)
	{
		console.log("searching", tree);
		if (typeof tree.args === "undefined")
			return null;

		for (let arg of tree.args)
		{
			if (typeof arg.value !== "undefined" && tree.fn === "multiply")
				return arg.value;

			let val = this.find_mul_num_arg(arg);
			if (val)
				return val;
		}

		return null;
	}

	gen_expr()
	{
		let numer = this.gen_term() ;
		let denom = this.gen_term();
		let k_fract = new Fraction(0, numer.k, denom.k);
		k_fract.reduce();

		this.result = k_fract.numer + " * " + simplify(numer.var_expr + "/("
			+ denom.var_expr + ")").toString() + "/" + k_fract.den;

		return k_fract.numer + " * " + numer.var_expr + "/(" + k_fract.den + " * "
			+ denom.var_expr + ")";
	}
}
