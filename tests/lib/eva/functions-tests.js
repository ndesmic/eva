import { Eva } from "../../../js/lib/eva.js";
import { Environment } from "../../../js/lib/eva-environment.js";

describe("eva", () => {
	let eva;
	beforeEach(() => {
		eva = new Eva();
	});
	describe("blocks", () => {
		it("should eval a function", () => {
			const result = eva.eval(
				["begin",
					["def", "square", ["x"],
						["*", "x", "x"]
					],
					["square", 3]
			]);

			expect(result).toBe(9);
		});
		it("should eval a fuction with local environment", () => {
			const result = eva.eval(
				["begin",
					["def", "calc", ["x", "y"],
						["begin",
							["var", "z", 30],
							["+", ["*", "x", "y"], "z"]
					]],
					["calc", 10, 20]
				]);

			expect(result).toBe(230);
		});
		it("should eval a function as closure", () => {
			const result = eva.eval(
				["begin",
					["var", "value", 100],
					["def", "calc", ["x", "y"],
						["begin",
							["var", "z", ["+", "x", "y"]],
							["def", "inner", ["foo"],
								["+", ["+", "foo", "z"], "value"]],
							"inner"
						]
					],
					["var", "fn", ["calc", 10, 20]],
					["fn", 30]
				]);

			expect(result).toBe(160);
		});
		it("should eval a function recursively", () => {
			const result = eva.eval(
				["begin",
					["def", "factorial", ["x"],
						["if", ["==", "x", 1],
							1,
							["*", "x", ["factorial", ["-", "x", 1]]]
						]
					],
					["factorial", 5]
				]
			);
			expect(result).toBe(120);
		});
	});
});