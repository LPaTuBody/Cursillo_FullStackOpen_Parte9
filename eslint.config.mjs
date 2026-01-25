import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";
import tsparser from "@typescript-eslint/parser";
import tsplugin from "@typescript-eslint/eslint-plugin";

export default defineConfig([
  js.configs.recommended,
  {
    files: ["**/*.ts", "**/*.tsx"],
    extends: [
      ...tseslint.configs.recommendedTypeChecked,
    ],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    files: ["**/*.js", "**/*.jsx", "**/*.mjs", "**/*.cjs"],
    extends: [tseslint.configs.disableTypeChecked],
  },
  {
    files: ["**/*.{ts,tsx,js,jsx,mjs}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      "@typescript-eslint": tsplugin
    },
    rules: {
      "semi": ["error", "always"],
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/restrict-template-expressions": "off",
      "@typescript-eslint/restrict-plus-operands": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_" },
      ],
      "no-case-declarations": "off",
    },
  },
  {
    ignores: ["node_modules"],
  },
]);
