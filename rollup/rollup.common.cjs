const { eslint } = require('rollup-plugin-eslint');
const json = require('@rollup/plugin-json');
const resolve = require('@rollup/plugin-node-resolve').default;
const commonjs = require('@rollup/plugin-commonjs');
const babel = require('@rollup/plugin-babel').default;
const postcss = require('rollup-plugin-postcss');
const autoprefixer = require('autoprefixer');
const { terser } = require('rollup-plugin-terser');
const myBanner = require('@cycjimmy/config-lib/cjs/chore/myBanner.cjs').default;
const terserOption = require('@cycjimmy/config-lib/cjs/terser/4.x/production.cjs').default;

const pkg = require('../package.json');

const IS_DEVELOPMENT = process.env.NODE_ENV === 'development';
const IS_PRODUCTION = process.env.NODE_ENV === 'production';
const IS_DEPLOYMENT = process.env.NODE_ENV === 'deployment';

exports.IS_DEVELOPMENT = IS_DEVELOPMENT;
exports.IS_PRODUCTION = IS_PRODUCTION;
exports.IS_DEPLOYMENT = IS_DEPLOYMENT;
exports.input = './src/index.js';
exports.name = 'h5Pages';
exports.banner = myBanner(pkg);

exports.plugins = [
  json(),
  postcss({
    modules: {
      generateScopedName: IS_PRODUCTION ? '[hash:base64:10]' : '[name]__[local]'
    },
    autoModules: false,
    minimize: true,
    plugins: [autoprefixer]
  }),
  eslint({
    fix: true,
    exclude: ['**/*.(css|scss)']
  }),
  resolve(),
  babel({ babelHelpers: 'bundled' }),
  commonjs()
];

exports.terserPlugins = IS_PRODUCTION && terser(terserOption);
