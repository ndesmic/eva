import { Eva } from "../../../js/lib/eva.js";
import { Environment } from "../../../js/lib/eva-environment.js";

describe("eva", () => {
	let eva;
	beforeEach(() => {
		eva = new Eva();
	});
	describe("Variables", () => {
		it("should eval with global environment", () => {
			expect(eva.eval("VERSION")).toBe("0.1");
		});
		it("should eval variable declarations and retrieval", () => {
			expect(eva.eval(["var", "x", 10])).toBe(10);
			expect(eva.eval("x")).toBe(10);
		});
		it("should eval with indirect variable references", () => {
			expect(eva.eval(["var", "isUser", "true"])).toBe(true);
		});
		it("should eval with indirect variable references", () => {
			expect(eva.eval(["var", "z", ["*", 2, 2]])).toBe(4);
			expect(eva.eval("z")).toBe(4);
		});
		it("should eval updated variables", () => {
			const result = eva.eval(["begin",
				["var", "z", 5],
				["set", "z", 15],
				"z"
			]);
			expect(result).toBe(15);
		});
		it("should eval increment", () => {
			const result = eva.eval(["begin",
				["var", "z", 5],
				["++", "z"],
				"z"
			]);
			expect(result).toBe(6);
		});
		it("should eval decrement", () => {
			const result = eva.eval(["begin",
				["var", "z", 5],
				["--", "z"],
				"z"
			]);
			expect(result).toBe(4);
		});
		it("should eval add assign", () => {
			const result = eva.eval(["begin",
				["var", "z", 5],
				["+=", "z", 6],
				"z"
			]);
			expect(result).toBe(11);
		});
		it("should eval sub assign", () => {
			const result = eva.eval(["begin",
				["var", "z", 5],
				["-=", "z", 2],
				"z"
			]);
			expect(result).toBe(3);
		});
	});
});