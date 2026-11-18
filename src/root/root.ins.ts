import type Page from '../page/Page.js'
import type { SwiperConstructor, SwiperInstance, SwiperOptions } from '../types/swiper.js'

import { functionToPromise } from '@cycjimmy/awesome-js-funcs/typeConversion'

import style from './root.module.scss'

import { rootTemplate } from './templates.js'

interface RootElements {
  swiperContainer?: HTMLElement
  swiperWrapper?: HTMLElement
}

class Root {
  root!: HTMLElement
  swiper: SwiperInstance | null = null
  els: RootElements = {}

  private _temp: HTMLDivElement
  private _Swiper: SwiperConstructor | null = null
  private _swiperOptions: SwiperOptions = {}
  private _containerExtraHtml = ''
  private _pages: Page[] = []

  constructor() {
    this._temp = document.createElement('div')

    this._fixWechatFont()
    this._initH5DefaultEvent()
    this._initRoot()
  }

  /**
   * setSwiperConstructor
   * @param Swiper
   */
  setSwiperConstructor(Swiper: SwiperConstructor): this {
    this._Swiper = Swiper
    return this
  }

  /**
   * getPages
   */
  getPages(): Page[] {
    return this._pages
  }

  /**
   * setPages
   * @param pages
   */
  setPages(pages: Page[]): this {
    this._pages = pages
    return this
  }

  /**
   * setSwiperOptions
   * @param swiperOptions
   */
  setSwiperOptions(swiperOptions: SwiperOptions): this {
    this._swiperOptions = swiperOptions
    return this
  }

  /**
   * setContainerExtraHtml
   * @param containerExtraHtml
   */
  setContainerExtraHtml(containerExtraHtml: string): this {
    this._containerExtraHtml = containerExtraHtml
    return this
  }

  /**
   * setCompatibleWithSafeArea
   * @param compatibleWithSafeArea
   */
  setCompatibleWithSafeArea(compatibleWithSafeArea: boolean): this {
    if (!compatibleWithSafeArea) {
      return this
    }

    document.body.classList.add(style.compatibleWithSafeArea)
    return this
  }

  /**
   * init
   * @returns {Promise<void>}
   */
  init(): Promise<void> {
    return Promise.resolve()
      .then(() => this._initSwiper())
      .then(() => this.swiper!.update())
  }

  /**
   * Init Root Element
   * @private
   */
  private _initRoot(): void {
    this._temp.innerHTML = rootTemplate({ style })
    this.root = this._temp.querySelector(`.${style.root}`) as HTMLElement
    document.body.appendChild(this.root)
  }

  /**
   * Init Swiper
   * @returns {Promise<void>}
   * @private
   */
  private _initSwiper(): Promise<void> {
    return (
      Promise.resolve()
        .then(() => functionToPromise(() => {
          const swiperContainer = this.root.querySelector<HTMLElement>(`.${style.swiperContainer}`)!
          swiperContainer.innerHTML += this._containerExtraHtml

          this.els.swiperContainer = swiperContainer
          this.els.swiperWrapper = swiperContainer.querySelector<HTMLElement>(
            `.${style.swiperWrapper}`,
          )!
        }, 50))
        // renderPages
        .then(() => Promise.all(this._pages.map((page, index) => page.init(index))))
        .then(() => functionToPromise(() => {
          this.swiper = new this._Swiper!(this.els.swiperContainer!, this._swiperOptions)
        }))
        .then(() => functionToPromise(() => {
          // pagesLoaded
          this._pages.forEach(page => page.pageLoaded())
        }, 100))
    )
  }

  /**
   * Init H5 Default Event
   * @private
   */
  private _initH5DefaultEvent(): this {
    // contextMenu preventDefault
    document.addEventListener('contextmenu', e => e.preventDefault())

    // fix ios native scrolling
    document.body.addEventListener(
      'touchmove',
      (e) => {
        e.preventDefault()
      },
      {
        passive: false,
      },
    )

    // fix ios soft keyboard
    window.addEventListener('resize', () => {
      const activeElement = document.activeElement as HTMLElement | null
      if (
        !activeElement
        || (activeElement.tagName !== 'INPUT' && activeElement.tagName !== 'TEXTAREA')
      ) {
        return
      }

      setTimeout(() => {
        const element = document.activeElement as HTMLElement | null
        if (!element) {
          return
        }

        if (typeof (element as { scrollIntoView?: unknown }).scrollIntoView === 'function') {
          element.scrollIntoView(false)
        }
        else {
          (element as { scrollIntoViewIfNeeded?: (center?: boolean) => void })
            .scrollIntoViewIfNeeded?.(false)
        }
      }, 0)
    })

    window.addEventListener('focusout', (e) => {
      const target = e.target as HTMLElement | null
      if (!target || (target.tagName !== 'INPUT' && target.tagName !== 'TEXTAREA')) {
        return
      }
      window.scrollTo(0, 0)
    })

    return this
  }

  /**
   * Fix Wechat Font
   * @private
   */
  private _fixWechatFont(): void {
    const handleFontSize = (): void => {
      WeixinJSBridge.invoke('setFontSizeCallback', { fontSize: 0 })
      WeixinJSBridge.on('menu:setfont', () => {
        WeixinJSBridge.invoke('setFontSizeCallback', { fontSize: 0 })
      })
    }

    if (
      typeof WeixinJSBridge === 'object' && typeof WeixinJSBridge.invoke === 'function'
    ) {
      handleFontSize()
    }
    else if (document.addEventListener) {
      document.addEventListener('WeixinJSBridgeReady', handleFontSize, false)
    }
  }
}

export default new Root()
