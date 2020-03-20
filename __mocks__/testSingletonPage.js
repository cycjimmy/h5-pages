import singleton from '../src/singleton';
import Page from '../src/Page';

export default singleton(
  class extends Page {
    constructor() {
      super({
        name: 'singletonPage'
      });
    }
  }
);
