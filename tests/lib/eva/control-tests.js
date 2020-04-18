import { Eva } from "../../../js/lib/eva.js";
import { Environment } from "../../../js/lib/eva-environment.js";

describe("eva", () => {
	let eva;
	beforeEach(() => {
		eva = new Eva();
	});

	describe("control", () => {
		it("evaluates branches", () => {
			const result = eva.eval(
				["begin",
					["var", "x", 10],
					["var", "y", 0],
					["if", [">", "x", 10],
						["set", "y", 20],
						["set", "y", 30]
					],
					"y"
			]);

			expect(result).toBe(30);
		});
		it("evaluates while loops", () => {
			const result = eva.eval(
				["begin",
					["var", "counter", 0],
					["var", "result", 0],
					["while", ["<", "counter", 10],
						["begin",
							["set", "result", ["+", "result", 1]],
							["set", "counter", ["+", "counter", 1]]
						],
					],
					"result"
				]);

			expect(result).toBe(10);
		});
		it("evaluates switch statements", () => {
			const result = eva.eval(
				["begin",
					["var", "x", 10],
					["switch", 
						[["==", "x", 10], 100],
						[[">", "x", 10], 200],
						["else", 300]
					]
				]);

			expect(result).toBe(100);

			const result2 = eva.eval(
				["begin",
					["var", "x", 12],
					["switch",
						[["==", "x", 10], 100],
						[[">", "x", 10], 200],
						["else", 300]
					]
				]);

			expect(result2).toBe(200);

			const result3 = eva.eval(
				["begin",
					["var", "x", 1],
					["switch",
						[["==", "x", 10], 100],
						[[">", "x", 10], 200],
						["else", 300]
					]
				]);

			expect(result3).toBe(300);
		});
		it("evaluates for loops", () => {
			const result = eva.eval(
				["begin",
					["var", "counter", 0],
					["for", ["var", "x", 0], 
							["<", "x", 11], 
							["set", "x", ["+", "x", 1]],
							["begin",
								["set", "counter", ["+", "counter", 1]],
							]
					],
					"counter"
				]);

			expect(result).toBe(11);
		});
	});
});