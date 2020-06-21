/* eslint-env mocha */

import assert from 'assert';
import { findMaxSubsequence } from './max-subsequence.js';

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
			[
				'Государство,',
				'все',
				'законов.',
			],
			[
				'права.',
				'Государство,',
				'все',
				'законодательства.',
			],
		);

		assert.deepStrictEqual(result, {
			length: 2,
			firstOffset: 0,
			secondOffset: 1,
		});
	});
});
