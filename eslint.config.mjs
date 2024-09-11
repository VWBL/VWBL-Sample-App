// // eslint.config.mjs
// import { FlatCompat } from '@eslint/eslintrc';
// import nextPlugin from '@next/eslint-plugin-next';
// import typeScriptESLint from '@typescript-eslint/eslint-plugin';
// import typeScriptESLintParser from '@typescript-eslint/parser';

// const compat = new FlatCompat();

// export default [
//   // js recommended rules
//   // js.configs.recommended,

//   // TypeScript rules
//   {
//     files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
//     languageOptions: {
//       parser: typeScriptESLintParser,
//       parserOptions: {
//         sourceType: 'module',
//         project: './tsconfig.json',
//         // tsconfigRootDir: './',
//         tsconfigRootDir: process.cwd(),
//       },
//     },
//     plugins: {
//       '@typescript-eslint': typeScriptESLint, // プラグインのキー名を正しく修正
//       '@typescript-eslint': typeScriptESLint,
//     },
//     rules: {
//       '@typescript-eslint/no-explicit-any': 'warn',
//     },
//   },

//   // Next.js rules
//   {
//     files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
//     plugins: {
//       '@next/next': nextPlugin,
//     },
//     rules: {
//       '@next/next/no-img-element': 'off',
//     },
//   },
//   {
//     ignores: ['.next/**/*', 'next.config.js', 'fonts.js', 'theme.js', '.yarn/**/*'],
//   },
//   ...compat.extends('plugin:@typescript-eslint/eslint-recommended'),
// ];
// eslint.config.mjs
import tseslint from '@typescript-eslint/eslint-plugin';
import tseslintParser from '@typescript-eslint/parser';
import nextPlugin from '@next/eslint-plugin-next';

export default [
  {
    files: ['**/*.ts', '**/*.tsx'],
    plugins: {
      '@typescript-eslint': tseslint,
      '@next/next': nextPlugin,
    },
    languageOptions: {
      parser: tseslintParser,
      parserOptions: {
        sourceType: 'module',
        project: './tsconfig.json',
        tsconfigRootDir: './',
      },
    },
    rules: {
      '@next/next/no-img-element': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
  {
    ignores: ['.next/**/*', 'next.config.js', 'fonts.js', 'theme.js', '.yarn/**/*'],
  },
];
