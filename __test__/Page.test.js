import Swiper from 'swiper';

import { init, changePageTo } from '../src/index';
import Page from '../src/page/Page';

import testSingletonPage from '../__mocks__/testSingletonPage';

describe('Page default test', () => {
  test('Page default test', (done) => {
    const testPage1 = new Page({});
    const testPage2 = new Page({
      name: 'p2',
      pageEnter: () => console.log('pageEnter'),
      pageLeave: () => console.log('pageLeave')
    });

    init({
      Swiper,
      pages: [testPage1, testPage2, testSingletonPage],
      swiperOptions: {
        speed: 0
      }
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
