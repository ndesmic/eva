import { Eva } from "../../../js/lib/eva.js";
import { Environment } from "../../../js/lib/eva-environment.js";

describe("eva", () => {
	let eva;
	beforeEach(() => {
		eva = new Eva();
	});
	describe("blocks", () => {
		it("should eval a block", () => {
			const result = eva.eval(
				["begin",
					["var", "x", 10],
					["var", "y", 20],
					["+", ["*", "x", "y"], 30]
			]);

			expect(result).toBe(230);
		});
		it("should eval nested block", () => {
			const result = eva.eval(
				["begin",
					["var", "x", 10],
					["begin",
						["var", "x", 20],
						"x"
					],
					"x"
				]);

			expect(result).toBe(10);
		});
		it("should eval block with outer variables", () => {
			const result = eva.eval(
				["begin",
					["var", "value", 10],
					["var", "result", ["begin",
						["var", "x", ["+", "value", 10]],
						"x"
					]],
					"result"
				]);

			expect(result).toBe(20);
		});
		it("should assign variables", () => {
			const result = eva.eval(
				["begin",
					["var", "data", 10],
					["begin",
						["set", "data", 100]
					],
					"data"
				]);

			expect(result).toBe(100);
		});
	});
});