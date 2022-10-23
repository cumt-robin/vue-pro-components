module.exports = {
    root: true,
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    extends: ['standard-with-typescript', 'plugin:@typescript-eslint/recommended', 'plugin:vue/vue3-essential', 'prettier'],
    plugins: ['@typescript-eslint', 'vue', 'prettier'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
        },
        tsconfigRootDir: __dirname,
        project: ['./tsconfig.json'],
    },
    rules: {
        indent: ['warn', 4],
        'vue/multi-word-component-names': ['off'],
        'prettier/prettier': 'error',
    },
    overrides: [],
}
