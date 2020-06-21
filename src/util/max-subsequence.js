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

	outer: for (let i = 0; i < maxArr.length; i++) {
		let j = 0;
		let length = 0;
		for (; ; j++) {
			let isEnd = !(j < minArr.length && i + j < maxArr.length);

			if (isEnd || minArr[j] !== maxArr[i + j]) {
				if (length > maxLength) {
					maxLength = length;
					maxOffsetMin = j - length;
					maxOffsetMax = i + j - length;

					if (length >= minArr.length) {
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
