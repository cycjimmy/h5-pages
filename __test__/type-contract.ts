// Compile-time contract checks for shapes consumers depend on. This file is
// type-checked by `npm run type-check` but never executed by Vitest; it fails
// the build if the published declarations stop accepting a documented usage.
import type { SwiperOptions as SwiperLibraryOptions } from 'swiper/types'

import { init, Page, Popup } from '../src/index'

// `init()` forwards the options untouched, so swiper's own interface must be
// accepted as-is (no index signature, no cast).
const swiperOptions: SwiperLibraryOptions = { direction: 'vertical' }
init({ swiperOptions })

// `load()` is documented as a hook that may be overridden synchronously.
export class SyncPopup extends Popup {
  override load(): void {
    this.render('<div class="popup"></div>')
  }
}

// ... and asynchronously, which is what the base class does.
export class AsyncPopup extends Popup {
  override load(): Promise<void> {
    return this.render('<div class="popup"></div>')
  }
}

// `Page` is meant to be extended, and its hooks return nothing.
export class CustomPage extends Page {
  override paramInit(): void {
    super.paramInit()
    this.page.dataset.id = this.name
  }

  override eventBind(): void {
    super.eventBind()
    this.page.addEventListener('click', () => changeToNext())
  }

  override extraRender(): void {}
}

export const page = new CustomPage({ name: 'p1', renderHtml: '<div></div>' })

function changeToNext(): void {
  page.swiper.slideTo(1)
}
