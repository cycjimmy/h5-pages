import './theme/base.scss';

import Root from './Root.ins';
import _Page from './Page';
import _singleton from './singleton';

const rootIns = new Root();

export const Page = _Page;
export const singleton = _singleton;

/**
 * init
 * @param Swiper
 * @param pages
 * @param swiperOptions
 * @param containerExtraHtml
 * @returns {Promise<*>}
 */
export const init = ({ Swiper, pages = [], swiperOptions = {}, containerExtraHtml = '' } = {}) => {
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
export const getPageByName = (name) => rootIns.getPages().filter((page) => page.name === name)[0];

/**
 * changePageTo
 * @param name
 */
export const changePageTo = (name) => {
  const targetPage = getPageByName(name);

  if (!targetPage) {
    return;
  }

  rootIns.swiper.slideTo(targetPage.pageIndex);
};

export default {
  get root() {
    return rootIns.root;
  },

  get swiper() {
    return rootIns.swiper;
  },

  Page: _Page,
  singleton: _singleton,
  init,
  getPageByName,
  changePageTo
};
