import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

export { resolveRootPath };

const __dirname = dirname(fileURLToPath(import.meta.url));

function resolveRootPath(...args) {
	return resolve(__dirname, ...args);
}
