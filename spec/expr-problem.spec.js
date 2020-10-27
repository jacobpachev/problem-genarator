import { RatioPowerExprProblem } from  "../vue-cli/problem-generator/src/lib/expr-problem";

describe("Expression problem test suite", function () {
	it("test ratio power expression", function() {
		let ctx = {n_terms: 3, max_val: 10};
		let e = new RatioPowerExprProblem(ctx);
		console.log(e.expr);
	});
});
