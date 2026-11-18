// @cycjimmy/awesome-js-funcs ships no type declarations. Only the two helpers
// this library imports are described here.

declare module '@cycjimmy/awesome-js-funcs/judgeBasic' {
  export const isNumber: (value: unknown) => boolean
}

declare module '@cycjimmy/awesome-js-funcs/typeConversion' {
  // Resolves once the callback has run (and the optional delay has elapsed).
  // When the callback returns a promise, that promise is returned unchanged.
  export const functionToPromise: (fn: () => unknown, timeout?: number) => Promise<void>
}
