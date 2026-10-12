import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [js.configs.recommended, reactHooks.configs.flat.recommended, reactRefresh.configs.vite],
    languageOptions: {
      ecmaVersion: 2022,
      globals: globals.browser,
      parserOptions: { ecmaVersion: 'latest', ecmaFeatures: { jsx: true }, sourceType: 'module' },
    },
    rules: { 'react-hooks/refs': 'off', 'react-hooks/set-state-in-effect': 'off', 'react-hooks/immutability': 'off', 'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }] },
  },
  { files: ['src/components/ui/*.jsx'], rules: { 'react-refresh/only-export-components': 'off' } },
  { files: ['vite.config.js'], languageOptions: { globals: globals.node } },
])
