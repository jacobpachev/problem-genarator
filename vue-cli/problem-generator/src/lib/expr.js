import {Stack} from './stack';

export const SQRT_KEY = "^";
export const SQRT_SYM = "\u221a";

const prec_map = {SQRT_SYM : 1, '/' : 2, '-' : 1};

export class Expr
{
	constructor(expr_str)
	{
		this.expr_str = expr_str;
		this.op_stack = new Stack();
		this.val_stack = new Stack();
		this.parse_pos = 0;
	}

	eval()
	{
		console.log(prec_map);
	}

	next_token()
	{
		let start_number = null;
		for (let i = this.parse_pos; i < this.expr_str.length; i++)
		{
			let c = this.expr_str[i];
			switch (c)
			{
				case ' ':
				case '\t':
				case '\n':
				case '\r':
					if (start_number)
					{
						let res = this.expr_str.substr(start_number, i);
						this.parse_pos = i + 1;
						return res;
					}
					continue;
				case '/':
				case SQRT_SYM:
				case '-':
					this.parse_pos = i + 1;
					return c;
			}

			if ((c >= '0' && c <= '9') || c == '.')
			{
				if (start_number === null)
					start_number = this.parse_pos + i;
			}
		}

		if (start_number)
			return this.expr_str.substr(start_number, this.expr_str.length - start_number);

		return null;
	}
}
