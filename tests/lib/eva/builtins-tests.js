import { Eva } from "../../../js/lib/eva.js";
import { Environment } from "../../../js/lib/eva-environment.js";

describe("eva", () => {
	let eva;
	beforeEach(() => {
		eva = new Eva();
	});
	describe("Print", () => {
		it("should print", () => {
			eva.eval(["print", `"hello"`, `"world"`]);
		});
	});
	describe("Math", () => {
		it("should eval addition", () => {
			expect(eva.eval(["+", 1, 5])).toBe(6);
		});
		it("should eval nested addition", () => {
			expect(eva.eval(["+", ["+", 3, 2], 5])).toBe(10);
		});
		it("should eval subtraction", () => {
			expect(eva.eval(["+", ["-", 3, 2], 5])).toBe(6);
		});
		it("should eval multiplication", () => {
			expect(eva.eval(["+", ["*", 3, 2], 5])).toBe(11);
		});
		it("should eval division", () => {
			expect(eva.eval(["/", 10, 5])).toBe(2);
		});
	});
	describe("Compaison", () => {
		it("should eval equals", () => {
			expect(eva.eval(["==", 1, 1])).toBe(true);
			expect(eva.eval(["==", 1, 2])).toBe(false);
		});
		it("should eval less than", () => {
			expect(eva.eval(["<", 1, 1])).toBe(false);
			expect(eva.eval(["<", 1, 2])).toBe(true);
			expect(eva.eval(["<", 2, 1])).toBe(false);
		});
		it("should eval greater than", () => {
			expect(eva.eval([">", 1, 1])).toBe(false);
			expect(eva.eval([">", 1, 2])).toBe(false);
			expect(eva.eval([">", 2, 1])).toBe(true);
		});
		it("should eval less than or equal", () => {
			expect(eva.eval(["<=", 1, 1])).toBe(true);
			expect(eva.eval(["<=", 1, 2])).toBe(true);
			expect(eva.eval(["<=", 2, 1])).toBe(false);
		});
		it("should eval greater than or equal", () => {
			expect(eva.eval([">=", 1, 1])).toBe(true);
			expect(eva.eval([">=", 1, 2])).toBe(false);
			expect(eva.eval([">=", 2, 1])).toBe(true);
		});
	});
});