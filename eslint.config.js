import js from '@eslint/js';
import globals from 'globals';

export default [
  { ignores: ['dist'] },
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: globals.browser,
    },
    rules: {
      'no-unused-vars': 'warn',
      'prefer-const': 'error',
    },
  },
  {
    // 画像撮影・最適化などの Node.js スクリプト
    files: ['scripts/**/*.mjs'],
    languageOptions: { globals: globals.node },
  },
];
