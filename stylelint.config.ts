export default {
  extends: [
    'stylelint-config-standard-scss',
    'stylelint-config-idiomatic-order',
  ],
  rules: {
    // CSS Modules selectors: `:global(...)` is emitted as-is and a local class
    // exported to JS is read through `localsConvention: 'camelCaseOnly'`.
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global', 'local'],
      },
    ],
  },
}
