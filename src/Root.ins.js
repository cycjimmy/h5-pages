import CreateInstance from '@cycjimmy/awesome-js-funcs/designPattern/CreateInstance';
import functionToPromise from '@cycjimmy/awesome-js-funcs/typeConversion/functionToPromise';

import { rootTemplate } from './templates';
import style from './theme/root.scss';

const instance = new CreateInstance();

export default class {
  constructor() {
    if (instance()) {
      return instance();
    }

    this.root = null;
    this.swiper = null;
    this.els = {};

    this._temp = document.createElement('div');
    this._Swiper = null;
    this._swiperOptions = {};
    this._containerExtraHtml = '';
    this._pages = [];

    this._initRoot();
    instance(this);
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
   * _initRoot
   * @private
   */
  _initRoot() {
    this._temp.innerHTML = rootTemplate({ style });
    this.root = this._temp.querySelector(`.${style.root}`);
    document.body.appendChild(this.root);
  }

  /**
   * _initSwiper
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
          })
        )
    );
  }
}
