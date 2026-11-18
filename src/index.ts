import type { SwiperConstructor, SwiperInstance, SwiperOptions } from './types/swiper.js'

import { isNumber } from '@cycjimmy/awesome-js-funcs/judgeBasic'
import Page from './page/Page.js'

import Popup from './popup/Popup.js'
import root from './root/root.ins.js'

export { Page, Popup }

export interface InitOptions {
  Swiper?: SwiperConstructor
  pages?: Page[]
  swiperOptions?: SwiperOptions
  containerExtraHtml?: string
  compatibleWithSafeArea?: boolean
}

/**
 * Initialise the H5 pages: resolve the Swiper constructor, store the options
 * and render the pages.
 */
export function init({
  Swiper: SwiperConstructorInput,
  pages = [],
  swiperOptions = {},
  containerExtraHtml = '',
  compatibleWithSafeArea = true,
}: InitOptions = {}): Promise<void> {
  if (SwiperConstructorInput) {
    root.setSwiperConstructor(SwiperConstructorInput)
  }
  else if (window.Swiper) {
    root.setSwiperConstructor(window.Swiper)
  }
  else {
    throw new Error('h5Pages.Swiper does not exist')
  }

  root
    .setPages(pages)
    .setSwiperOptions(swiperOptions)
    .setContainerExtraHtml(containerExtraHtml)
    .setCompatibleWithSafeArea(compatibleWithSafeArea)

  return root.init()
}

/**
 * Get the page instance with the given name.
 */
export function getPageByName(name?: string): Page | undefined {
  return root.getPages().filter(page => page.name === name)[0]
}

/**
 * changePageTo
 * @param name
 * @param speed
 */
export function changePageTo(name?: string, speed?: number): void {
  const targetPage = getPageByName(name)

  if (!targetPage) {
    return
  }

  const aParams: [number, number?] = [targetPage.pageIndex]

  if (isNumber(speed)) {
    aParams.push(speed)
  }

  root.swiper?.slideTo(...aParams)
}

/**
 * Get the Core Properties
 */
export const h5Pages = {
  get root(): HTMLElement | null {
    return root.root
  },

  get swiper(): SwiperInstance | null {
    return root.swiper
  },
}
