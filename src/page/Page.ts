import type { SwiperInstance } from '../types/swiper.js'

import { functionToPromise } from '@cycjimmy/awesome-js-funcs/typeConversion'

import root from '../root/root.ins.js'

import style from './page.module.scss'

export interface PageOptions {
  name?: string
  renderHtml?: string
  pageEnter?: (swiper: SwiperInstance) => void
  pageLeave?: (swiper: SwiperInstance) => void
}

export default class Page {
  name: string
  pageIndex = 0
  page: HTMLDivElement
  swiper!: SwiperInstance
  root!: HTMLElement
  private _renderHtml: string
  private _pageEnter: (swiper: SwiperInstance) => void
  private _pageLeave: (swiper: SwiperInstance) => void

  /**
   * Page
   */
  constructor({
    name = '',
    renderHtml = '',
    pageEnter = () => {},
    pageLeave = () => {},
  }: PageOptions = {}) {
    this.name = name

    this.page = document.createElement('div')
    this.page.classList.add('swiper-slide', style.page)
    this.page.dataset.hash = this.name

    this._renderHtml = renderHtml
    this._pageEnter = pageEnter
    this._pageLeave = pageLeave
  }

  /**
   * paramInit
   */
  paramInit(): void {
    this.swiper = root.swiper!
    this.root = root.root!
  }

  /**
   * eventBind
   */
  eventBind(): void {
    this._setPageCommand()
  }

  /**
   * init
   * @param pageIndex
   * @returns {Promise<void>}
   */
  init(pageIndex: number): Promise<void> {
    return this._render().then(() => functionToPromise(() => {
      this.pageIndex = pageIndex
      if (!this.name) {
        this.name = `page${this.pageIndex}`
        this.page.dataset.hash = this.name
      }
    }))
  }

  /**
   * extraRender: hook function
   */
  extraRender(): void {}

  /**
   * pageLoaded
   */
  pageLoaded(): void {
    this.paramInit()
    this.eventBind()
    this.extraRender()
  }

  /**
   * _render
   * @private
   */
  private _render(): Promise<void> {
    return functionToPromise(() => {
      this.page.innerHTML = this._renderHtml
      root.els.swiperWrapper!.appendChild(this.page)
    })
  }

  /**
   * _setPageCommand: hook function
   * @private
   */
  private _setPageCommand(): void {
    if (!root.swiper) {
      return
    }

    root.swiper.on('slideChange', () => {
      if (root.swiper!.realIndex === this.pageIndex) {
        this._pageEnter(root.swiper!)
      }
      if (root.swiper!.previousIndex === this.pageIndex) {
        const delay = root.swiper!.params.speed || 0
        setTimeout(() => this._pageLeave(root.swiper!), delay)
      }
    })
  }
}
