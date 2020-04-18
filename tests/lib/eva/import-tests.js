import { Eva } from "../../../js/lib/eva.js";

describe("eva", () => {
	let eva;
	beforeEach(() => {
		eva = new Eva();
	});
	describe("Modules", () => {
		it("should import module", () => {
			const result = eva.eval([
				"begin",
				["import", "Math"],
				[["prop", "Math", "abs"], -10]
			])

			expect(result).toBe(10);
		});
	})
});