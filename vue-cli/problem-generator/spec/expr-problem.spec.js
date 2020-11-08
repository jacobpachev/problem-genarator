import { PowerRatioExprProblem } from  "../src/lib/expr-problem";

describe("Expression problem test suite", function () {
	it("test ratio power expression", function() {
		let ctx = {n_terms: 3, max_val: 10};
		let e = new PowerRatioExprProblem(ctx);
		console.log("expr:", e.expr, "result", e.result);
	});
});
