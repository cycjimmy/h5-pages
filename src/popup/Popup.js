import functionToPromise from '@cycjimmy/awesome-js-funcs/esm/typeConversion/functionToPromise';

import root from '../root/root.ins';

import style from './popup.scss';

export default class {
  constructor() {
    this.root = root.root;
    this.popup = document.createElement('div');
    this.popup.classList.add(style.popupWrapper);
  }

  /**
   * load: You must Overwrite this function with your own function
   * @returns {Promise<void>}
   */
  // eslint-disable-next-line class-methods-use-this
  load() {
    return Promise.resolve();
  }

  /**
   * render
   * @param htmlText
   * @returns {Promise<void>}
   */
  render(htmlText = '') {
    return Promise.resolve()
      .then(() => functionToPromise(() => {
        this.popup.innerHTML = htmlText;
      }))
      .then(() => functionToPromise(() => {
        this.root.appendChild(this.popup);
      }));
  }

  /**
   * remove popup
   * @returns {Promise<void>}
   */
  remove() {
    return Promise.resolve().then(() => functionToPromise(() => {
      this.root.removeChild(this.popup);
    }));
  }
}
