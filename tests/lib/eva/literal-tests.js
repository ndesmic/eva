import { Eva } from "../../../js/lib/eva.js";
import { Environment } from "../../../js/lib/eva-environment.js";

describe("eva", () => {
	let eva;
	beforeEach(() => {
		eva = new Eva();
	});
	describe("Literal Types", () => {
		it("should eval a number literal", () => {
			expect(eva.eval(1)).toBe(1);
		});
		it("should eval a string literal", () => {
			expect(eva.eval(`"hello"`)).toBe("hello");
		});
	});
});