import { functionToPromise } from '@cycjimmy/awesome-js-funcs/typeConversion'

import root from '../root/root.ins.js'

import style from './popup.module.scss'

export default class Popup {
  root: HTMLElement
  popup: HTMLDivElement

  constructor() {
    this.root = root.root!
    this.popup = document.createElement('div')
    this.popup.classList.add(style.popupWrapper)
  }

  /**
   * load: You must Overwrite this function with your own function.
   * Both a synchronous override (returns nothing) and an asynchronous one
   * (returns a promise) are supported, so the declaration allows either.
   */
  load(): void | Promise<void> {
    return Promise.resolve()
  }

  /**
   * render
   * @param htmlText
   * @returns {Promise<void>}
   */
  render(htmlText = ''): Promise<void> {
    return Promise.resolve()
      .then(() => functionToPromise(() => {
        this.popup.innerHTML = htmlText
      }))
      .then(() => functionToPromise(() => {
        this.root.appendChild(this.popup)
      }))
  }

  /**
   * remove popup
   * @returns {Promise<void>}
   */
  remove(): Promise<void> {
    return Promise.resolve().then(() => functionToPromise(() => {
      this.root.removeChild(this.popup)
    }))
  }
}
