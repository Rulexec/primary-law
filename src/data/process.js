import { compareContent } from './compare.js';

export { processRawData };

function processRawData(rawData) {
	let {
		preamble,
		parts_1_3_1994,
		parts_1_3_2004,
		parts_4_1994,
		parts_4_2004,
		parts_5_6_1994,
		parts_5_6_2004,
		parts_7_8_1994,
		parts_7_8_2004,
	} = rawData;

	let ver1994_1_3 = parse(parts_1_3_1994);
	let ver2004_1_3 = parse(parts_1_3_2004);
	let ver1994_4 = parse(parts_4_1994);
	let ver2004_4 = parse(parts_4_2004);
	let ver1994_5_6 = parse(parts_5_6_1994);
	let ver2004_5_6 = parse(parts_5_6_2004);
	let ver1994_7_8 = parse(parts_7_8_1994);
	let ver2004_7_8 = parse(parts_7_8_2004);

	let common = merge(ver1994_1_3, ver2004_1_3);
	common = common.concat(merge(ver1994_4, ver2004_4));
	common = common.concat(merge(ver1994_5_6, ver2004_5_6));
	common = common.concat(merge(ver1994_7_8, ver2004_7_8));

	return {
		preamble,
		common,
	};
}

function merge(ver1994, ver2004) {
	let clauses = new Map();

	traverse(ver1994, (part) => setClause(part, 0));
	traverse(ver2004, (part) => setClause(part, 1));

	let common = [];

	traverse(ver1994, null, makeCloningFun(common));

	return common;

	function makeCloningFun(parts) {
		return function (part) {
			let newParts = [];

			parts.push({
				partName: part.partName,
				parts: newParts,
			});

			return {
				deepFun: makeCloningFun(newParts),
				fun(part) {
					let [, { content: newContent }] = clauses.get(
						part.partName,
					);

					let [contentA, contentB] = compareContent([
						part.content,
						newContent,
					]);

					newParts.push({
						partName: part.partName,
						content: contentA,
						newContent: contentB,
						equalContent: part.content === newContent,
					});
				},
			};
		};
	}

	function traverse(parts, fun, deepFun) {
		parts.forEach((part) => {
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
	// Remove single-line comments
	text = text.replace(/^\/\/.*/gm, '');

	let parts = parseParts({
		regexp: /^\s*==\s*([^=]+)\s*==\s*$/gm,
		text,
	});

	parts.forEach((part) => {
		let chapters = parseParts({
			regexp: /^\s*===\s*([^=]+)\s*===\s*$/gm,
			text: part.content,
		});

		if (chapters.length) {
			delete part.content;
			chapters.forEach((part) => {
				parseClauses(part, false);
			});
			part.parts = chapters;
		} else {
			parseClauses(part, true);
		}
	});

	return parts;

	function parseClauses(part, withFictiveChapter) {
		let clauses = parseParts({
			regexp: /^\s*=\s*([^=]+)\s*=\s*$/gm,
			text: part.content,
		});

		delete part.content;

		if (withFictiveChapter) {
			part.parts = [
				{
					partName: '',
					parts: clauses,
				},
			];
		} else {
			part.parts = clauses;
		}
	}
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
