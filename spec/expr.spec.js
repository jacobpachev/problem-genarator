import { Expr, SQRT_SYM } from  "../vue-cli/problem-generator/src/lib/expr";

describe("Expression test suite", function() {
  it("check basic expression operations", function() {
		let test_exprs = ["-" + SQRT_SYM + "3 / 2", "-" + SQRT_SYM + "18 / 2"];
		let expected_vals  = [-0.86,-2.121];
		for (let expr_str of test_exprs)
		{
			let e = new Expr(expr_str);
			console.log("Expr: ", expr_str, " = ", e.eval());
			expect(e.eval() == expected_vals).toBe(true);
		}
  });
});
