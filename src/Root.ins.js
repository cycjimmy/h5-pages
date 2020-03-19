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

    this._temp = document.createElement('div');
    this.root = null;
    this.Swiper = null;
    this.swiper = null;
    this.pages = [];
    this.els = {};

    this.swiperOptions = {};
    this.containerExtraHtml = '';

    instance(this);
  }

  init() {
    return Promise.resolve()
      .then(() =>
        functionToPromise(() => {
          this._temp.innerHTML = rootTemplate({ style });
          this.root = this._temp.querySelector(`.${style.root}`);
          document.body.appendChild(this.root);
        })
      )
      .then(() => this._initSwiper())
      .then(() => this.swiper.update());
  }

  _initSwiper() {
    return Promise.resolve()
      .then(() =>
        functionToPromise(() => {
          this.els.swiperContainer = this.root.querySelector(`.${style.swiperContainer}`);
          this.els.swiperContainer.innerHTML += this.containerExtraHtml;
          this.els.swiperWrapper = this.els.swiperContainer.querySelector(
            `.${style.swiperWrapper}`
          );
        }, 50)
      )
      .then(() =>
        functionToPromise(() => {
          // renderPages
          this.pages.forEach((page, index) => page.init(index));
        })
      )
      .then(() =>
        functionToPromise(() => {
          this.swiper = new this.Swiper(this.els.swiperContainer, this.swiperOptions);
        })
      )
      .then(() =>
        functionToPromise(() => {
          // pagesLoaded
          this.pages.forEach((page) => page.pageLoaded());
        })
      );
  }
}
