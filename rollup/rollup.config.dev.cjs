const browsersync = require('rollup-plugin-browsersync');
const copy = require('rollup-plugin-copy');

const pkg = require('../package.json');

const { input, IS_DEVELOPMENT, IS_DEPLOYMENT, name, plugins } = require('./rollup.common.cjs');

module.exports = [
  {
    input,
    output: {
      name,
      file: pkg.browser.replace('.min.js', '.js'),
      format: 'umd',
      exports: 'named'
    },
    plugins: [
      ...plugins,

      IS_DEPLOYMENT &&
        copy({
          hook: 'writeBundle',
          targets: [
            {
              src: ['static/**/*', 'dist/**.umd.js'],
              dest: '.publish'
            }
          ]
        }),
      IS_DEVELOPMENT &&
        browsersync({
          server: ['static', 'dist'],
          watch: true
        })
    ]
  }
];
