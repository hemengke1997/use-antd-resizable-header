// 0 = off, 1 = warn, 2 = error
module.exports = {
  extends: [require.resolve("@umijs/fabric/dist/eslint")],
  rules: {
    "symbol-description": 0,
    "@typescript-eslint/no-shadow": 0,
    "no-return-assign": 0,
    "react/jsx-uses-react": 1,
    "react/jsx-no-undef": 2,
    "react/jsx-wrap-multilines": 2,
    "react/no-string-refs": 0,
    "no-plusplus": 0
  },
};
