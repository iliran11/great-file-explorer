module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
    node: true
  },
  extends: 'airbnb-base',
  globals: {
    __static: true
  },
  plugins: [
    'html'
  ],
  'rules': {
    'global-require': 0,
    'import/no-unresolved': 0,
    'no-param-reassign': 0,
    'no-shadow': 0,
    'import/extensions': 0,
    'import/newline-after-import': 0,
    'no-multi-assign': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    "import/no-extraneous-dependencies": ["error", { "devDependencies": false, "optionalDependencies": false, "peerDependencies": false }],
    "comma-dangle": 0,
    "import/no-extraneous-dependencies": ["error", { "devDependencies": true, "optionalDependencies": false, "peerDependencies": false }],
    "no-console": 0,
    "semi": 0,
    "linebreak-style": 0,
    "indent": 0,
    "arrow-body-style": 0
  }
}