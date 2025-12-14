import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'

import App from './App.vue'

describe('App', () => {
  it('should render App component properly', () => {
    const wrapper = mount(App)

    expect(wrapper.exists()).toBe(true)
  })
})
