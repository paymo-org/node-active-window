import { createRequire } from 'node:module';
import path from 'node:path';

import { Addon } from './types.js';

const SUPPORTED_PLATFORMS = ['win32', 'linux', 'darwin'];
let addon: Addon | null = null;

if (SUPPORTED_PLATFORMS.includes(process.platform)) {
	const require = createRequire(import.meta.url);
	const load = require('node-gyp-build') as (dir: string) => Addon;
	addon = load(path.join(import.meta.dirname, '..'));
}

export default addon;
