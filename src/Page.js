import functionToPromise from '@cycjimmy/awesome-js-funcs/typeConversion/functionToPromise';

import RootIns from './Root.ins';
import style from './theme/root.scss';

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
    this.page.classList.add('swiper-slide', style.slide);
    this.page.dataset.hash = this.name;

    this._renderHtml = renderHtml;
    this._pageEnter = pageEnter;
    this._pageLeave = pageLeave;
  }

  /**
   * paramInit
   */
  paramInit() {
    const { swiper, root } = new RootIns();
    this.swiper = swiper;
    this.root = root;
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
      new RootIns().els.swiperWrapper.appendChild(this.page);
    });
  }

  /**
   * _setPageCommand: hook function
   * @private
   */
  _setPageCommand() {
    if (!this.swiper) {
      return;
    }

    this.swiper.on('slideChange', () => {
      if (this.swiper.realIndex === this.pageIndex) {
        this._pageEnter(this.swiper);
      }
      if (this.swiper.previousIndex === this.pageIndex) {
        this._pageLeave(this.swiper);
      }
    });
  }
}
