import { Eva } from "../../../js/lib/eva.js";
import { Environment } from "../../../js/lib/eva-environment.js";

describe("eva", () => {
	let eva;
	beforeEach(() => {
		eva = new Eva();
	});
	describe("lambda", () => {
		it("should eval a lambda function", () => {
			const result = eva.eval(
				["begin",
					["def", "onClick", ["callback"],
						["begin",
							["var", "x", 10],
							["var", "y", 20],
							["callback", ["+", "x", "y"]]
						]
					],
					["onClick", ["lambda", ["data"], ["*", "data", 10]]]
			]);

			expect(result).toBe(300);
		});
		it("should eval an immediately invoked lamba expression", () => {
			const result = eva.eval(
				[
					["lambda", ["x"], ["*", "x", "x"]],
					3
				]
			);

			expect(result).toBe(9);
		});
		it("should save a lambda to a variable", () => {
			const result = eva.eval(
				["begin",
					["var", "square", ["lambda", ["x"], ["*", "x", "x"]]],
					["square", 3]
				]
			);

			expect(result).toBe(9);
		});
	});
});