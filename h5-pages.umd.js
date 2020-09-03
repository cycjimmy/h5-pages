(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.h5Pages = {}));
}(this, (function (exports) { 'use strict';

  function styleInject(css, ref) {
    if (ref === void 0) ref = {};
    var insertAt = ref.insertAt;

    if (!css || typeof document === 'undefined') {
      return;
    }

    var head = document.head || document.getElementsByTagName('head')[0];
    var style = document.createElement('style');
    style.type = 'text/css';

    if (insertAt === 'top') {
      if (head.firstChild) {
        head.insertBefore(style, head.firstChild);
      } else {
        head.appendChild(style);
      }
    } else {
      head.appendChild(style);
    }

    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }
  }

  var css_248z = "body,html{display:flex;position:relative;margin:0;padding:0}html{height:100%;width:100%}body{flex:1;overflow:hidden;margin:env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left)}";
  styleInject(css_248z);

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function getDefaultExportFromCjs (x) {
  	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
  }

  function createCommonjsModule(fn, basedir, module) {
  	return module = {
  	  path: basedir,
  	  exports: {},
  	  require: function (path, base) {
        return commonjsRequire(path, (base === undefined || base === null) ? module.path : base);
      }
  	}, fn(module, module.exports), module.exports;
  }

  function commonjsRequire () {
  	throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
  }

  var CreateInstance = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports["default"] = void 0;
  /**
   * singleton constructor(design patterns)
   * @returns {function(*=)}
   * @constructor
   */

  var _default = function _default() {
    var instance;
    return function (newInstance) {
      if (newInstance) {
        instance = newInstance;
      }

      return instance;
    };
  };

  exports["default"] = _default;
  });

  var CreateInstance$1 = /*@__PURE__*/getDefaultExportFromCjs(CreateInstance);

  var isPromise = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports["default"] = void 0;
  /**
   * determine a promise type
   * @param promise
   * @returns {boolean}
   */

  var _default = function _default(promise) {
    return Object.prototype.toString.call(promise).slice(8, -1) === 'Promise';
  };

  exports["default"] = _default;
  });

  var functionToPromise = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports["default"] = void 0;

  var _isPromise = _interopRequireDefault(isPromise);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      "default": obj
    };
  }
  /**
   * function to promise
   * @param normalFunction
   * @param timeout
   * @returns {Promise<any>}
   */


  var _default = function _default(normalFunction) {
    var timeout = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

    if ((0, _isPromise["default"])(normalFunction)) {
      return normalFunction;
    } // eslint-disable-next-line no-undef


    return new Promise(function (resolve) {
      normalFunction();
      setTimeout(resolve, timeout);
    });
  };

  exports["default"] = _default;
  });

  var functionToPromise$1 = /*@__PURE__*/getDefaultExportFromCjs(functionToPromise);

  /**
   * Root Template
   * @param style
   * @returns {string}
   */
  // eslint-disable-next-line import/prefer-default-export
  var rootTemplate = function rootTemplate(_ref) {
    var style = _ref.style;
    return "\n<div class=\"".concat(style.root, "\">\n  <div class=\"swiper-container ").concat(style.swiperContainer, "\">\n    <div class=\"swiper-wrapper ").concat(style.swiperWrapper, "\"></div>\n  </div>\n</div>\n");
  };

  var css_248z$1 = ".root__root,.root__swiperContainer{position:absolute;z-index:1}.root__swiperWrapper{position:relative;z-index:1}.root__root,.root__swiperContainer{left:0;top:0;width:100%;height:100%}.root__slide{display:flex;justify-content:center;align-items:center}.root__swiperWrapper{width:100%;height:100%;box-sizing:initial;transition-property:transform}.root__slide{flex-direction:column;overflow:hidden}";
  var style = {"root":"root__root","swiperContainer":"root__swiperContainer","swiperWrapper":"root__swiperWrapper","slide":"root__slide"};
  styleInject(css_248z$1);

  var instance = new CreateInstance$1();

  var _default = /*#__PURE__*/function () {
    function _default() {
      _classCallCheck(this, _default);

      if (instance()) {
        return instance();
      }

      this.root = null;
      this.swiper = null;
      this.els = {};
      this._temp = document.createElement('div');
      this._Swiper = null;
      this._swiperOptions = {};
      this._containerExtraHtml = '';
      this._pages = [];

      this._initH5DefaultEvent();

      this._initRoot();

      instance(this);
    }
    /**
     * setSwiperConstructor
     * @param Swiper
     */


    _createClass(_default, [{
      key: "setSwiperConstructor",
      value: function setSwiperConstructor(Swiper) {
        this._Swiper = Swiper;
        return this;
      }
      /**
       * getPages
       * @returns {[]}
       */

    }, {
      key: "getPages",
      value: function getPages() {
        return this._pages;
      }
      /**
       * setPages
       * @param pages
       */

    }, {
      key: "setPages",
      value: function setPages(pages) {
        this._pages = pages;
        return this;
      }
      /**
       * setSwiperOptions
       * @param swiperOptions
       */

    }, {
      key: "setSwiperOptions",
      value: function setSwiperOptions(swiperOptions) {
        this._swiperOptions = swiperOptions;
        return this;
      }
      /**
       * setContainerExtraHtml
       * @param containerExtraHtml
       */

    }, {
      key: "setContainerExtraHtml",
      value: function setContainerExtraHtml(containerExtraHtml) {
        this._containerExtraHtml = containerExtraHtml;
        return this;
      }
      /**
       * init
       * @returns {Promise<*>}
       */

    }, {
      key: "init",
      value: function init() {
        var _this = this;

        return Promise.resolve().then(function () {
          return _this._initSwiper();
        }).then(function () {
          return _this.swiper.update();
        });
      }
      /**
       * _initRoot
       * @private
       */

    }, {
      key: "_initRoot",
      value: function _initRoot() {
        this._temp.innerHTML = rootTemplate({
          style: style
        });
        this.root = this._temp.querySelector(".".concat(style.root));
        document.body.appendChild(this.root);
      }
      /**
       * _initSwiper
       * @returns {Promise<void>}
       * @private
       */

    }, {
      key: "_initSwiper",
      value: function _initSwiper() {
        var _this2 = this;

        return Promise.resolve().then(function () {
          return functionToPromise$1(function () {
            _this2.els.swiperContainer = _this2.root.querySelector(".".concat(style.swiperContainer));
            _this2.els.swiperContainer.innerHTML += _this2._containerExtraHtml;
            _this2.els.swiperWrapper = _this2.els.swiperContainer.querySelector(".".concat(style.swiperWrapper));
          }, 50);
        }) // renderPages
        .then(function () {
          return Promise.all(_this2._pages.map(function (page, index) {
            return page.init(index);
          }));
        }).then(function () {
          return functionToPromise$1(function () {
            _this2.swiper = new _this2._Swiper(_this2.els.swiperContainer, _this2._swiperOptions);
          });
        }).then(function () {
          return functionToPromise$1(function () {
            // pagesLoaded
            _this2._pages.forEach(function (page) {
              return page.pageLoaded();
            });
          }, 100);
        });
      }
    }, {
      key: "_initH5DefaultEvent",
      value: function _initH5DefaultEvent() {
        // contextMenu preventDefault
        document.addEventListener('contextmenu', function (e) {
          return e.preventDefault();
        }); // fix ios native scrolling

        document.body.addEventListener('touchmove', function (e) {
          e.preventDefault();
        }, {
          passive: false
        }); // fix ios soft keyboard

        window.addEventListener('resize', function () {
          if (document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
            return;
          }

          setTimeout(function () {
            if ('scrollIntoView' in document.activeElement) {
              document.activeElement.scrollIntoView(false);
            } else {
              document.activeElement.scrollIntoViewIfNeeded(false);
            }
          }, 0);
        });
        window.addEventListener('focusout', function (e) {
          var target = e.target;

          if (target.tagName !== 'INPUT' && target.tagName !== 'TEXTAREA') {
            return;
          }

          window.scrollTo(0, 0);
        });
        return this;
      }
    }]);

    return _default;
  }();

  var _default$1 = /*#__PURE__*/function () {
    /**
     * Page
     * @param name
     * @param renderHtml
     * @param pageEnter
     * @param pageLeave
     */
    function _default$1(_ref) {
      var _ref$name = _ref.name,
          name = _ref$name === void 0 ? '' : _ref$name,
          _ref$renderHtml = _ref.renderHtml,
          renderHtml = _ref$renderHtml === void 0 ? '' : _ref$renderHtml,
          _ref$pageEnter = _ref.pageEnter,
          pageEnter = _ref$pageEnter === void 0 ? function () {} : _ref$pageEnter,
          _ref$pageLeave = _ref.pageLeave,
          pageLeave = _ref$pageLeave === void 0 ? function () {} : _ref$pageLeave;

      _classCallCheck(this, _default$1);

      this.name = name;
      this.pageIndex = 0;
      this.page = document.createElement('div');
      this.page.classList.add('swiper-slide', style.slide);
      this.page.dataset.hash = this.name;
      this._renderHtml = renderHtml;
      this._pageEnter = pageEnter;
      this._pageLeave = pageLeave;
    }
    /**
     * paramInit
     */


    _createClass(_default$1, [{
      key: "paramInit",
      value: function paramInit() {
        var _RootIns = new _default(),
            swiper = _RootIns.swiper,
            root = _RootIns.root;

        this.swiper = swiper;
        this.root = root;
      }
      /**
       * eventBind
       */

    }, {
      key: "eventBind",
      value: function eventBind() {
        this._setPageCommand();
      }
      /**
       * init
       * @param pageIndex
       * @returns {Q.Promise<any> | Promise<void> | PromiseLike<any>}
       */

    }, {
      key: "init",
      value: function init(pageIndex) {
        var _this = this;

        return this._render().then(function () {
          return functionToPromise$1(function () {
            _this.pageIndex = pageIndex;

            if (!_this.name) {
              _this.name = "page".concat(_this.pageIndex);
              _this.page.dataset.hash = _this.name;
            }
          });
        });
      } // eslint-disable-next-line class-methods-use-this

    }, {
      key: "extraRender",
      value: function extraRender() {}
      /**
       * pageLoaded
       */

    }, {
      key: "pageLoaded",
      value: function pageLoaded() {
        this.paramInit();
        this.eventBind();
        this.extraRender();
      }
      /**
       * _render
       * @private
       */

    }, {
      key: "_render",
      value: function _render() {
        var _this2 = this;

        return functionToPromise$1(function () {
          _this2.page.innerHTML = _this2._renderHtml;
          new _default().els.swiperWrapper.appendChild(_this2.page);
        });
      }
      /**
       * _setPageCommand: hook function
       * @private
       */

    }, {
      key: "_setPageCommand",
      value: function _setPageCommand() {
        var _this3 = this;

        if (!this.swiper) {
          return;
        }

        this.swiper.on('slideChange', function () {
          if (_this3.swiper.realIndex === _this3.pageIndex) {
            _this3._pageEnter(_this3.swiper);
          }

          if (_this3.swiper.previousIndex === _this3.pageIndex) {
            var delay = _this3.swiper.params.speed || 0;
            setTimeout(function () {
              return _this3._pageLeave(_this3.swiper);
            }, delay);
          }
        });
      }
    }]);

    return _default$1;
  }();

  /**
   * singleton
   * @param Page
   * @returns {*}
   */

  var _singleton = (function (Page) {
    var instance = new CreateInstance$1();

    if (instance()) {
      return instance();
    }

    var page = new Page();
    instance(page);
    return page;
  });

  var rootIns = new _default();
  var Page = _default$1;
  var singleton = _singleton;
  /**
   * init
   * @param Swiper
   * @param pages
   * @param swiperOptions
   * @param containerExtraHtml
   * @returns {Promise<*>}
   */

  var init = function init() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        Swiper = _ref.Swiper,
        _ref$pages = _ref.pages,
        pages = _ref$pages === void 0 ? [] : _ref$pages,
        _ref$swiperOptions = _ref.swiperOptions,
        swiperOptions = _ref$swiperOptions === void 0 ? {} : _ref$swiperOptions,
        _ref$containerExtraHt = _ref.containerExtraHtml,
        containerExtraHtml = _ref$containerExtraHt === void 0 ? '' : _ref$containerExtraHt;

    if (Swiper) {
      rootIns.setSwiperConstructor(Swiper);
    } else if (window.Swiper) {
      rootIns.setSwiperConstructor(window.Swiper);
    } else {
      throw new Error('h5Pages.Swiper does not exist');
    }

    rootIns.setPages(pages).setSwiperOptions(swiperOptions).setContainerExtraHtml(containerExtraHtml);
    return rootIns.init();
  };
  /**
   * getPageByName
   * @param name
   * @returns {*}
   */

  var getPageByName = function getPageByName(name) {
    return rootIns.getPages().filter(function (page) {
      return page.name === name;
    })[0];
  };
  /**
   * changePageTo
   * @param name
   */

  var changePageTo = function changePageTo(name) {
    var targetPage = getPageByName(name);

    if (!targetPage) {
      return;
    }

    rootIns.swiper.slideTo(targetPage.pageIndex);
  };
  var index = {
    get root() {
      return rootIns.root;
    },

    get swiper() {
      return rootIns.swiper;
    },

    Page: _default$1,
    singleton: _singleton,
    init: init,
    getPageByName: getPageByName,
    changePageTo: changePageTo
  };

  exports.Page = Page;
  exports.changePageTo = changePageTo;
  exports.default = index;
  exports.getPageByName = getPageByName;
  exports.init = init;
  exports.singleton = singleton;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
