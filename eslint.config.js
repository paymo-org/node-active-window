import { defineConfig } from 'eslint/config';

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

import eslintConfigPrettierFlat from 'eslint-config-prettier/flat';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import eslintPluginImportSort from 'eslint-plugin-simple-import-sort';

export default defineConfig(
	eslint.configs.recommended,
	tseslint.configs.recommended,
	eslintConfigPrettierFlat,
	eslintPluginPrettierRecommended,
	{
		plugins: {
			'simple-import-sort': eslintPluginImportSort
		},
		rules: {
			'simple-import-sort/imports': 'error'
		}
	}
);
