import eslint from "@eslint/js";
import eslintGlobals from "globals";
import tseslint from "typescript-eslint";
import prettierPlugin from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";
import { defineConfig } from "eslint/config";

const baseRules = {
  ...prettierConfig.rules,
  "no-console": "warn",
  "prettier/prettier": "warn",
};

export default defineConfig(
  eslint.configs.recommended,
  tseslint.configs.recommended,
  {
    files: [
      "*.config.js",
      "*.config.cjs",
      "*.config.mjs",
      "*rc.js",
      "*rc.cjs",
      "*rc.mjs",
    ],
    languageOptions: {
      globals: { ...eslintGlobals.node },
    },
  },
  {
    files: ["**/*.js"],
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      ...baseRules,
      "@typescript-eslint/no-require-imports": "off",
    },
  },
  {
    files: ["**/*.ts", "**/*.mts"],
    languageOptions: {
      parserOptions: {
        projectService: true,
      },
    },
    plugins: {
      "@typescript-eslint": tseslint.plugin,
      prettier: prettierPlugin,
    },
    rules: {
      ...baseRules,
      "@typescript-eslint/no-misused-promises": "warn",
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          varsIgnorePattern: "^_",
          argsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/explicit-member-accessibility": [
        "error",
        {
          accessibility: "explicit",
          overrides: {
            constructors: "no-public",
          },
        },
      ],
    },
  }
);
