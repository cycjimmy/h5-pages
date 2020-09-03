import './theme/base.scss';

import _Page from './page/Page';
import root from './root/root.ins';

export const Page = _Page;

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
    root.setSwiperConstructor(Swiper);
  } else if (window.Swiper) {
    root.setSwiperConstructor(window.Swiper);
  } else {
    throw new Error('h5Pages.Swiper does not exist');
  }

  root
    .setPages(pages)
    .setSwiperOptions(swiperOptions)
    .setContainerExtraHtml(containerExtraHtml);

  return root.init();
};

/**
 * getPageByName
 * @param name
 * @returns {*}
 */
export const getPageByName = (name) => root.getPages().filter((page) => page.name === name)[0];

/**
 * changePageTo
 * @param name
 */
export const changePageTo = (name) => {
  const targetPage = getPageByName(name);

  if (!targetPage) {
    return;
  }

  root.swiper.slideTo(targetPage.pageIndex);
};

/**
 * Get the Core Properties
 * @type {{readonly swiper: *, readonly root: *}}
 */
export const h5Pages = {
  get root() {
    return root.root;
  },

  get swiper() {
    return root.swiper;
  }
};
