import {Stack} from './stack';

export const SQRT_KEY = "^";
export const SQRT_SYM = "\u221a";

const prec_map = {SQRT_SYM : 1, '/' : 2, '-' : 1};

function is_operator(token)
{
	return prec_map[token];
}

export class Expr
{
	constructor(expr_str)
	{
		this.expr_str = expr_str;
		this.op_stack = new Stack();
		this.val_stack = new Stack();
		this.parse_pos = 0;
	}

	process_number(token)
	{
		this.val_stack.push(token);
	}

	process_operator(token)
	{
		for (;;)
		{
			console.log(token);
		}
	}

	process_token(token)
	{
		if (is_operator(token))
		{
			this.process_operator(token);
			return;
		}

		this.process_number(token);
	}

	eval()
	{
		for (;;)
		{
			let token = this.next_token();

			if (token === null)
				break;

			this.process_token(token);
		}
	}

	next_token()
	{
		let start_number = null;
		for (let i = this.parse_pos; i < this.expr_str.length; i++)
		{
			let c = this.expr_str[i];
			let handle_token_found = (new_pos) => {
				let res = this.expr_str.substr(start_number, i - start_number);
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
					start_number = i;
			}
		}

		if (start_number)
		{
			this.parse_pos = this.expr_str.length;
			return this.expr_str.substr(start_number, this.expr_str.length - start_number);
		}

		return null;
	}
}
