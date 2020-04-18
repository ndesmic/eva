export class Transformer {
	transformDefToVarLambda(defExp){
		const [_, name, params, body] = defExp;
		return ["var", name, ["lambda", params, body]];
	}
	transformSwitchToIf(exp){
		const [_tag, ...cases] = exp;
		const ifExp = ["if", null, null, null];
		let current = ifExp;
		for(let i = 0; i < cases.length - 1; i++){
			const [currentCondition, currentBlock] = cases[i];

			current[1] = currentCondition;
			current[2] = currentBlock;
			
			const next = cases[i + 1];
			const [nextCondition, nextBlock] = next;

			current[3] = nextCondition === "else"
				? nextBlock
				: ["if"];
			current = current[3];
		}
		return ifExp;
	}
	transformForToWhile(exp){
		const [_tag, init, condition, modifier, body] = exp;

		return ["begin",
					init,
					["while", condition, 
						["begin",
							body,
							modifier]]
		];
	}
	transformIncToSet(exp){
		const [_tag, variable] = exp;
		return ["set", variable, ["+", variable, 1]];
	}
	transformDecToSet(exp) {
		const [_tag, variable] = exp;
		return ["set", variable, ["-", variable, 1]];
	}
	transformAddAssignToSet(exp) {
		const [_tag, variable, value] = exp;
		return ["set", variable, ["+", variable, value]];
	}
	transformSubAssignToSet(exp) {
		const [_tag, variable, value] = exp;
		return ["set", variable, ["-", variable, value]];
	}
}