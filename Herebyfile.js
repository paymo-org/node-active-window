import { task } from 'hereby';

import { execa } from 'execa';
import fs from 'node:fs/promises';
import path from 'node:path';

const rmRf = dir =>
	fs.rm(path.join(import.meta.dirname, dir), {
		recursive: true,
		force: true
	});

export const cleanGyp = task({
	name: 'clean:gyp',
	run: async () => {
		await execa({ preferLocal: true })`node-gyp clean`;
	}
});

export const cleanTs = task({
	name: 'clean:ts',
	run: async () => {
		await rmRf('dist');
	}
});

export const cleanPrebuilds = task({
	name: 'clean:prebuilds',
	run: async () => {
		await rmRf('prebuilds');
	}
});

export const clean = task({
	name: 'clean',
	dependencies: [cleanGyp, cleanTs, cleanPrebuilds]
});

export const buildGyp = task({
	name: 'build:gyp',
	dependencies: [cleanGyp],
	run: async () => {
		await execa({ preferLocal: true })`node-gyp configure`;
		await execa({ preferLocal: true })`node-gyp build`;
	}
});

export const buildTs = task({
	name: 'build:ts',
	dependencies: [cleanTs],
	run: async () => {
		await execa({ preferLocal: true })`tsdown`;
	}
});

export const build = task({
	name: 'build',
	dependencies: [buildGyp, buildTs]
});

export const bundle = task({
	name: 'prebuildify',
	dependencies: [cleanPrebuilds],
	run: async () => {
		await execa({ preferLocal: true })`prebuildify --napi --strip`;
	}
});
