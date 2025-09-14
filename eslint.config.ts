import eslintJs from '@eslint/js';
import globals from 'globals';
import pluginVue from 'eslint-plugin-vue';
import tseslint from 'typescript-eslint';
import { globalIgnores } from 'eslint/config';
import { readEslintGlobals } from './build/utils';

// 禁用与 Prettier 冲突的规则
import prettierConfig from 'eslint-config-prettier';

import fs from 'node:fs';
import { Linter } from 'eslint';

let autoImportGlobals = {};
try {
  autoImportGlobals =
    JSON.parse(fs.readFileSync('./.eslintrc-auto-import.json', 'utf-8'))
      .globals || {};
} catch (error) {
  // 文件不存在或解析错误时使用空对象
  console.warn('Could not load auto-import globals', error);
}

/**
 * @see
 *  https://medium.com/@y.abdelkaderkharoubi/the-great-eslint-v9-migration-adventure-a-developers-survival-guide-%EF%B8%8F-ade6d75a11c5
 * order important
 */
/** @type {import('eslint').Linter.Config[]} */
const eslintConfigs: Linter.Config[] = [
  globalIgnores([
    '!node_modules', //unignore `node_modules/` directory
    'node_modules/*',
    '**/.next/*',
    '**/coverage',
    '**/dist'
  ]),
  { files: ['**/*.{ts,js,mjs,cjs,vue,tsx,jsx}'] },
  // order important
  eslintJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs['flat/recommended'],

  // 全局配置
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node, // Node.js 环境全局变量
        ...autoImportGlobals,
        ...readEslintGlobals(),
        __APP_INFO__: 'readonly'
      }
    },
    settings: {
      // TODO something
    }
  },
  // VUE
  {
    files: ['**/*.{ts,vue}'],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser,
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true
        }
      }
    }
  },
  {
    // Rules overrides above
    rules: {
      // TS + JS
      '@typescript-eslint/no-this-alias': [
        'error',
        { allowedNames: ['self', 'that'] }
      ],
      '@typescript-eslint/no-unused-expressions': [
        'error',
        {
          allowShortCircuit: true,
          allowTernary: true
        }
      ],
      '@typescript-eslint/no-explicit-any': [
        'off',
        {
          fixToUnknown: false,
          ignoreRestArgs: true
        }
      ],
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          args: 'all',
          argsIgnorePattern: '^_',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true
        }
      ],
      // vue
      'vue/multi-word-component-names': [
        'error',
        {
          ignores: ['index', 'Layout', 'Index', 'defaults', 'main', 'Preview']
        }
      ],
      'vue/no-required-prop-with-default': ['off', { autofix: true }]
    }
  },

  // prettier configs at last
  prettierConfig
];

export default eslintConfigs;
