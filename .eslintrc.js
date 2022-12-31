module.exports = {
    root: true,
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    parser: 'vue-eslint-parser',
    parserOptions: {
        parser: {
            "ts": "@typescript-eslint/parser",
            "<template>": "espree"
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
    extends: [
        'eslint:recommended',
        'plugin:import/recommended',
        'plugin:import/typescript',
        'airbnb-base',
        'plugin:vue/vue3-essential',
        'plugin:@typescript-eslint/recommended',
        // 暂时注释，经常会报错，还没搞清楚怎么解决
        // Error while loading rule '@typescript-eslint/no-implied-eval': You have used a rule which requires parserServices to be generated. You must therefore provide a value for the "parserOptions.project" property for @typescript-eslint/parser.
        // 'plugin:@typescript-eslint/recommended-requiring-type-checking',
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
                project: ['tsconfig.json'],
            },
            // alias: {
            //     map: [
            //         ["@", "./src"],
            //         ["/static", "./public/static"],
            //     ],
            //     extensions: [".js", ".jsx", ".json", ".ts", ".tsx", ".vue"],
            // },
        },
    },
    rules: {
        indent: ['warn', 4],
        'no-console': ['warn', { allow: ['warn', 'error'] }],
        'func-names': "off",
        "no-underscore-dangle": "off",
        "no-nested-ternary": "off",
        "no-shadow": "off",
        "default-param-last": "off",
        "consistent-return": "off",
        'import/prefer-default-export': 'off',
        'import/extensions': 'off',
        'import/no-named-as-default': 'off',
        "import/no-extraneous-dependencies": ["error", {"devDependencies": true, "optionalDependencies": true, "peerDependencies": true}],
        'vue/multi-word-component-names': 'off',
        'prettier/prettier': 'error',
        "@typescript-eslint/no-floating-promises": "off",
        "@typescript-eslint/await-thenable": "off",
    },
    overrides: [],
}
