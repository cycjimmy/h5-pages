import functionToPromise from '@cycjimmy/awesome-js-funcs/esm/typeConversion/functionToPromise';

import style from './root.scss';

import { rootTemplate } from './templates';

export default new (class {
  constructor() {
    this.root = null;
    this.swiper = null;
    this.els = {};

    this._temp = document.createElement('div');
    this._Swiper = null;
    this._swiperOptions = {};
    this._containerExtraHtml = '';
    this._pages = [];

    this._initH5DefaultEvent();
    this._initRoot();
  }

  /**
   * setSwiperConstructor
   * @param Swiper
   */
  setSwiperConstructor(Swiper) {
    this._Swiper = Swiper;
    return this;
  }

  /**
   * getPages
   * @returns {[]}
   */
  getPages() {
    return this._pages;
  }

  /**
   * setPages
   * @param pages
   */
  setPages(pages) {
    this._pages = pages;
    return this;
  }

  /**
   * setSwiperOptions
   * @param swiperOptions
   */
  setSwiperOptions(swiperOptions) {
    this._swiperOptions = swiperOptions;
    return this;
  }

  /**
   * setContainerExtraHtml
   * @param containerExtraHtml
   */
  setContainerExtraHtml(containerExtraHtml) {
    this._containerExtraHtml = containerExtraHtml;
    return this;
  }

  /**
   * init
   * @returns {Promise<*>}
   */
  init() {
    return Promise.resolve()
      .then(() => this._initSwiper())
      .then(() => this.swiper.update());
  }

  /**
   * Init Root Element
   * @private
   */
  _initRoot() {
    this._temp.innerHTML = rootTemplate({ style });
    this.root = this._temp.querySelector(`.${style.root}`);
    document.body.appendChild(this.root);
  }

  /**
   * Init Swiper
   * @returns {Promise<void>}
   * @private
   */
  _initSwiper() {
    return (
      Promise.resolve()
        .then(() =>
          functionToPromise(() => {
            this.els.swiperContainer = this.root.querySelector(`.${style.swiperContainer}`);
            this.els.swiperContainer.innerHTML += this._containerExtraHtml;
            this.els.swiperWrapper = this.els.swiperContainer.querySelector(
              `.${style.swiperWrapper}`
            );
          }, 50)
        )
        // renderPages
        .then(() => Promise.all(this._pages.map((page, index) => page.init(index))))
        .then(() =>
          functionToPromise(() => {
            this.swiper = new this._Swiper(this.els.swiperContainer, this._swiperOptions);
          })
        )
        .then(() =>
          functionToPromise(() => {
            // pagesLoaded
            this._pages.forEach((page) => page.pageLoaded());
          }, 100)
        )
    );
  }

  /**
   * Init H5 Default Event
   * @private
   */
  _initH5DefaultEvent() {
    // contextMenu preventDefault
    document.addEventListener('contextmenu', (e) => e.preventDefault());

    // fix ios native scrolling
    document.body.addEventListener(
      'touchmove',
      (e) => {
        e.preventDefault();
      },
      {
        passive: false
      }
    );

    // fix ios soft keyboard
    window.addEventListener('resize', () => {
      if (
        document.activeElement.tagName !== 'INPUT' &&
        document.activeElement.tagName !== 'TEXTAREA'
      ) {
        return;
      }

      setTimeout(() => {
        if ('scrollIntoView' in document.activeElement) {
          document.activeElement.scrollIntoView(false);
        } else {
          document.activeElement.scrollIntoViewIfNeeded(false);
        }
      }, 0);
    });

    window.addEventListener('focusout', (e) => {
      const { target } = e;
      if (target.tagName !== 'INPUT' && target.tagName !== 'TEXTAREA') {
        return;
      }
      window.scrollTo(0, 0);
    });

    return this;
  }
})();
