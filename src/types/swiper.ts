// Structural description of the parts of Swiper this library touches. It is
// deliberately local instead of imported from `swiper`, so the published
// declarations never require consumers to install a specific Swiper version.
export interface SwiperParams {
  speed?: number
}

export interface SwiperInstance {
  readonly realIndex: number
  readonly previousIndex: number
  readonly params: SwiperParams
  slideTo: (index: number, speed?: number) => void
  update: () => void
  on: (event: 'slideChange', handler: () => void) => void
}

export type SwiperConstructor = new (el: HTMLElement, options?: SwiperOptions) => SwiperInstance

// `object` instead of `Record<string, unknown>` on purpose: an interface (such
// as swiper's own `SwiperOptions`) has no implicit index signature and would not
// be assignable to a record type.
export type SwiperOptions = object
