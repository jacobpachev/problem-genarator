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
			let handle_token_found = (new_pos) => {
				let res = this.expr_str.substr(start_number, i - start_number);
				console.log("start_number ", start_number, "i", i);
				this.parse_pos = new_pos;
				return res;
			};
			switch (c)
			{
				case ' ':
				case '\t':
				case '\n':
				case '\r':
					if (start_number)
						return handle_token_found(i + 1);

					break;
				case '/':
				case SQRT_SYM:
				case '-':
					if (start_number)
						return handle_token_found(i);

					this.parse_pos = i + 1;
					return c;
			}
			if ((c >= '0' && c <= '9') || c == '.')
			{
				if (start_number === null) 
					start_number = this.parse_pos + i;
				this.parse_pos = i + 1;
				return c;
				
			}
		}

		if (start_number)
			return this.expr_str.substr(start_number, this.expr_str.length - start_number);

		return null;
	}
}
