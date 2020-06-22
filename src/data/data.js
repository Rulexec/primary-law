import fs from 'fs';
import { resolveRootPath } from '../../root-path.js';

export { getData };

const preamble = readTextFileSync(resolveRootPath('data/preamble.txt'));
const parts_1_2_1994 = readTextFileSync(resolveRootPath('data/1-2-1994.txt'));
const parts_1_2_2004 = readTextFileSync(resolveRootPath('data/1-2-2004.txt'));
const parts_5_6_1994 = readTextFileSync(resolveRootPath('data/5-6-1994.txt'));
const parts_5_6_2004 = readTextFileSync(resolveRootPath('data/5-6-2004.txt'));
const parts_7_8_1994 = readTextFileSync(resolveRootPath('data/7-8-1994.txt'));
const parts_7_8_2004 = readTextFileSync(resolveRootPath('data/7-8-2004.txt'));

function getData() {
	return {
		preamble,
		parts_1_2_1994,
		parts_1_2_2004,
		parts_5_6_1994,
		parts_5_6_2004,
		parts_7_8_1994,
		parts_7_8_2004,
	};
}

function readTextFileSync(path) {
	return fs.readFileSync(path, { encoding: 'utf8' });
}