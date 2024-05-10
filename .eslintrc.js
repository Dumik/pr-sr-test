module.exports = {
  extends: ['custom/next'],
  parserOptions: {
    parser: '@typescript-eslint/parser',
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
  },

  ignorePatterns: ['cypress'],
};
