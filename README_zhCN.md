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

* H5 Pages 基于 swiper5+. ([Demo][github-pages-url])

语言: [En][Readme-url-En] | [中文][Readme-url-ZhCN]
***

## 安装
[![NPM version][npm-image]][npm-url]
[![NPM bundle size][npm-bundle-size-image]][npm-url]
[![npm download][download-image]][download-url]

```shell
# 通过 npm 安装
$ npm install @cycjimmy/h5-pages --save

# 或者通过 yarn 安装
$ yarn add @cycjimmy/h5-pages
```

## 使用
**h5-pages 基于 [Swiper5+](https://github.com/nolimits4web/Swiper). 首先将 swiper 加入你的工程**

### 函数 
#### `init()`: 初始化函数
```javascript
import Swiper from 'swiper';
import {init} from '@cycjimmy/h5-pages';

init({
  Swiper,                                                       // Swiper的构造函数
  pages: [page1, page2],                                        // Page实例组成的数组
  containerExtraHtml: `<div class="swiper-pagination"></div>`,  // swiper-container下额外的Html，比如导航器等
  swiperOptions: {                                              // swiper的配置项(不支持loop)
    direction: 'vertical',
    pagination: {
      el: '.swiper-pagination',
    },
  },
})
```

#### `getPageByName(name)`: 通过名称获取单个页面
#### `changePageTo(name)`: 跳转到指定名称的页面
#### `changePageTo(name, speed)`: 跳转到指定名称的页面
* `name`: 页面名称.
* `speed`: 切换的时间 (单位为毫秒).

### 使用 `h5Pages` 获取核心属性 
* `h5Pages.root`: H5的根元素，添加弹窗之类的页面请不要直接写在body里，推荐以root作为父级
* `h5Pages.swiper`: H5的主swiper实例 

```javascript
import {h5pages} from '@cycjimmy/h5-pages';

console.log(h5Pages.root);    // 输出H5的根元素
console.log(h5Pages.swiper);  // 输出swiper实例
```

### 单页面 Page
#### 构建单页面
##### 直接使用默认Page进行构建
```javascript
import {Page} from '@cycjimmy/h5-pages';

const page = new Page({
  name: 'page',                                         // 页面名称. 默认为"page"加下标，如"page0"
  renderHtml: `<div class="page-wrapper">page</div>`,   // swiper-slide内的Html结构
  pageEnter: () => console.log('进入页面'),              // 进入页面的钩子函数
  pageLeave: () => console.log('离开页面'),              // 离开页面的钩子函数
});
```

##### 使用Page扩展(推荐)
```javascript
import {Page} from '@cycjimmy/h5-pages';

const page = new class extends Page {
  constructor() {
    super({
     name: 'page',
     renderHtml: `<div class="page-wrapper">page</div>`,
     pageEnter: () => console.log('进入页面'),
     pageLeave: () => console.log('离开页面'), 
    });
  }

  // paramInit(): [可选] 添加你的自定义参数.
  paramInit() {
    // 在此方法中必须先调用super.paramInit()
    super.paramInit();  

    // 建议在此处放置自定义参数.
    this.oneCustomElement = this.page.querySelector(`.${_style.oneCustomElement}`);
  }

  // eventBind(): [可选] 添加你的自定义事件绑定.
  eventBind() {
    // 在此方法中必须先调用super.eventBind()
    super.eventBind();

    // 建议在此处放置自定义事件绑定.
    this.oneCustomElement.addEventListener('click', () => {
      console.log('oneCustomElement clicked');
    });
  }

  // extraRender(): [可选] 当页面加载完毕时，增加你自定义的操作
  extraRender() {
    console.log('pageLoaded');
  }

  // 其他自定义的扩展
  // ... 
};
```

#### `Page` 实例的属性
* `name`: 该Page实例的名称
* `root`: H5的根元素。同`h5Pages.root`
* `swiper`: H5的主swiper实例。同`h5Pages.swiper`
* `page`: 该Page实例的根元素，即`swiper-slide`元素
* `pageIndex`: 该Page实例的下标，同`realIndex`

### 弹出层
#### 使用Popup扩展建立一个自定义的弹出
```javascript
import {Popup} from '@cycjimmy/h5-pages';

const Popup = new class extends Popup {
  constructor() {
    super();
  }

  load() {
    // 你必须用自定义的load方法覆盖这个函数
  }

  // 其他自定义的扩展
  // ... 
};
```

#### `Popup` 实例方法
* `load()`: 加载(展示)弹出层。你必须用自定义的load方法覆盖这个函数
* `render(htmlText)`: 渲染自定义的Html文本并且将这个弹出层添加到H5页面的根元素
* `remove()`: 将弹出层从H5页面根元素中移除.

#### `Popup` 实例属性
* `root`: H5的根元素。同`h5Pages.root`
* `popup`: 该Popup实例的根元素

## CDN
[![jsdelivr][jsdelivr-image]][jsdelivr-url]

使用CDN，请在HTML中添加:
```text
<script src="https://cdn.jsdelivr.net/npm/@cycjimmy/h5-pages@3/dist/h5-pages.umd.min.js"></script>
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
