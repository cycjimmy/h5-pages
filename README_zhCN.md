# H5 Pages
[![Test CI][workflows-badge-image]][workflows-url]
[![libraries dependency status][libraries-status-image]][libraries-status-url]
[![libraries sourcerank][libraries-sourcerank-image]][libraries-sourcerank-url]
[![Coverage Status][coverage-image]][coverage-url]
[![Release date][release-date-image]][release-url]
[![vite][vite-image]][vite-url]
[![semantic-release][semantic-image]][semantic-url]
[![vitest][vitest-image]][vitest-url]
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

## 模块格式

本包为**纯 ESM**：

| 文件 | 格式 | 用途 |
| --- | --- | --- |
| `dist/h5-pages.esm.js` | ESM | `main`、`module` 与 `exports` 入口（打包器、`import`） |
| `dist/h5-pages.umd.js` | UMD | 未压缩的浏览器构建，供 `<script>` 标签使用 |
| `dist/h5-pages.umd.min.js` | UMD | 压缩的浏览器/CDN 构建，对应 `browser`/`unpkg`/`jsdelivr` |
| `dist/index.d.ts` | 类型 | `types` 与 `exports` 的 `types` 条件使用的 TypeScript 声明 |

* 不再提供 CommonJS 产物。Node.js 20.19+ / 22.12+ 可以通过 `require()` 同步加载 ESM 入口。
* UMD 产物以 ES2015 为目标，不再支持 Internet Explorer。
* 样式不再单独输出 `.css` 文件：CSS Modules 的结果会内联进入口文件，并在模块求值时以 `<style>` 元素注入，因此单个 `<script>` 标签即可使用。
* 类型声明随包发布，无需额外安装 `@types/*`；声明以结构化方式描述 Swiper，不会引用 `swiper` 自身。

工具链需要 Node.js `^22.22.2 || ^24.15.0 || >=26.0.0`（见 `package.json` 的 `engines` 与 [CONTRIBUTING.md](CONTRIBUTING.md)）。

## 使用
**h5-pages 基于 [Swiper5+](https://github.com/nolimits4web/Swiper). 首先将 swiper 加入你的工程**

### 函数

#### `init()`: 初始化函数

```javascript
import { init } from '@cycjimmy/h5-pages'
import Swiper from 'swiper'

init({
  Swiper, // Swiper的构造函数
  pages: [page1, page2], // Page实例组成的数组
  containerExtraHtml: `<div class="swiper-pagination"></div>`, // swiper-container下额外的Html，比如导航器等
  swiperOptions: { // swiper的配置项(不支持loop)
    direction: 'vertical',
    pagination: {
      el: '.swiper-pagination',
    },
  },
  compatibleWithSafeArea: true, // 是否兼容刘海屏的安全区，默认为true
})
```

#### `getPageByName(name)`: 通过名称获取单个页面

#### `changePageTo(name, speed)`: 跳转到指定名称的页面

* `name`: 页面名称.
* `speed`: 切换的时间 (单位为毫秒).

### 使用 `h5Pages` 获取核心属性

* `h5Pages.root`: H5的根元素，添加弹窗之类的页面请不要直接写在body里，推荐以root作为父级
* `h5Pages.swiper`: H5的主swiper实例

```javascript
import { h5Pages } from '@cycjimmy/h5-pages'

console.log(h5Pages.root) // 输出H5的根元素
console.log(h5Pages.swiper) // 输出swiper实例
```

### 单页面 Page

#### 构建单页面

##### 直接使用默认Page进行构建

```javascript
import { Page } from '@cycjimmy/h5-pages'

const page = new Page({
  name: 'page', // 页面名称. 默认为"page"加下标，如"page0"
  renderHtml: `<div class="page-wrapper">page</div>`, // swiper-slide内的Html结构
  pageEnter: () => console.log('进入页面'), // 进入页面的钩子函数
  pageLeave: () => console.log('离开页面'), // 离开页面的钩子函数
})
```

##### 使用Page扩展(推荐)

```javascript
import { Page } from '@cycjimmy/h5-pages'

const page = new class extends Page {
  constructor() {
    super({
      name: 'page',
      renderHtml: `<div class="page-wrapper">page</div>`,
      pageEnter: () => console.log('进入页面'),
      pageLeave: () => console.log('离开页面'),
    })
  }

  // paramInit(): [可选] 添加你的自定义参数.
  paramInit() {
    // 在此方法中必须先调用super.paramInit()
    super.paramInit()

    // 建议在此处放置自定义参数.
    this.oneCustomElement = this.page.querySelector(`.one-custom-element`)
  }

  // eventBind(): [可选] 添加你的自定义事件绑定.
  eventBind() {
    // 在此方法中必须先调用super.eventBind()
    super.eventBind()

    // 建议在此处放置自定义事件绑定.
    this.oneCustomElement.addEventListener('click', () => {
      console.log('oneCustomElement clicked')
    })
  }

  // extraRender(): [可选] 当页面加载完毕时，增加你自定义的操作
  extraRender() {
    console.log('pageLoaded')
  }

  // 其他自定义的扩展
  // ...
}()
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
import { Popup } from '@cycjimmy/h5-pages'

const popup = new class extends Popup {
  load() {
    // 你必须用自定义的load方法覆盖这个函数
  }

  // 其他自定义的扩展
  // ...
}()
```

#### `Popup` 实例方法

* `load()`: 加载(展示)弹出层。你必须用自定义的load方法覆盖这个函数，可以返回 `Promise<void>`，也可以不返回值。
* `render(htmlText)`: 渲染自定义的Html文本并且将这个弹出层添加到H5页面的根元素
* `remove()`: 将弹出层从H5页面根元素中移除.

#### `Popup` 实例属性

* `root`: H5的根元素。同`h5Pages.root`
* `popup`: 该Popup实例的根元素

## CDN
[![jsdelivr][jsdelivr-image]][jsdelivr-url]

使用CDN，请在HTML中添加:

```text
<script src="https://cdn.jsdelivr.net/npm/@cycjimmy/h5-pages@5/dist/h5-pages.umd.min.js"></script>
```

UMD 产物会暴露全局变量 `h5Pages`，其成员与 ESM 入口一致（`Page`、`Popup`、`init`、`getPageByName`、`changePageTo`、`h5Pages`）。

<!-- Links: -->
[npm-image]: https://img.shields.io/npm/v/@cycjimmy/h5-pages
[npm-url]: https://npmjs.org/package/@cycjimmy/h5-pages
[npm-bundle-size-image]: https://img.shields.io/bundlephobia/min/@cycjimmy/h5-pages

[download-image]: https://img.shields.io/npm/dt/@cycjimmy/h5-pages
[download-url]: https://npmjs.org/package/@cycjimmy/h5-pages

[jsdelivr-image]: https://img.shields.io/jsdelivr/npm/hy/@cycjimmy/h5-pages
[jsdelivr-url]: https://www.jsdelivr.com/package/npm/@cycjimmy/h5-pages

[workflows-badge-image]: https://github.com/cycjimmy/h5-pages/workflows/Test%20CI/badge.svg
[workflows-url]: https://github.com/cycjimmy/h5-pages/actions/workflows/nodeTestCI.yml

[libraries-status-image]: https://img.shields.io/librariesio/release/npm/@cycjimmy/h5-pages
[libraries-sourcerank-image]: https://img.shields.io/librariesio/sourcerank/npm/@cycjimmy/h5-pages
[libraries-status-url]: https://libraries.io/github/cycjimmy/h5-pages
[libraries-sourcerank-url]: https://libraries.io/npm/@cycjimmy%2Fh5-pages

[coverage-image]: https://img.shields.io/coveralls/github/cycjimmy/h5-pages
[coverage-url]: https://coveralls.io/github/cycjimmy/h5-pages

[release-date-image]: https://img.shields.io/github/release-date/cycjimmy/h5-pages
[release-url]: https://github.com/cycjimmy/h5-pages/releases

[vite-image]: https://img.shields.io/github/package-json/dependency-version/cycjimmy/h5-pages/dev/vite
[vite-url]: https://github.com/vitejs/vite

[semantic-image]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%20%F0%9F%9A%80-semantic--release-e10079.svg
[semantic-url]: https://github.com/semantic-release/semantic-release

[vitest-image]: https://img.shields.io/badge/tested_with-vitest-6e9f18.svg
[vitest-url]: https://vitest.dev/

[license-image]: https://img.shields.io/npm/l/@cycjimmy/h5-pages

[github-pages-url]: https://cycjimmy.github.io/h5-pages/

[Readme-url-En]: https://github.com/cycjimmy/h5-pages/blob/main/README.md
[Readme-url-ZhCN]: https://github.com/cycjimmy/h5-pages/blob/main/README_zhCN.md
