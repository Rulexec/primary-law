/* eslint-env mocha */

import assert from 'assert';
import { findMaxSubsequence } from './max-subsequence.mjs';

describe('findMaxSubsequence', () => {
	it('should find max subsequence on equal arrays', () => {
		let result = findMaxSubsequence([1], [1]);

		assert.deepStrictEqual(result, {
			length: 1,
			firstOffset: 0,
			secondOffset: 0,
		});
	});

	it('should find max subsequence 1', () => {
		let result = findMaxSubsequence(
			['непосредственно', 'и', 'через'],
			['непосредственно,', 'через', 'представительные', 'и'],
		);

		assert.deepStrictEqual(result, {
			length: 1,
			firstOffset: 1,
			secondOffset: 3,
		});
	});

	it('should find max subsequence 2', () => {
		let result = findMaxSubsequence(
			['Государство,', 'все', 'законов.'],
			['права.', 'Государство,', 'все', 'законодательства.'],
		);

		assert.deepStrictEqual(result, {
			length: 2,
			firstOffset: 0,
			secondOffset: 1,
		});
	});

	it('should find max subsequence 3', () => {
		let result = findMaxSubsequence(
			['a', 's', 'Президентом', 'может', 'быть', 'd', 'f'],
			['Президентом', 'может', 'быть', 'q', 'w', 'e', 'r', 't', 'y'],
		);

		assert.deepStrictEqual(result, {
			length: 3,
			firstOffset: 2,
			secondOffset: 0,
		});
	});
});
