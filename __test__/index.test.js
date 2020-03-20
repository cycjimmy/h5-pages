import Swiper from 'swiper';

import h5Pages from '../src/index';
import testSingletonPage from '../__mocks__/testSingletonPage';

describe('init default test', () => {
  test('init() empty parameter will throw an error', () => {
    expect(() => {
      h5Pages.init();
    }).toThrow();
  });

  test('init: window.Swiper exists', () => {
    window.Swiper = Swiper;
    h5Pages.init();
  });

  test('init(): common parameters test', () => {
    h5Pages.init({
      Swiper,
      pages: [],
      swiperOptions: {},
      containerExtraHtml: ''
    });
  });
});

describe('Page and page-related tests', () => {
  const testPageName = 'testPage';
  const testPage = new h5Pages.Page({
    name: testPageName
  });

  test('testPage default test', (done) => {
    h5Pages
      .init({
        Swiper,
        pages: [testPage, testSingletonPage]
      })
      .then(() => {
        expect(testPage.name).toBe(testPageName);
        expect(testPage.root).toBe(h5Pages.root);
        expect(testPage.swiper).toBe(h5Pages.swiper);
        expect(h5Pages.getPageByName(testPageName)).toBe(testPage);

        // changePageTo: coveralls
        h5Pages.changePageTo();
        h5Pages.changePageTo(testPageName);

        setTimeout(done, 500);
      });
  });
});
