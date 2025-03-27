import js from '@eslint/js';
import nextPlugin from '@next/eslint-plugin-next';
import airbnbConfig from 'eslint-config-airbnb';
import airbnbHooksConfig from 'eslint-config-airbnb/hooks';
import prettierConfig from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';

export default [
  js.configs.recommended,
  ...airbnbConfig.extends,
  ...airbnbHooksConfig.extends,
  {
    plugins: {
      '@next/next': nextPlugin,
      prettier: prettierPlugin,
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
      'react/jsx-filename-extension': [1, { extensions: ['.tsx', '.jsx'] }],
      'import/extensions': [
        'error',
        'ignorePackages',
        {
          js: 'never',
          jsx: 'never',
          ts: 'never',
          tsx: 'never',
        },
      ],
      'prettier/prettier': 'error',
    },
    settings: {
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
      },
    },
  },
  prettierConfig,
];
