/** @type {import('eslint').ESLint.ConfigData} */
module.exports = {
  root: true,
  ignorePatterns: ["node_modules", "dist", "build", "public", ".next"],
  extends: [
    "next/core-web-vitals",
    "airbnb",
    "airbnb-typescript",
    "turbo",
    "plugin:prettier/recommended",
    "plugin:import/typescript",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
  parser: "@typescript-eslint/parser",
  plugins: [
    "@typescript-eslint",
    "unused-imports",
    "prettier",
    "simple-import-sort",
  ],
  parser: "@typescript-eslint/parser",
  rules: {
    "react/react-in-jsx-scope": "off",
    "react/jsx-props-no-spreading": "off",
    "react/jsx-filename-extension": "off",
    "react/prop-types": "off",
    "react/require-default-props": "off",
    "react/function-component-definition": [
      "error",
      {
        namedComponents: "arrow-function",
      },
    ],
    "simple-import-sort/exports": "error",
    "@next/next/no-html-link-for-pages": "off",
    semi: ["error", "always"],
    quotes: ["error", "single", { avoidEscape: true }],
    "prettier/prettier": [
      "error",
      {
        printWidth: 80,
        singleQuote: true,
        semi: true,
        trailingComma: "es5",
        tabWidth: 2,
        endOfLine: "lf",
      },
    ],
    "padding-line-between-statements": [
      "error",
      {
        blankLine: "always",
        prev: "*",
        next: [
          "multiline-const",
          "multiline-expression",
          "block",
          "function",
          "block-like",
          "return",
        ],
      },
    ],
    "no-continue": "off",
    "import/prefer-default-export": "off",
    "import/no-extraneous-dependencies": "off",
    "no-console": [
      "warn",
      {
        allow: ["info", "warn", "error"],
      },
    ],
    'consistent-return': 'off'
  },
  settings: {
    react: {
      version: "18",
    },
  },
};
