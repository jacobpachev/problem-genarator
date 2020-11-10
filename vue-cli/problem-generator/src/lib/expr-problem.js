import {Problem} from './problem';
import {interval_rand} from './util';
import {Fraction} from './fract';
import { simplify, parse } from 'mathjs';

function simplify_power_ratio(numer_vars, denom_vars)
{
	let combined_vars = {};

	for (let v in numer_vars)
	{
		combined_vars[v] = combined_vars[v] || 0;
		combined_vars[v] += numer_vars[v];
	}

	for (let v in denom_vars)
	{
		combined_vars[v] = combined_vars[v] || 0;
		combined_vars[v] -= denom_vars[v];
	}

	let simple_numer = {};
	let simple_denom = {};

	for (let v in combined_vars)
	{
		if (!combined_vars[v])
			continue;

		if (combined_vars[v] > 0)
			simple_numer[v] = combined_vars[v];
		else
			simple_denom[v] = -combined_vars[v];
	}

	return {numer: simple_numer, denom: simple_denom};
}

function var_term_to_str(term)
{
	let keys = Object.keys(term).sort();
	let res = keys.map((k) => k + "^" + term[k]).join("*");
	if (!res)
		return "1";
	return res;
}

export class ExprProblem extends Problem
{
	constructor (ctx)
	{
		super(ctx);
		this.ctx = ctx;
		this.expr = this.gen_expr();
		this.user_answer = null;
	}

	answer_is_correct()
	{
		try
		{
			return this.user_answer && simplify(this.result + "-(" + this.user_answer + ")").toString() === "0";
		}
		catch (e) {
			return false;
		}
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
		let res = {vars: {}};

		// n_terms is really the number of variables in a term here
		for (let i = 0; i < this.ctx.n_terms; i++)
		{
			if (s.length)
				s += "*";
			let v = this.get_var_by_ind(i) ;
			let v_pw = interval_rand(-this.ctx.max_val, this.ctx.max_val);
			res.vars[v] = v_pw;
			s += v + "^" + v_pw;
		}

		let k = interval_rand(-this.ctx.max_val, this.ctx.max_val);

		if (Math.abs(k) < 2)
			k = this.ctx.max_val - 1;

		res.k = k;
		res.var_expr = s;
		return res;
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
		if (Math.abs(denom.k) == 1)
			denom.k = this.max_val;
		if (numer.k == denom.k)
			numer.k = denom.k + 1;
		let k_fract = new Fraction(0, numer.k, denom.k);
		k_fract.reduce();
		let simple_expr = simplify_power_ratio(numer.vars, denom.vars);
		let denom_term_str = var_term_to_str(simple_expr.denom);
		let denom_append = denom_term_str === "1" ? "" : "/(" + denom_term_str + ")";

		this.result = k_fract.numer + "/" + k_fract.den + " * " + var_term_to_str(simple_expr.numer)
			+ denom_append;

		let numer_str = k_fract.numer + " * " + numer.var_expr;
		let denom_str = k_fract.den + " * " + denom.var_expr ;

		return {str: numer_str + "/(" + denom_str + ")", tex: "\\frac{" + parse(numer_str).toTex()
			+ "}{" + parse(denom_str).toTex() + "}"};
	}
}
