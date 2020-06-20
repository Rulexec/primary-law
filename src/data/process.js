export { processRawData };

function processRawData(rawData) {
	let {
		preamble,
		parts_1_2_1994,
		parts_1_2_2004,
	} = rawData;

	let ver1994_1_2 = parse(parts_1_2_1994);
	let ver2004_1_2 = parse(parts_1_2_2004);

	let common = merge(ver1994_1_2, ver2004_1_2);

	return {
		preamble,
		ver1994: ver1994_1_2,
		ver2004: ver2004_1_2,
		common,
	};
}

function merge(ver1994, ver2004) {
	let clauses = new Map();

	traverse(ver1994, part => setClause(part, 0));
	traverse(ver2004, part => setClause(part, 1));

	let common = [];

	traverse(ver1994, null, makeCloningFun(common));

	return common;

	function makeCloningFun(parts) {
		return function(part) {
			let newParts = [];

			parts.push({
				partName: part.partName,
				parts: newParts,
			});

			return {
				deepFun: makeCloningFun(newParts),
				fun(part) {
					let [, { content: newContent }] = clauses.get(part.partName);

					newParts.push({
						partName: part.partName,
						content: part.content,
						newContent,
						equalContent: part.content === newContent,
					});
				},
			};
		};
	}

	function traverse(parts, fun, deepFun) {
		parts.forEach(part => {
			if (Array.isArray(part.parts)) {
				if (deepFun) {
					let { deepFun: newDeepFun, fun: newFun } = deepFun(part);
					traverse(part.parts, newFun, newDeepFun);
				} else {
					traverse(part.parts, fun);
				}
			} else {
				fun(part);
			}
		});
	}

	function setClause(part, index) {
		let arr = clauses.get(part.partName);
		if (!arr) {
			arr = [null, null];
			clauses.set(part.partName, arr);
		}

		arr[index] = {
			content: part.content,
		};
	}
}

function parse(text) {
	let parts = parseParts({
		regexp: /^\s*==\s*([^=]+)\s*==\s*$/gm,
		text,
	});

	parts.forEach(part => {
		let clauses = parseParts({
			regexp: /^\s*=\s*([^=]+)\s*=\s*$/gm,
			text: part.content,
		});

		delete part.content;

		part.parts = [
			{
				partName: '',
				parts: clauses,
			}
		];
	});

	return parts;
}

function parseParts({ regexp, text }) {
	let prevPartName;
	let prevOffset = 0;

	let parts = [];

	while (true) {
		let match = regexp.exec(text);
		if (!match) {
			addPart(text.length);
			break;
		}

		addPart(match.index);
		prevOffset = match.index + match[0].length;

		let [, partName] = match;

		prevPartName = partName.trim();
	}

	function addPart(offset) {
		if (!prevPartName) {
			return;
		}

		parts.push({
			partName: prevPartName,
			content: text.slice(prevOffset, offset).trim(),
		});
	}

	return parts;
}