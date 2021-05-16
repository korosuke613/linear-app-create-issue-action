module.exports = {
  extends: [
    "plugin:github/recommended",
    "@cybozu/eslint-config/presets/node",
    "@cybozu/eslint-config/presets/typescript",
    "prettier",
    "prettier/@typescript-eslint",
  ],
  plugins: ["jest"],
  env: {
    node: true,
    es6: true,
    "jest/globals": true,
  },
  parserOptions: {
    ecmaVersion: 9,
    sourceType: "module",
    project: "./tsconfig.eslint.json",
  },
  rules: {
    "node/no-unsupported-features/es-syntax": "off",
  },
};
