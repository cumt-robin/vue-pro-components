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
    },
}
