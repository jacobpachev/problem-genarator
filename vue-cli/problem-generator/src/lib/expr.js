import {Stack} from './stack';

export const SQRT_KEY = "^";
export const SQRT_SYM = "\u221a";

const prec_map = {SQRT_SYM : 3, '/' : 2, '-' : 1};

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
		console.log(`Pushing ${token} to value stack`);
		this.val_stack.push(parseFloat(token));
	}

	apply_op(op)
	{
		let a = null, b = null;

		switch(op)
		{
			case SQRT_SYM:
				a = this.val_stack.pop();
				this.val_stack.push(Math.sqrt(a));
				break;
			case '-':
				a = this.val_stack.pop();
				this.val_stack.push(-a);
				break;
			case '/':
				b = this.val_stack.pop();
				a = this.val_stack.pop();
				this.val_stack.push(a / b );
				break;
		}
	}

	process_operator(token)
	{
		for (;;)
		{
			if (this.op_stack.empty())
			{
				break;
			}

			const op = this.op_stack.peek();
			console.log(`Checking token=${token} vs op=${op}, op stack: ${this.op_stack.arr} val stack: ${this.val_stack.arr}`);
			if (prec_map[token] <= prec_map[op])
				this.apply_op(this.op_stack.pop());
			else
				break;
		}

		this.op_stack.push(token);
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
		this.op_stack.clear();
		this.val_stack.clear();

		for (;;)
		{
			let token = this.next_token();

			if (token === null)
				break;

			this.process_token(token);
		}

		for (;;)
		{
			if (this.op_stack.empty())
				break;

			let op = this.op_stack.pop();
			this.apply_op(op);
		}

		return this.val_stack.peek();
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
