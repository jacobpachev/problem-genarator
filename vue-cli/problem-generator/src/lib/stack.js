class Stack { 
	constructor() 
	{ 
		this.operand = [];
		this.operin = [];
	} 
	 
	push(element,arr) 
	{ 
		arr.push(element); 
	}
	
	pop(arr) 
	{ 
		if (arr.length == 0) 
			return "Underflow"; 
		return arr.pop(); 
	} 
	
	peek(arr) 
	{ 
		return arr[arr.length - 1]; 
	} 
  
} 
