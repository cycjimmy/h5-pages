/* eslint no-undef: off */
import Swiper from 'swiper';

import { init, changePageTo } from '../../src';
import Page from '../../src/page/Page';

import testSingletonPage from '../../__mocks__/mockSingletonPage';

describe('Page default test', () => {
  it('empty page load test ', (done) => {
    const testPage = new Page({});
    testPage.pageLoaded();
    setTimeout(done, 100);
  });

  it('Page default test', (done) => {
    const testPage1 = new Page({});
    const testPage2 = new Page({
      name: 'p2',
      // eslint-disable-next-line no-console
      pageEnter: () => console.log('pageEnter'),
      // eslint-disable-next-line no-console
      pageLeave: () => console.log('pageLeave'),
    });

    init({
      Swiper,
      pages: [testPage1, testPage2, testSingletonPage],
      swiperOptions: {
        speed: 0,
      },
    }).then(() => {
      expect(testPage1.name).toBe('page0');
      expect(testPage2.name).toBe('p2');
      expect(testSingletonPage.name).toBe('singletonPage');

      changePageTo('p2');
      setTimeout(() => changePageTo('singletonPage'), 10);
      setTimeout(done, 1e3);
    });
  });
});
