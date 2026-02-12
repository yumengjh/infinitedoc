// eslint.config.mjs
import eslint from "@eslint/js";
import { defineConfig } from "eslint/config";

import prettierConfig from "eslint-config-prettier";
import globals from "globals";

import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";

import vue from "eslint-plugin-vue";
import vueParser from "vue-eslint-parser";

import tseslint from "typescript-eslint";

const ENTERPRISE_IGNORES = [
  ".nuxt/**",
  ".output/**",
  ".nitro/**",
  ".cache/**",
  "**/node_modules/**",
  "**/dist/**",
  "**/.nuxt/**",
  "**/.output/**",
  "**/.nitro/**",
  "**/.cache/**",
  "**/coverage/**",
  "**/.turbo/**",
  "**/public/build/**",
  "**/performance-test/**",
  "pnpm-lock.yaml",
];

export default defineConfig(
  // Global ignores
  {
    ignores: ENTERPRISE_IGNORES,
  },

  // Linter options
  {
    name: "infinitedoc/enterprise/linter-options",
    linterOptions: {
      reportUnusedDisableDirectives: "warn",
    },
  },

  // Base recommended configs
  eslint.configs.recommended,
  ...tseslint.configs.recommended,

  // Base rules & globals for all source files
  {
    name: "infinitedoc/enterprise/base",
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx,vue}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      "no-alert": "error",
      "no-debugger": "error",
      "no-undef": "off",
      "no-var": "error",
      "prefer-const": "error",
      eqeqeq: ["error", "always", { null: "ignore" }],
      curly: ["error", "all"],
      "object-shorthand": ["error", "always"],

      "no-duplicate-imports": "off",

      // Use TS version
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],

      "@typescript-eslint/consistent-type-imports": [
        "warn",
        {
          prefer: "type-imports",
          fixStyle: "inline-type-imports",
        },
      ],

      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-empty-object-type": "off",
    },
  },

  // React hooks
  {
    name: "infinitedoc/enterprise/studio/react-hooks",
    files: ["**/*.{tsx,jsx}"],
    ...reactHooks.configs.flat.recommended,
  },

  // React refresh (Vite)
  {
    name: "infinitedoc/enterprise/studio/react-refresh",
    files: ["**/*.{tsx,jsx}"],
    ...reactRefresh.configs.vite,
  },

  // React tuning overrides
  {
    name: "infinitedoc/enterprise/studio/react-tuning",
    files: ["**/*.{tsx,jsx}"],
    rules: {
      "react-hooks/set-state-in-effect": "off",
      "react-refresh/only-export-components": "off",
    },
  },

  // Vue recommended
  ...vue.configs["flat/recommended"],

  // Vue + TypeScript parsing
  {
    name: "infinitedoc/enterprise/publish/vue-typescript",
    files: ["**/*.vue"],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tseslint.parser,
        extraFileExtensions: [".vue"],
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
    rules: {
      "vue/no-v-html": "off",
      "vue/multi-word-component-names": "off",
    },
  },

  // Definition files
  {
    name: "infinitedoc/enterprise/definition-files",
    files: ["**/*.d.ts"],
    rules: {
      "@typescript-eslint/no-unused-vars": "off",
    },
  },

  // Turn off formatting rules that conflict with Prettier
  prettierConfig,
);
