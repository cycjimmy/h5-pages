import './theme/base.scss';

import Root from './Root.ins';
import Page from './Page';
import singleton from './singleton';

const rootIns = new Root();

/**
 * getPageByName
 * @param name
 * @returns {*}
 */
const getPageByName = (name) => rootIns.pages.filter((page) => page.name === name)[0];

/**
 * changePageTo
 * @param name
 */
const changePageTo = (name) => {
  const targetPage = getPageByName(name);

  if (!targetPage) {
    return;
  }

  rootIns.swiper.slideTo(targetPage.pageIndex);
};

export default {
  Page,
  singleton,

  init: ({ Swiper, pages = [], swiperOptions = {}, containerExtraHtml = '' } = {}) => {
    if (Swiper) {
      rootIns.Swiper = Swiper;
    } else if (window.Swiper) {
      rootIns.Swiper = window.Swiper;
    } else {
      throw new Error('h5Pages.Swiper does not exist');
    }

    rootIns.pages = pages;
    rootIns.swiperOptions = swiperOptions;
    rootIns.containerExtraHtml = containerExtraHtml;
    return rootIns.init();
  },

  getPageByName,
  changePageTo,

  get root() {
    return rootIns.root;
  },

  get swiper() {
    return rootIns.swiper;
  }
};
