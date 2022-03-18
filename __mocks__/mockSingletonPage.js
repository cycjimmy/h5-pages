import Page from '../src/page/Page';

export default new (class extends Page {
  constructor() {
    super({
      name: 'singletonPage',
    });
  }
})();
