declare module '*.module.scss' {
  // Keys are the camelCase class names produced by vite's `localsConvention:
  // 'camelCaseOnly'`, so an index signature is the honest shape.
  const classes: Record<string, string>
  export default classes
}

// Global stylesheets imported for their side effects only.
declare module '*.scss' {
  const content: string
  export default content
}
