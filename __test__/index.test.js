import Swiper from 'swiper';

import { h5Pages, init, Page, getPageByName, changePageTo } from '../src/index';
import testSingletonPage from '../__mocks__/testSingletonPage';

describe('init default test', () => {
  test('init() empty parameter will throw an error', () => {
    expect(() => {
      init();
    }).toThrow();
  });

  test('init: window.Swiper exists', () => {
    window.Swiper = Swiper;
    init();
  });

  test('init(): common parameters test', () => {
    init({
      Swiper,
      pages: [],
      swiperOptions: {},
      containerExtraHtml: ''
    });
  });
});

describe('Page and page-related tests', () => {
  const testPageName = 'testPage';
  const testPage = new Page({
    name: testPageName
  });

  test('testPage default test', (done) => {
    init({
      Swiper,
      pages: [testPage, testSingletonPage]
    }).then(() => {
      expect(testPage.name).toBe(testPageName);
      expect(testPage.root).toBe(h5Pages.root);
      expect(testPage.swiper).toBe(h5Pages.swiper);
      expect(getPageByName(testPageName)).toBe(testPage);

      // changePageTo: coveralls
      changePageTo();
      changePageTo(testPageName);

      setTimeout(done, 500);
    });
  });
});
