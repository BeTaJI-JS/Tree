import js from '@eslint/js';
import globals from 'globals';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import reactRefreshPlugin from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier';
import reactPlugin from 'eslint-plugin-react';
import importPlugin from 'eslint-plugin-import';

export default tseslint.config(
  { ignores: ['dist, node_modules'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021,
      },
      parserOptions: reactPlugin.configs.recommended.parserOptions,
    },
    plugins: {
      'react-hooks': reactHooksPlugin,
      'react-refresh': reactRefreshPlugin,
      react: reactPlugin,
      import: importPlugin,
      prettier: prettier,
    },
    rules: {
      ...reactHooksPlugin.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      ...prettier.rules,
      'import/order': [
        'error',
        {
          alphabetize: {
            caseInsensitive: true,
            order: 'asc',
          },
          pathGroupsExcludedImportTypes: ['react'],
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          'newlines-between': 'always',
          pathGroups: [
            {
              group: 'external',
              pattern: 'react',
              position: 'before',
            },
            {
              group: 'internal',
              pattern: 'layouts/**',
              position: 'after',
            },
            {
              group: 'internal',
              pattern: 'contexts/**',
              position: 'after',
            },
            {
              group: 'internal',
              pattern: 'components/**',
              position: 'after',
            },
            {
              group: 'internal',
              pattern: 'fragments/**',
              position: 'after',
            },
            {
              group: 'internal',
              pattern: 'utils/**',
              position: 'after',
            },
            {
              group: 'internal',
              pattern: 'types',
              position: 'after',
            },
            {
              group: 'internal',
              pattern: 'data',
              position: 'after',
            },
            {
              group: 'internal',
              pattern: 'styles/**',
              position: 'after',
            },
          ],
        },
      ],
    },
  },
);
