module.exports = {
  root: true,
  extends: ['universe/native'],
  rules: {
    'import/no-cycle': [
      'error',
      {
        maxDepth: 10,
        ignoreExternal: true,
      },
    ],
  },
};
