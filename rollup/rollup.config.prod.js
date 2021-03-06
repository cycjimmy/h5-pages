import pkg from '../package.json';

import { banner, input, name, plugins, terserPlugins } from './rollup.common';

export default [
  {
    input,
    output: [
      { file: pkg.main, format: 'cjs', exports: 'named' },
      { file: pkg.module, format: 'es', exports: 'named' }
    ],
    plugins
  },
  {
    input,
    output: {
      name,
      file: pkg.browser,
      format: 'umd',
      banner,
      exports: 'named'
    },
    plugins: [...plugins, terserPlugins]
  }
];
