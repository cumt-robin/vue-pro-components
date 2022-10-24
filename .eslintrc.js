module.exports = {
    root: true,
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'plugin:vue/vue3-essential',
        'prettier',
    ],
    plugins: ['@typescript-eslint', 'vue', 'prettier'],
    parser: 'vue-eslint-parser',
    parserOptions: {
        "parser": {
            "js": "espree",
            "ts": "@typescript-eslint/parser",
            "<template>": "espree"
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
        },
        tsconfigRootDir: __dirname,
        project: ['./tsconfig.eslint.json'],
        extraFileExtensions: ['.vue'],
    },
    rules: {
        indent: ['warn', 4],
        'vue/multi-word-component-names': ['off'],
        'prettier/prettier': 'error',
    },
    overrides: [],
}
