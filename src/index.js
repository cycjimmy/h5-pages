import './theme/base.scss';

import Root from './Root.ins';
import Page from './Page';
import singleton from './singleton';

const rootIns = new Root();

/**
 * init
 * @param Swiper
 * @param pages
 * @param swiperOptions
 * @param containerExtraHtml
 * @returns {Promise<*>}
 */
const init = ({ Swiper, pages = [], swiperOptions = {}, containerExtraHtml = '' } = {}) => {
  if (Swiper) {
    rootIns.setSwiperConstructor(Swiper);
  } else if (window.Swiper) {
    rootIns.setSwiperConstructor(window.Swiper);
  } else {
    throw new Error('h5Pages.Swiper does not exist');
  }

  rootIns
    .setPages(pages)
    .setSwiperOptions(swiperOptions)
    .setContainerExtraHtml(containerExtraHtml);

  return rootIns.init();
};

/**
 * getPageByName
 * @param name
 * @returns {*}
 */
const getPageByName = (name) => rootIns.getPages().filter((page) => page.name === name)[0];

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
  init,
  getPageByName,
  changePageTo,
  singleton,

  get root() {
    return rootIns.root;
  },

  get rootIns() {
    return rootIns;
  },

  get swiper() {
    return rootIns.swiper;
  }
};
