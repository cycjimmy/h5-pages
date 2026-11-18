import type { SwiperConstructor } from './swiper.js'

declare global {
  interface Window {
    // Swiper may be exposed globally by a <script> tag instead of being passed
    // to `init()`.
    Swiper?: SwiperConstructor
  }

  // Injected by the WeChat JS bridge; only present inside a WeChat WebView.
  // Declared with `const` so `typeof WeixinJSBridge` stays a safe runtime guard
  // in browsers where the global does not exist.
  const WeixinJSBridge: {
    invoke: (name: string, params?: Record<string, unknown>) => void
    on: (event: string, handler: () => void) => void
  }
}

export {}
