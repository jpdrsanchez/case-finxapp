import { beforeEach, vi } from 'vitest'
import { config } from '@vue/test-utils'
import { useRoute, useRouter } from 'vue-router'

vi.mock('vue-router', () => ({
  useRoute: vi.fn(),
  useRouter: vi.fn(() => ({
    push: () => {}
  }))
}))

beforeEach(() => {
  config.global.mocks = {
    $route: useRoute,
    $router: useRouter
  }

  config.global.stubs = {
    RouterView: {
      template: `<div><slot /></div>`
    },
    RouterLink: {
      template: `<a><slot /></a>`
    }
  }
})
