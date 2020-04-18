import { Eva } from "../../../js/lib/eva.js";

describe("eva", () => {
	let eva;
	beforeEach(() => {
		eva = new Eva();
	});
	describe("Modules", () => {
		it("should eval module", () => {
			const result = eva.eval([
			"begin",
				["module", "Math", 
					["begin",
						["def", "abs", ["value"],
							["if", ["<", "value", 0],
								["-", "value"],
								["value"]
							]
						],
						["def", "square", ["x"],
							["*", "x", "x"]
						],
						["var", "MAX_VALUE", 1000]
					]
				],
				[["prop", "Math", "abs"], -10]	
			])

			expect(result).toBe(10);
		});
		it("should be able to assign module props", () => {
			const result = eva.eval([
			"begin",
				["module", "Math",
					["begin",
						["def", "abs", ["value"],
							["if", ["<", "value", 0],
								["-", "value"],
								["value"]
							]
						],
						["def", "square", ["x"],
							["*", "x", "x"]
						],
						["var", "MAX_VALUE", 1000]
					]
				],
				["var", "abs", ["prop", "Math", "abs"]],
				["abs", -10]
			])

			expect(result).toBe(10);
		});
		it("should be able to read values", () => {
			const result = eva.eval([
			"begin",
				["module", "Math",
					["begin",
						["def", "abs", ["value"],
							["if", ["<", "value", 0],
								["-", "value"],
								["value"]
							]
						],
						["def", "square", ["x"],
							["*", "x", "x"]
						],
						["var", "MAX_VALUE", 1000]
					]
				],
				["prop", "Math", "MAX_VALUE"]
			])

			expect(result).toBe(1000);
		});
	});
});