module.exports = {
    extends: [
        'stylelint-config-standard',
        'stylelint-config-standard-scss',
        'stylelint-config-standard-vue/scss',
        'stylelint-config-prettier',
    ],
    plugins: ['stylelint-prettier'],
    rules: {
        'prettier/prettier': true,
        indentation: 4,
        'max-empty-lines': 1,
        "at-rule-no-unknown": null,
        "scss/at-rule-no-unknown": null
    },
    "overrides": [
        {
          "files": ["**/*.less"],
          "customSyntax": "postcss-syntax"
        },
    ],
    // 对 less 变量插值支持不友好，先忽略，并且把变量都集中放在 vars.less，避免添加太多 ignore
    "ignoreFiles": ["packages/vue-pro-components/src/styles/vars.less"]
}
