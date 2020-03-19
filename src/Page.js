import functionToPromise from '@cycjimmy/awesome-js-funcs/typeConversion/functionToPromise';

import RootIns from './Root.ins';
import style from './theme/root.scss';

export default class {
  constructor({ name = '', renderHtml = '', pageEnter = () => {}, pageLeave = () => {} }) {
    this.name = name;
    this.pageIndex = 0;
    this.page = document.createElement('div');
    this.page.classList.add('swiper-slide', style.slide);
    this.page.dataset.hash = this.name;
    this.renderHtml = renderHtml;
    this.pageEnter = pageEnter;
    this.pageLeave = pageLeave;
  }

  paramInit() {
    const { swiper, root } = new RootIns();
    this.swiper = swiper;
    this.root = root;
  }

  eventBind() {
    this._setPageCommand();
  }

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

  pageLoaded() {
    this.paramInit();
    this.eventBind();
    this.extraRender();
  }

  _render() {
    return functionToPromise(() => {
      this.page.innerHTML = this.renderHtml;
      new RootIns().els.swiperWrapper.appendChild(this.page);
    });
  }

  _setPageCommand() {
    if (this.swiper) {
      return;
    }

    this.swiper.on('slideChange', () => {
      if (this.swiper.realIndex === this.pageIndex) {
        this.pageEnter(this.swiper);
      }
      if (this.swiper.previousIndex === this.pageIndex) {
        this.pageLeave(this.swiper);
      }
    });
  }
}
