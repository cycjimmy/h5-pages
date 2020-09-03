import CreateInstance from '@cycjimmy/awesome-js-funcs/designPattern/CreateInstance';

/**
 * singleton
 * @param Base
 * @returns {*}
 */
export default (Base) => {
  const instance = new CreateInstance();

  if (instance()) {
    return instance();
  }

  const base = new Base();
  instance(base);

  return base;
};
