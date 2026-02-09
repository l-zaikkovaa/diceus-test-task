module.exports = {
  plugins: ["import"],
  rules: {
    "import/order": [
      "error",
      {
        groups: [
          "builtin", // fs, path
          "external", // react, lodash
          "internal", // алиасы @/...
          "parent", // ../
          "sibling", // ./
          "index", // ./index
          "object",
          "type",
        ],
        "newlines-between": "always",
        alphabetize: {
          order: "asc",
          caseInsensitive: true,
        },
      },
    ],
  },
  settings: {
    "import/resolver": {
      typescript: {},
    },
  },
};
