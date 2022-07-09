module.exports = {
  env: {
    browser: false,
    es2021: true,
  },
  ignorePatterns: ["dist/**"],
  extends: ["prettier"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["@typescript-eslint"],
  rules: {
    "max-len": 1,

    "max-len": ["error", { code: 180 }],
  },
};
