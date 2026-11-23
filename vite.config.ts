import type { BuildOptions, Plugin, TerserOptions } from 'vite'

import { createRequire } from 'node:module'

import myBanner from '@cycjimmy/config-lib/dist/chore/myBanner.js'
import terserOption from '@cycjimmy/config-lib/dist/terser/4.x/production.js'
import autoprefixer from 'autoprefixer'
import { defineConfig } from 'vite'

interface PackageJsonMeta {
  // Banner fields read by config-lib's myBanner.
  name: string
  version: string
  homepage: string
  license: string
  // Output file names below.
  module: string
  browser: string
}

interface LibraryBuildOptions {
  formats: ('es' | 'umd')[]
  fileName: string
  minify?: false | 'terser'
}

const pkg = createRequire(import.meta.url)('./package.json') as PackageJsonMeta

// config-lib's shared option follows terser 4's legacy `output` key. Vite 8 always
// injects `format` and terser rejects having both, so convert `output` → `format`.
// The assertion is confined to this boundary: the shapes line up at runtime but
// the deprecated `output` key has no counterpart in Vite's `TerserOptions`.
const { output, ...restTerserOption } = terserOption
const terserOptions = { ...restTerserOption, format: output } as TerserOptions

// Output file names follow the pkg field conventions of the old rollup configs.
const esmFileName = pkg.module.replace('dist/', '') // h5-pages.esm.js
const umdFileName = pkg.browser.replace('dist/', '').replace('.min.js', '.js') // h5-pages.umd.js
const umdMinFileName = pkg.browser.replace('dist/', '') // h5-pages.umd.min.js

// Inlines the emitted CSS assets into the entry chunks as a runtime <style>
// injection, replicating the old rollup-plugin-postcss behavior so UMD script
// tags keep working without a separate CSS file. Implemented as a micro plugin
// because vite-plugin-css-injected-by-js 5.0.2 produces syntactically broken
// unminified output on Vite 8 (Rolldown module comments swallow the collapsed
// single-line injection code).
function injectCss({ banner = null }: { banner?: string | null } = {}): Plugin {
  return {
    name: 'inject-css',
    enforce: 'post',
    generateBundle(_options, bundle) {
      const cssAssets = Object.keys(bundle).filter(name => name.endsWith('.css'))
      if (cssAssets.length === 0)
        return

      const css = cssAssets
        .flatMap((name) => {
          const asset = bundle[name]
          // Only assets can carry CSS; narrowing keeps the access honest.
          if (asset.type !== 'asset')
            return []

          const { source } = asset
          return source instanceof Uint8Array
            ? new TextDecoder().decode(source)
            : String(source)
        })
        .join('\n')
        .replace(/\/\*\$vite\$:\d+\*\//g, '') // strip Vite internal CSS markers
      cssAssets.forEach((name) => {
        delete bundle[name]
      })

      // Kept compact by construction: terser runs at renderChunk (before this
      // generateBundle hook), so this code is never minified afterwards.
      const injectionCode = `;(function(){try{if(typeof document!='undefined'){var e=document.createElement('style');e.appendChild(document.createTextNode(${JSON.stringify(css.trim())}));document.head.appendChild(e)}}catch(t){console.error('inject-css',t)}})();\n`

      const bannerPrefix = banner
        ? `${banner}\n`
        : ''

      for (const chunk of Object.values(bundle)) {
        if (chunk.type === 'chunk' && chunk.isEntry) {
          chunk.code = `${bannerPrefix}${injectionCode}${chunk.code}`
        }
      }
    },
  }
}

function libBuild({ formats, fileName, minify = false }: LibraryBuildOptions): BuildOptions {
  return {
    target: 'es2015',
    outDir: 'dist',
    // Keep artifacts of previous incremental builds (`npm run build` cleans dist first).
    emptyOutDir: false,
    cssCodeSplit: false,
    // Replicates the old pipeline: JS unminified while the injected CSS is minified.
    cssMinify: true,
    minify,
    ...(minify === 'terser' && { terserOptions }),
    lib: {
      entry: 'src/index.ts',
      name: 'h5Pages',
      formats,
      fileName: () => fileName,
    },
    rollupOptions: {
      output: {
        exports: 'named',
      },
    },
  }
}

const builds: Partial<Record<string, BuildOptions>> = {
  'esm': libBuild({
    formats: ['es'],
    fileName: esmFileName,
  }),
  'umd': libBuild({
    formats: ['umd'],
    fileName: umdFileName,
  }),
  'umd-min': libBuild({
    formats: ['umd'],
    fileName: umdMinFileName,
    minify: 'terser',
  }),
}

// The Pages demo is a normal HTML build of static/index.html instead of a copy of
// static/ plus a <script> tag pointing at the UMD bundle, so the dev server and
// the deployed site share one page. `root: 'static'` (set below) makes outDir
// resolve to .publish/ and drops index.html at the artifact root, where Pages
// serves it from.
const deploymentBuild: BuildOptions = {
  outDir: '../.publish',
  emptyOutDir: true,
  target: 'es2015',
}

export default defineConfig(({ mode }) => {
  const isDeployment = mode === 'deployment'
  const build = builds[mode]

  return {
    // Building from static/ keeps the deployed HTML at the artifact root.
    ...(isDeployment && { root: 'static' }),
    // Relative URLs keep the demo working under the repository subpath.
    ...(isDeployment && { base: './' }),
    // Avoid copying static/ (or any public dir) into dist and polluting .release.
    publicDir: false,
    // The dev entry lives in static/, so point `vite` at it instead of 404ing on /.
    server: {
      open: '/static/index.html',
    },
    plugins: [
      // The demo build emits real CSS assets; only the library builds inline it.
      ...(isDeployment
        ? []
        : [
            injectCss({
              banner: mode === 'umd-min'
                ? myBanner(pkg)
                : null,
            }),
          ]),
    ],
    css: {
      // Inline postcss config keeps the build setup in a single file.
      postcss: {
        plugins: [autoprefixer],
      },
      modules: {
        // Kebab-case class names in SCSS with camelCase JS keys, so the
        // exported style shape stays identical to the old rollup builds.
        localsConvention: 'camelCaseOnly',
        generateScopedName: (mode === 'development' || isDeployment)
          ? '[name]__[local]' // same as the old development/deployment builds
          : '[hash:base64:10]', // same as the old production builds
      },
    },
    ...(isDeployment
      ? { build: deploymentBuild }
      : (build && { build })),
  }
})
