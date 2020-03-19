# H5 Pages
![][workflows-badge-image]
[![build status][travis-image]][travis-url]
[![libraries dependency status][libraries-status-image]][libraries-status-url]
[![libraries sourcerank][libraries-sourcerank-image]][libraries-sourcerank-url]
[![Coverage Status][coverage-image]][coverage-url]
[![Release date][release-date-image]][release-url]
[![rollup][rollup-image]][rollup-url]
[![semantic-release][semantic-image]][semantic-url]
[![jest][jest-image]][jest-url]
[![npm license][license-image]][download-url]

* H5 pages based on swiper5+. ([Demo][github-pages-url])

Language: [En][Readme-url-En] | [中文][Readme-url-ZhCN]
***

## Install
[![NPM version][npm-image]][npm-url]
[![NPM bundle size][npm-bundle-size-image]][npm-url]
[![npm download][download-image]][download-url]

```shell
# via npm
$ npm install @cycjimmy/h5-pages --save

# or via yarn
$ yarn add @cycjimmy/h5-pages
```

## Usage
**h5-pages based on [Swiper5+](https://github.com/nolimits4web/Swiper). Add script of swiper in your project first.**

### Methods 
#### `init`: Initialization function
```javascript
import Swiper from 'swiper';
import {init} from '@cycjimmy/h5-pages';

init({
  Swiper,                                                       // constructor of Swiper
  pages: [page1, page2],                                        // An array of Page instances
  containerExtraHtml: `<div class="swiper-pagination"></div>`,  // Extra Html under swiper-container, such as navigator, etc.
  swiperOptions: {                                              // swiper configuration
    direction: 'vertical',
    pagination: {
      el: '.swiper-pagination',
    },
  },
})
```

#### `Page`: Single page constructor
##### Build directly with the default Page
```javascript
import {Page} from '@cycjimmy/h5-pages';

const page = new Page({
  name: 'page',                                         // name for page
  renderHtml: `<div class="page-wrapper">page</div>`,   // Html structure under swiper-slide
  pageEnter: () => console.log('enter page'),           // Hook function for enter the page
  pageLeave: () => console.log('leave page'),           // Hook function for leave the page
});
```

##### Use Page extends (recommended)
```javascript
import {Page} from '@cycjimmy/h5-pages';

const page = new class extends Page {
  constructor() {
    super({
     name: 'page',
     renderHtml: `<div class="page-wrapper">page</div>`,
    });
  }

  // extraRender: add your custom action When the page loaded
  extraRender() {
    console.log('pageLoaded');
  }

  // Other custom extensions
  // ... 
};
```

#### `singleton`: Turn Page instance into singleton mode (recommended)
```javascript
import {Page, singleton} from '@cycjimmy/h5-pages';

const page = singleton(class extends Page {
  constructor() {
    super({
     name: 'page',
     renderHtml: `page`,
    });
  }
});
```

### Available
* `h5Pages.root`: h5 root element. Don't put pages like popups directly in `body`, it is recommended to use `root` as parent.
* `h5Pages.swiper`: Main swiper instance

## CDN
[![jsdelivr][jsdelivr-image]][jsdelivr-url]

To use via a CDN include this in your HTML:
```text
<script src="https://cdn.jsdelivr.net/npm/h5-pages@1/dist/h5-pages.umd.min.js"></script>
```

<!-- Links: -->
[npm-image]: https://img.shields.io/npm/v/@cycjimmy/h5-pages
[npm-url]: https://npmjs.org/package/@cycjimmy/h5-pages
[npm-bundle-size-image]: https://img.shields.io/bundlephobia/min/@cycjimmy/h5-pages

[download-image]: https://img.shields.io/npm/dt/@cycjimmy/h5-pages
[download-url]: https://npmjs.org/package/@cycjimmy/h5-pages

[jsdelivr-image]: https://img.shields.io/jsdelivr/npm/hy/@cycjimmy/h5-pages
[jsdelivr-url]: https://www.jsdelivr.com/package/npm/@cycjimmy/h5-pages

[workflows-badge-image]: https://github.com/cycjimmy/h5-pages/workflows/Test%20CI/badge.svg
[travis-image]: https://img.shields.io/travis/cycjimmy/h5-pages
[travis-url]: https://travis-ci.org/cycjimmy/h5-pages

[libraries-status-image]: https://img.shields.io/librariesio/release/npm/@cycjimmy/h5-pages
[libraries-sourcerank-image]: https://img.shields.io/librariesio/sourcerank/npm/@cycjimmy/h5-pages
[libraries-status-url]: https://libraries.io/github/cycjimmy/h5-pages
[libraries-sourcerank-url]: https://libraries.io/npm/@cycjimmy%2Fh5-pages

[coverage-image]: https://img.shields.io/coveralls/github/cycjimmy/h5-pages
[coverage-url]: https://coveralls.io/github/cycjimmy/h5-pages

[release-date-image]: https://img.shields.io/github/release-date/cycjimmy/h5-pages
[release-url]: https://github.com/cycjimmy/h5-pages/releases

[rollup-image]: https://img.shields.io/github/package-json/dependency-version/cycjimmy/h5-pages/dev/rollup
[rollup-url]: https://github.com/rollup/rollup

[semantic-image]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
[semantic-url]: https://github.com/semantic-release/semantic-release

[jest-image]: https://img.shields.io/badge/tested_with-jest-99424f.svg
[jest-url]: https://github.com/facebook/jest

[license-image]: https://img.shields.io/npm/l/@cycjimmy/h5-pages

[github-pages-url]: https://cycjimmy.github.io/h5-pages/

[Readme-url-En]: https://github.com/cycjimmy/h5-pages/blob/master/README.md
[Readme-url-ZhCN]: https://github.com/cycjimmy/h5-pages/blob/master/README_zhCN.md
