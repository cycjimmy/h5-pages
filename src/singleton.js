// constructor
import CreateInstance from '@cycjimmy/awesome-js-funcs/designPattern/CreateInstance';

export default (Page) => {
  const instance = new CreateInstance();

  if (instance()) {
    return instance();
  }
  const page = new Page();
  instance(page);
  return page;
};
