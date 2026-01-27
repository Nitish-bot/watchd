// eslint.config.mjs
import js from "@eslint/js"
import globals from "globals"
import tseslint from "typescript-eslint"
import react from "eslint-plugin-react"
import reactHooks from "eslint-plugin-react-hooks"
import jsxA11y from "eslint-plugin-jsx-a11y"
import tailwind from "eslint-plugin-tailwindcss"
import prettier from "eslint-config-prettier"

export default [
  prettier,
  js.configs.recommended,
  // TS
  ...tseslint.configs.recommended,
  // React
  {
    files: ["**/*.{ts,tsx}"],
    plugins: {
      react,
      "react-hooks": reactHooks
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      },
      globals: {
        ...globals.browser,
        ...globals.es2023
      }
    },
    settings: {
      react: {
        version: "detect"
      }
    },
    rules: {
      // React 17+
      "react/react-in-jsx-scope": "off",

      // Hooks
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn"
    }
  },
  // Accesibility
  {
    plugins: {
      "jsx-a11y": jsxA11y
    },
    rules: {
      ...jsxA11y.configs.recommended.rules
    }
  },
  // Tailwindcss
  {
    plugins: {
      tailwindcss: tailwind
    },
    rules: {
      ...tailwind.configs.recommended.rules,

      // Extensions often use dynamic class strings
      "tailwindcss/no-custom-classname": "off",

      // Allows cn(), clsx(), twMerge()
      "tailwindcss/classnames-order": "warn"
    }
  },
  // Background worker
  {
    files: ["src/background/**/*.{ts,tsx}"],
    languageOptions: {
      globals: {
        ...globals.serviceworker
      }
    }
  },
  {
    ignores: [
      "dist/**",
      "node_modules/**",
      ".wxt/**",
      ".output/**"
    ]
  }
]
