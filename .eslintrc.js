var options = {
	root: true,
	env: {
		node: true,
		es6: true,
	},
	parser: 'babel-eslint',
	parserOptions: {
		ecmaVersion: 2019,
		sourceType: 'module',
	},
	settings: {
		react: {
			version: require('./package.json').dependencies.react,
		},
	},
	plugins: ['react', 'react-hooks'],
	extends: [
		'eslint:recommended',
		'plugin:react/recommended',
		'plugin:react-hooks/recommended',
	],
	rules: {
		'linebreak-style': ['error', 'unix'],
		'no-mixed-spaces-and-tabs': 'off',
		'no-use-before-define': ['error', { functions: false }],
		'wrap-iife': ['error', 'inside'],
		'no-constant-condition': ['error', { checkLoops: false }],
		'no-unused-vars': ['warn', { vars: 'local' }],
		'no-restricted-syntax': ['error', 'BinaryExpression[operator="in"]'],
	},
};

var errorRules = [
	'guard-for-in',
	'no-extra-bind',
	'no-extra-label',
	'no-floating-decimal',
	'no-lone-blocks',
	'no-loop-func',
	'no-new',
	'no-new-wrappers',
	'no-octal-escape',
	'no-proto',
	'no-return-assign',
	'no-self-compare',
	'no-sequences',
	'no-unmodified-loop-condition',
	'no-unused-expressions',
	'no-useless-call',
	'no-useless-return',

	'no-label-var',
];

var warningRules = [
	'semi',
	'block-scoped-var',
	'dot-notation',
	'radix',
	'no-console',
];

errorRules.forEach(function (x) {
	options.rules[x] = 'error';
});

warningRules.forEach(function (x) {
	options.rules[x] = 'warn';
});

module.exports = options;
