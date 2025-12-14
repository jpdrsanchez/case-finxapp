import { globalIgnores } from 'eslint/config'
import js from '@eslint/js'
import globals from 'globals'
import pluginVue from 'eslint-plugin-vue'
import pluginVitest from '@vitest/eslint-plugin'
import {
  defineConfigWithVueTs,
  vueTsConfigs
} from '@vue/eslint-config-typescript'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'

export default defineConfigWithVueTs(
  {
    name: 'app/files-to-lint',
    files: ['**/*.{ts,mts,tsx,vue}']
  },
  globalIgnores([
    '**/dist/**',
    '**/dist-ssr/**',
    '**/coverage/**',
    'junit.xml',
    '**/node_modules/**',
    '!.storybook',
    '**/mockServiceWorker.js'
  ]),

  js.configs.recommended,
  pluginVue.configs['flat/recommended'],
  vueTsConfigs.recommendedTypeChecked,

  {
    ...pluginVitest.configs.recommended,
    files: ['src/**', 'test/**']
  },

  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: globals.browser
    }
  },

  skipFormatting
)
