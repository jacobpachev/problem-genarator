import { Expr, SQRT_SYM } from  "../vue-cli/problem-generator/src/lib/expr";

describe("Expression test suite", function() {
  it("check basic expression operations", function() {
		let test_exprs = [ { str: "-" + SQRT_SYM + "3 / 2", val: -Math.sqrt(3)/2 },
		 { str: "-" + SQRT_SYM + "18 / 2", val: -Math.sqrt(18)/2, str: "0", val: 0 } ];

		for (let o of test_exprs)
		{
			let e = new Expr(o.str);
			expect(e.eval() == o.val).toBe(true);
		}
  });
});
