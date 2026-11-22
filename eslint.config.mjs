import js from '@eslint/js';
import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import prettier from 'eslint-config-prettier/flat';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import unicorn from 'eslint-plugin-unicorn';

export default defineConfig([
  js.configs.recommended,

  // React, hooks, jsx-a11y, Next.js and typescript-eslint, via Next's presets.
  ...nextVitals,
  ...nextTs,

  {
    plugins: { 'simple-import-sort': simpleImportSort, unicorn },
    rules: {
      // React / Next
      'react/jsx-curly-brace-presence': [
        'error',
        { props: 'never', children: 'never' },
      ],
      'react/self-closing-comp': ['error', { component: true, html: true }],
      'react-hooks/exhaustive-deps': 'warn',
      '@next/next/no-img-element': 'off',
      'jsx-a11y/alt-text': 'off', // next/image enforces alt
      'jsx-a11y/no-noninteractive-element-interactions': 'off',

      // Imports: react/next, packages, then @/components, @/app, @/lib, @/…, relative, css
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            ['^react(-|\\/|$)', '^next(-|\\/|$)', '^@next(-|\\/|$)'],
            ['^@?\\w'],
            ['^@/components'],
            ['^@/app'],
            ['^@/lib'],
            ['^@/'],
            ['^\\.'],
            ['^.+\\.s?css$'],
            ['^\\u0000'],
          ],
        },
      ],
      'simple-import-sort/exports': 'error',

      // Unicorn
      'unicorn/filename-case': [
        'error',
        { cases: { kebabCase: true, pascalCase: true, camelCase: true } },
      ],
      'unicorn/no-nested-ternary': 'error',
      'unicorn/consistent-destructuring': 'error',

      // Readability
      'lines-around-comment': [
        'error',
        {
          beforeBlockComment: true,
          beforeLineComment: true,
          allowBlockStart: true,
          allowObjectStart: true,
          allowArrayStart: true,
        },
      ],
      'padding-line-between-statements': [
        'error',
        { blankLine: 'any', prev: 'export', next: 'export' },
        { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
        {
          blankLine: 'any',
          prev: ['const', 'let', 'var'],
          next: ['const', 'let', 'var'],
        },
        {
          blankLine: 'always',
          prev: '*',
          next: ['function', 'multiline-const', 'multiline-block-like'],
        },
        {
          blankLine: 'always',
          prev: ['function', 'multiline-const', 'multiline-block-like'],
          next: '*',
        },
      ],
      'newline-before-return': 'error',
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'prefer-const': 'error',
      'arrow-body-style': ['error', 'as-needed'],
      'object-shorthand': ['error', 'always'],
    },
  },

  {
    files: ['**/*.{ts,tsx}'],
    rules: {
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/no-non-null-assertion': 'off',
    },
  },

  // Last, so formatting is Prettier's alone.
  prettier,

  globalIgnores([
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
    'public/**',
  ]),
]);
