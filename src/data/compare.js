import { findMaxSubsequence } from '../util/max-subsequence.js';

export { compareContent };

function compareContent([contentA, contentB]) {
	contentA = normalizeContent(contentA);
	contentB = normalizeContent(contentB);

	if (contentA === contentB) {
		return [contentA, contentB];
	}
	if (!contentA) {
		return [contentA, `~[${contentB}]~`];
	}
	if (!contentB) {
		return [`~[${contentA}]~`, contentB];
	}

	let arrA = contentA.split(' ');
	let arrB = contentB.split(' ');

	([arrA, arrB] = processArrays(arrA, arrB));

	contentA = arrA.join(' ');
	contentB = arrB.join(' ');

	return [contentA, contentB];
}
function normalizeContent(content) {
	return content.replace(/[\r\n\s\t]+/g, ' ');
}

function processArrays(arrA, arrB) {
	let { length, firstOffset, secondOffset } = findMaxSubsequence(arrA, arrB);

	if (length === arrA.length && length === arrB.length) {
		return [arrA, arrB];
	}

	if (!arrA.length || !arrB.length) {
		return [wrapWithChanges(arrA), wrapWithChanges(arrB)];
	}

	if (length < 2) {
		return [wrapWithChanges(arrA), wrapWithChanges(arrB)];
	}

	let leftA = arrA.slice(0, firstOffset);
	let leftB = arrB.slice(0, secondOffset);

	let rightA = arrA.slice(firstOffset + length);
	let rightB = arrB.slice(secondOffset + length);

	([leftA, leftB] = processArrays(leftA, leftB));
	([rightA, rightB] = processArrays(rightA, rightB));

	return [
		leftA.concat(arrA.slice(firstOffset, firstOffset + length), rightA),
		leftB.concat(arrB.slice(secondOffset, secondOffset + length), rightB),
	];
}

function wrapWithChanges(arr) {
	if (!arr.length) {
		return arr;
	}

	arr[0] = '~[' + arr[0];
	arr[arr.length - 1] = arr[arr.length - 1] + ']~';

	return arr;
}