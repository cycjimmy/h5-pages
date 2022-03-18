import isNumber from '@cycjimmy/awesome-js-funcs/esm/judgeBasic/isNumber';
import './theme/base.scss';

import _Page from './page/Page';
import _Popup from './popup/Popup';
import root from './root/root.ins';

export const Page = _Page;
export const Popup = _Popup;

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
 * @param speed
 */
export const changePageTo = (name, speed) => {
  const targetPage = getPageByName(name);

  if (!targetPage) {
    return;
  }

  const aParams = [targetPage.pageIndex];

  if (isNumber(speed)) {
    aParams.push(speed);
  }

  root.swiper.slideTo(...aParams);
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
