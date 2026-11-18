interface RootTemplateOptions {
  style: Record<string, string>
}

/**
 * Root Template
 */
export function rootTemplate({ style }: RootTemplateOptions): string {
  return `
<div class="${style.root}">
  <div class="swiper swiper-container ${style.swiperContainer}">
    <div class="swiper-wrapper ${style.swiperWrapper}"></div>
  </div>
</div>
`
}
