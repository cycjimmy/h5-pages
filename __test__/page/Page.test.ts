import type { SwiperConstructor } from '../../src/types/swiper'

import Swiper from 'swiper'
import { describe, expect, it } from 'vitest'

import testSingletonPage from '../../__mocks__/mockSingletonPage'
import { changePageTo, init } from '../../src'
import Page from '../../src/page/Page'

// Vitest has no `done` callback, so each async flow is awaited instead.
const wait = (ms: number): Promise<void> => new Promise(resolve => setTimeout(resolve, ms))

describe('page default test', () => {
  it('empty page load test ', async () => {
    const testPage = new Page({})
    testPage.pageLoaded()
    await wait(100)
  })

  it('page default test', async () => {
    const testPage1 = new Page({})
    const testPage2 = new Page({
      name: 'p2',
      // eslint-disable-next-line no-console
      pageEnter: () => console.log('pageEnter'),
      // eslint-disable-next-line no-console
      pageLeave: () => console.log('pageLeave'),
    })

    await init({
      Swiper: Swiper as unknown as SwiperConstructor,
      pages: [testPage1, testPage2, testSingletonPage],
      swiperOptions: {
        speed: 0,
      },
    })

    expect(testPage1.name).toBe('page0')
    expect(testPage2.name).toBe('p2')
    expect(testSingletonPage.name).toBe('singletonPage')

    changePageTo('p2')
    await wait(10)
    changePageTo('singletonPage')
    await wait(1e3)
  })
})
