export class Stack {
	constructor()
	{
		this.arr = [];
	}

	push(el)
	{
		this.arr.push(el);
	}

	clear()
	{
		this.arr = [];
	}

	empty()
	{
		return this.arr.length == 0;
	}

	pop()
	{
		if (this.empty())
			throw "Stack is empty in pop";
		return this.arr.pop();
	}

	peek()
	{
		if (this.empty())
			throw "Stack is empty in peek()";
		return this.arr[this.arr.length - 1];
	}

}
