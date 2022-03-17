import functionToPromise from '@cycjimmy/awesome-js-funcs/esm/typeConversion/functionToPromise';

import root from '../root/root.ins';

import style from './page.scss';

export default class {
  /**
   * Page
   * @param name
   * @param renderHtml
   * @param pageEnter
   * @param pageLeave
   */
  constructor({ name = '', renderHtml = '', pageEnter = () => {}, pageLeave = () => {} }) {
    this.name = name;
    this.pageIndex = 0;

    this.page = document.createElement('div');
    this.page.classList.add('swiper-slide', style.page);
    this.page.dataset.hash = this.name;

    this._renderHtml = renderHtml;
    this._pageEnter = pageEnter;
    this._pageLeave = pageLeave;
  }

  /**
   * paramInit
   */
  paramInit() {
    this.swiper = root.swiper;
    this.root = root.root;
  }

  /**
   * eventBind
   */
  eventBind() {
    this._setPageCommand();
  }

  /**
   * init
   * @param pageIndex
   * @returns {Q.Promise<any> | Promise<void> | PromiseLike<any>}
   */
  init(pageIndex) {
    return this._render().then(() =>
      functionToPromise(() => {
        this.pageIndex = pageIndex;
        if (!this.name) {
          this.name = `page${this.pageIndex}`;
          this.page.dataset.hash = this.name;
        }
      })
    );
  }

  // eslint-disable-next-line class-methods-use-this
  extraRender() {}

  /**
   * pageLoaded
   */
  pageLoaded() {
    this.paramInit();
    this.eventBind();
    this.extraRender();
  }

  /**
   * _render
   * @private
   */
  _render() {
    return functionToPromise(() => {
      this.page.innerHTML = this._renderHtml;
      root.els.swiperWrapper.appendChild(this.page);
    });
  }

  /**
   * _setPageCommand: hook function
   * @private
   */
  _setPageCommand() {
    if (!root.swiper) {
      return;
    }

    root.swiper.on('slideChange', () => {
      if (root.swiper.realIndex === this.pageIndex) {
        this._pageEnter(root.swiper);
      }
      if (root.swiper.previousIndex === this.pageIndex) {
        const delay = root.swiper.params.speed || 0;
        setTimeout(() => this._pageLeave(root.swiper), delay);
      }
    });
  }
}
