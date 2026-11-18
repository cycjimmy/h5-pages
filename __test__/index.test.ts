import type { SwiperConstructor } from '../src/types/swiper'

import Swiper from 'swiper'
import { describe, expect, it } from 'vitest'

import testSingletonPage from '../__mocks__/mockSingletonPage'
import { changePageTo, getPageByName, h5Pages, init, Page } from '../src/index'

// Vitest has no `done` callback, so each async flow is awaited instead.
const wait = (ms: number): Promise<void> => new Promise(resolve => setTimeout(resolve, ms))

describe('init default test', () => {
  it('init() empty parameter will throw an error', () => {
    expect(() => {
      init()
    }).toThrow()
  })

  it('init: window.Swiper exists', () => {
    window.Swiper = Swiper as unknown as SwiperConstructor
    init()
  })

  it('init(): common parameters test', () => {
    init({
      Swiper: Swiper as unknown as SwiperConstructor,
      pages: [],
      swiperOptions: {},
      containerExtraHtml: '',
    })
  })
})

describe('page and page-related tests', () => {
  const testPageName = 'testPage'
  const testPage = new Page({
    name: testPageName,
  })

  it('testPage default test', async () => {
    await init({
      Swiper: Swiper as unknown as SwiperConstructor,
      pages: [testPage, testSingletonPage],
      compatibleWithSafeArea: false,
    })

    expect(testPage.name).toBe(testPageName)
    expect(testPage.root).toBe(h5Pages.root)
    expect(testPage.swiper).toBe(h5Pages.swiper)
    expect(getPageByName(testPageName)).toBe(testPage)

    // changePageTo: coveralls
    changePageTo()
    changePageTo(testPageName)
    changePageTo(testPageName, 0)
    changePageTo(testPageName, 200)

    await wait(500)
  })
})
