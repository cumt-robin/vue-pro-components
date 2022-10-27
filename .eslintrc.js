module.exports = {
    root: true,
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:import/recommended',
        'plugin:import/typescript',
        'airbnb-base',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'plugin:vue/vue3-essential',
        'prettier',
    ],
    plugins: ['import', '@typescript-eslint', 'vue', 'prettier'],
    settings: {
        'import/extensions': ['.js', '.jsx', '.ts', '.tsx', '.vue', '.json'],
        'import/parsers': {
            '@typescript-eslint/parser': ['.ts', '.tsx'],
        },
        'import/resolver': {
            typescript: {
                alwaysTryTypes: true, // always try to resolve types under `<root>@types` directory even it doesn't contain any source code, like `@types/unist`
                // Multiple tsconfigs (Useful for monorepos)
                // use an array of glob patterns
                project: ['tsconfig.json', 'packages/*/tsconfig.json'],
            },
        },
    },
    parser: 'vue-eslint-parser',
    parserOptions: {
        parser: {
            js: 'espree',
            ts: '@typescript-eslint/parser',
            '<template>': 'espree',
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
        },
        tsconfigRootDir: __dirname,
        project: ['./tsconfig.json'],
        extraFileExtensions: ['.vue'],
    },
    rules: {
        indent: ['warn', 4],
        'no-console': ['warn', { allow: ['warn', 'error'] }],
        'import/prefer-default-export': ['off'],
        'import/extensions': ['warn', 'never'],
        'vue/multi-word-component-names': ['off'],
        'prettier/prettier': 'error',
    },
    overrides: [],
}
