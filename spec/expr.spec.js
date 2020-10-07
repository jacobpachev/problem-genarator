import { Expr, SQRT_SYM } from  "../vue-cli/problem-generator/src/lib/expr";

describe("Expression test suite", function() {
  it("check basic expression operations", function() {
		let e = new Expr("-" + SQRT_SYM + "3 / 2");
		let token = null;
		while ((token = e.next_token()))
		{
			console.log("token: " + token);
		}
  });
});
