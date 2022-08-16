module.exports = {
    "ignorePatterns": [".eslintrc.js"],
    'env': {
        'node': true,
        'commonjs': true,
        'es2021': true
    },
    'extends': 'eslint:recommended',
    'overrides': [
    ],
    'parserOptions': {
        'ecmaVersion': 'latest'
    },
    'rules': {
        'indent': [
            'error',
            2
        ],
        'eqeqeq': 'error',
        'no-trailing-spaces': 'error',
        'object-curly-spacing': [
            'error', 'always'
        ],
        'arrow-spacing': [
            'error', { 'before': true, 'after': true }
        ],
        'linebreak-style': [
            0
        ],
        'quotes': [
            'error',
            'single'
        ],
        'no-console': 0,
        'semi': [
            'error',
            'never'
        ]
    }
}
