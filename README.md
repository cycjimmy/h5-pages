# H5 Pages
![][workflows-badge-image]
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
#### `init()`: Initialization function
```javascript
import Swiper from 'swiper';
import {init} from '@cycjimmy/h5-pages';

init({
  Swiper,                                                       // constructor of Swiper
  pages: [page1, page2],                                        // An array of Page instances
  containerExtraHtml: `<div class="swiper-pagination"></div>`,  // Extra Html under swiper-container, such as navigator, etc.
  swiperOptions: {                                              // swiper configuration(loop is not supported)
    direction: 'vertical',
    pagination: {
      el: '.swiper-pagination',
    },
  },
})
```

#### `getPageByName(name)`: Get a single page by name
#### `changePageTo(name, speed)`: Jump to the page with the specified name
* `name`: Page name.
* `speed`: Transition duration (in ms).

### Use `h5Pages` to Get the Core Properties
* `h5Pages.root`: H5 root element. Don't put pages like popups directly in `body`, it is recommended to use `root` as parent.
* `h5Pages.swiper`: Main swiper instance for H5.

```javascript
import {h5pages} from '@cycjimmy/h5-pages';

console.log(h5Pages.root);    // H5 root element
console.log(h5Pages.swiper);  // swiper instance
```

### Single Page
#### Build Single Page
##### Build directly with the default Page
```javascript
import {Page} from '@cycjimmy/h5-pages';

const page = new Page({
  name: 'pageName',                                     // name for page. Default is "page" with index, such as "page0". 
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
     pageEnter: () => console.log('enter page'),
     pageLeave: () => console.log('leave page'),
    });
  }
  
  // paramInit(): [Option] Add your custom parameters.
  paramInit() {
    // In this function super.paramInit() must be called first.
    super.paramInit();  

    // It is recommended to place your custom parameters here.
    this.oneCustomElement = this.page.querySelector(`.${_style.oneCustomElement}`);
  }

  // eventBind(): [Option] Add your custom event bindings.
  eventBind() {
    // In this function super.eventBind() must be called first.
    super.eventBind();

    // It is recommended to place custom event bindings here.
    this.oneCustomElement.addEventListener('click', () => {
      console.log('oneCustomElement clicked');
    });
  }

  // extraRender(): [Option] Add your custom action When the page loaded.
  extraRender() {
    console.log('pageLoaded');
  }

  // Other custom extensions
  // ... 
};
```

#### `Page` instance Properties
* `name`: The name of the Page instance.
* `root`: H5 root element. Same as `h5Pages.root`.
* `swiper`: Main swiper instance for H5. Same as `h5Pages.swiper`.
* `page`: The root element of the page instance, which is the `swiper-slide` element.
* `pageIndex`: The index of the page instance, the same as `realIndex` for swiper.

### Popup
#### Use Popup extends to Build a Popup
```javascript
import {Popup} from '@cycjimmy/h5-pages';

const Popup = new class extends Popup {
  constructor() {
    super();
  }

  load() {
    // You must Overwrite this function with your own function
  }

  // Other custom extensions
  // ... 
};
```

#### `Popup` Instance Methods
* `load()`: Load(Show off) the popup. You must Overwrite this function with your own function.
* `render(htmlText)`: Render custom html texts and add the popup to the root element of h5 page.
* `remove()`: Remove the popup from the root element of h5 page. 

#### `Popup` instance Properties
* `root`: H5 root element. Same as `h5Pages.root`.
* `popup`: The root element of the popup instance.

## CDN
[![jsdelivr][jsdelivr-image]][jsdelivr-url]

To use via a CDN include this in your HTML:
```text
<script src="https://cdn.jsdelivr.net/npm/@cycjimmy/h5-pages@4/dist/h5-pages.umd.min.js"></script>
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

[Readme-url-En]: https://github.com/cycjimmy/h5-pages/blob/main/README.md
[Readme-url-ZhCN]: https://github.com/cycjimmy/h5-pages/blob/main/README_zhCN.md
