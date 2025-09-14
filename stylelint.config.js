/** @type {import("stylelint").Config} */
export default {
  extends: [
    'stylelint-config-html/vue', //  配置 vue 中 template 样式格式化
    'stylelint-config-recommended-scss',
    'stylelint-config-recommended-vue/scss' // 配置 vue 中 scss 样式格式化
  ],
  ignoreFiles: [
    '**/*.ts',
    '**/*.tsx',
    '**/*.json',
    '**/*.md',
    '**/*.js',
    'dist/*',
    'public/*'
  ],
  rules: {
    'keyframes-name-pattern': null,
    'function-url-quotes': 'always', // URL 的引号 "always(必须加上引号)"|"never(没有引号)"
    'property-no-unknown': null, // 禁止未知的属性
    'no-empty-source': null,
    'font-family-no-missing-generic-family-keyword': null,
    'scss/at-extend-no-missing-placeholder': null,
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global', 'export', 'v-deep', 'deep']
      }
    ]
  }
};
