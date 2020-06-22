export { findMaxSubsequence };

function findMaxSubsequence(arrA, arrB) {
	let minArr;
	let maxArr;

	if (arrA.length <= arrB.length) {
		minArr = arrA;
		maxArr = arrB;
	} else {
		minArr = arrB;
		maxArr = arrA;
	}

	let maxLength = 0;
	let maxOffsetMin = 0;
	let maxOffsetMax = 0;

	compareSubSequences(maxArr, minArr);

	let prevMaxLength = maxLength;
	compareSubSequences(minArr, maxArr);
	if (maxLength !== prevMaxLength) {
		([maxOffsetMin, maxOffsetMax] = [maxOffsetMax, maxOffsetMin]);
	}

	function compareSubSequences(arrA, arrB) {
		outer: for (let i = 0; i < arrA.length; i++) {
			let j = 0;
			let length = 0;
			for (; ; j++) {
				let isEnd = !(j < arrB.length && i + j < arrA.length);

				if (isEnd || arrB[j] !== arrA[i + j]) {
					if (length > maxLength) {
						maxLength = length;
						maxOffsetMin = j - length;
						maxOffsetMax = i + j - length;

						if (length >= arrB.length) {
							break outer;
						}
					}

					length = 0;
				} else {
					length++;
				}

				if (isEnd) {
					break;
				}
			}
		}
	}

	let firstOffset;
	let secondOffset;

	if (minArr === arrA) {
		firstOffset = maxOffsetMin;
		secondOffset = maxOffsetMax;
	} else {
		firstOffset = maxOffsetMax;
		secondOffset = maxOffsetMin;
	}

	return {
		length: maxLength,
		firstOffset,
		secondOffset,
	};
}
