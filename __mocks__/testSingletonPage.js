import singleton from '../src/tools/singleton';
import Page from '../src/page/Page';

export default singleton(
  class extends Page {
    constructor() {
      super({
        name: 'singletonPage'
      });
    }
  }
);
