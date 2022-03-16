/**
 * Root Template
 * @param style
 * @returns {string}
 */
// eslint-disable-next-line import/prefer-default-export
export const rootTemplate = ({ style }) => `
<div class="${style.root}">
  <div class="swiper swiper-container ${style.swiperContainer}">
    <div class="swiper-wrapper ${style.swiperWrapper}"></div>
  </div>
</div>
`;
