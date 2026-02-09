import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import importPlugin from "eslint-plugin-import";
import prettier from "eslint-config-prettier";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  globalIgnores(["dist"]),

  {
    files: ["**/*.{ts,tsx}"],

    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,

      // ВАЖНО: этот preset уже включает plugin react-refresh внутри себя
      reactRefresh.configs.vite,

      // отключает правила, конфликтующие с prettier
      prettier,
    ],

    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        sourceType: "module",
        ecmaFeatures: { jsx: true },
      },
    },

    plugins: {
      // Подключаем только те плагины, которых НЕ подключает preset выше
      "react-hooks": reactHooks,
      import: importPlugin,
    },

    rules: {
      // React Hooks (вручную — чтобы не зависеть от legacy recommended)
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",

      // TS
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],

      // Imports
      "import/order": [
        "warn",
        {
          "newlines-between": "always",
          alphabetize: { order: "asc", caseInsensitive: true },
        },
      ],
    },
  },
]);

// import js from "@eslint/js";
// import globals from "globals";
// import reactHooks from "eslint-plugin-react-hooks";
// import reactRefresh from "eslint-plugin-react-refresh";
// import tseslint from "typescript-eslint";
// import importPlugin from "eslint-plugin-import";
// import prettier from "eslint-config-prettier";
// import { defineConfig, globalIgnores } from "eslint/config";

// export default defineConfig([
//   globalIgnores(["dist"]),

//   {
//     files: ["**/*.{ts,tsx}"],

//     extends: [
//       js.configs.recommended,
//       ...tseslint.configs.recommended,
//       reactRefresh.configs.vite,
//       prettier,
//     ],

//     languageOptions: {
//       ecmaVersion: 2020,
//       globals: globals.browser,
//       parserOptions: {
//         sourceType: "module",
//         ecmaFeatures: { jsx: true },
//       },
//     },

//     plugins: {
//       "react-hooks": reactHooks,
//       "react-refresh": reactRefresh,
//       import: importPlugin,
//     },

//     rules: {
//       // React Hooks — вручную, без legacy recommended
//       "react-hooks/rules-of-hooks": "error",
//       "react-hooks/exhaustive-deps": "warn",

//       // TypeScript
//       "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],

//       // Imports
//       "import/order": [
//         "warn",
//         {
//           "newlines-between": "always",
//           alphabetize: { order: "asc", caseInsensitive: true },
//         },
//       ],
//     },
//   },
// ]);

// import js from "@eslint/js";
// import globals from "globals";
// import react from "eslint-plugin-react";
// import reactHooks from "eslint-plugin-react-hooks";
// import reactRefresh from "eslint-plugin-react-refresh";
// import tseslint from "typescript-eslint";
// import importPlugin from "eslint-plugin-import";
// import prettier from "eslint-config-prettier";
// import { defineConfig, globalIgnores } from "eslint/config";

// export default defineConfig([
//   globalIgnores(["dist"]),
//   {
//     files: ["**/*.{ts,tsx}"],
//     extends: [
//       js.configs.recommended,
//       ...tseslint.configs.recommended,
//       // react.configs.recommended,
//       reactHooks.configs.recommended,
//       reactRefresh.configs.vite,
//       prettier,
//     ],
//     languageOptions: {
//       ecmaVersion: 2020,
//       globals: globals.browser,
//       parserOptions: {
//         sourceType: "module",
//       }, // mine
//     },
//     // mine
//     plugins: {
//       "react-hooks": reactHooks,
//       "react-refresh": reactRefresh,
//       import: importPlugin,
//     },
//     settings: {
//       react: {
//         version: "detect",
//       },
//     },
//     rules: {
//       // React
//       "react/react-in-jsx-scope": "off",

//       // TypeScript
//       "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],

//       // Imports
//       "import/order": [
//         "warn",
//         {
//           "newlines-between": "always",
//           alphabetize: { order: "asc", caseInsensitive: true },
//         },
//       ],
//     },
//   },
// ]);
