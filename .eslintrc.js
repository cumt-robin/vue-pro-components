module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: ['plugin:vue/vue3-essential', 'standard-with-typescript', 'prettier'],
    overrides: [],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: ['vue', 'prettier'],
    rules: {
        indent: ['warn', 4],
        'vue/multi-word-component-names': ['off'],
        'prettier/prettier': 'error',
    },
}
