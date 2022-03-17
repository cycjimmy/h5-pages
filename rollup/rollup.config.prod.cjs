const pkg = require('../package.json');

const { banner, input, name, plugins, terserPlugins } = require('./rollup.common.cjs');

module.exports = [
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
