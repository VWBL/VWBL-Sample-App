// // eslint.config.mjs
// import { defineFlatConfig } from 'eslint-define-config';
// import tsParser from '@typescript-eslint/parser';
// import tsPlugin from '@typescript-eslint/eslint-plugin';
// import nextPlugin from '@next/eslint-plugin-next';
// import js from '@eslint/js';

// export default defineFlatConfig([
//   // js recommended rules
//   js.configs.recommended,

//   // TypeScript rules
//   {
//     files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
//     languageOptions: {
//       parser: tsParser,
//       parserOptions: {
//         sourceType: 'module',
//         project: './tsconfig.json',
//         tsconfigRootDir: './',
//       },
//     },
//     plugins: {
//       '@typescript-eslint': tsPlugin,
//     },
//     rules: {
//       ...tsPlugin.configs['recommended'].rules,
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
//       ...nextPlugin.configs['core-web-vitals'].rules,
//       '@next/next/no-img-element': 'off',
//     },
//   },
// ]);

// eslint.config.mjs
import { defineFlatConfig } from 'eslint-define-config';
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import nextPlugin from '@next/eslint-plugin-next';
import js from '@eslint/js';

const deepClone = (obj) => JSON.parse(JSON.stringify(obj));

export default defineFlatConfig([
  // js recommended rules
  js.configs.recommended,

  // TypeScript rules
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        sourceType: 'module',
        project: './tsconfig.json',
        tsconfigRootDir: './',
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
    },
    rules: {
      ...deepClone(tsPlugin.configs['recommended'].rules),
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },

  // Next.js rules
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    plugins: {
      '@next/next': nextPlugin,
    },
    rules: {
      ...deepClone(nextPlugin.configs['core-web-vitals'].rules),
      '@next/next/no-img-element': 'off',
    },
  },
]);
