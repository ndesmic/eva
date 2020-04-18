import { Eva } from "../../../js/lib/eva.js";
import { Environment } from "../../../js/lib/eva-environment.js";

describe("eva", () => {
	let eva;
	beforeEach(() => {
		eva = new Eva();
	});
	describe("class", () => {
		it("should construct a class", () => {
			const result = eva.eval(["begin",
				["class", "Point", "null",
					["begin",
						["def", "constructor", ["this", "x", "y"],
							["begin",
								["set", ["prop", "this", "x"], "x"],
								["set", ["prop", "this", "y"], "y"]]],
						["def", "calc", ["this"],
							["+", ["prop", "this", "x"], ["prop", "this", "y"]]]
					]
				],
				["var", "p", ["new", "Point", 10, 20]],
				[["prop", "p", "calc"], "p"]
			]);

			expect(result).toBe(30);
		});
		it("should construct an inhereting class", () => {
			const result = eva.eval(["begin",
				["class", "Point", "null",
					["begin",
						["def", "constructor", ["this", "x", "y"],
							["begin",
								["set", ["prop", "this", "x"], "x"],
								["set", ["prop", "this", "y"], "y"]]],
						["def", "calc", ["this"],
							["+", ["prop", "this", "x"], ["prop", "this", "y"]]]
					]
				],
				["class", "Point3d", "Point",
					["begin",
						["def", "constructor", ["this", "x", "y", "z"],
							["begin",
								[["prop", ["super", "Point3d"], "constructor"], "this", "x", "y"],
								["set", ["prop", "this", "z"], "z"]]],
						["def", "calc", ["this"],
							["+", [["prop", ["super", "Point3d"], "calc"], "this"], 
								  ["prop", "this", "z"]]]
					]
				],
				["var", "p", ["new", "Point3d", 10, 20, 30]],
				[["prop", "p", "calc"], "p"]
			]);

			expect(result).toBe(60);
		});
	});
});