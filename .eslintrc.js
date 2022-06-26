module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  parserOptions: {
    parser: '@babel/eslint-parser',
  },
  rules: {
    'max-len': 'off',
    'no-param-reassign': 'off',
    'vuejs-accessibility/click-events-have-key-events': 'off',
    'vue/no-side-effects-in-computed-properties': 'off',
    'vue/no-mutating-props': 'off',
    'no-prototype-builtins': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vue/multi-word-component-names': ['error', {
      ignores: ['default'],
    }],
    'vuejs-accessibility/form-control-has-label': ['error', {
      ignores: ['default'],
    }],
    'vuejs-accessibility/label-has-for': ['error', {
      ignores: ['default'],
    }],
    'prefer-default-export': 'off',
    'import/prefer-default-export': 'off',
  },
};
