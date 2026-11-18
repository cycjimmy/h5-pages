# Contributing

The repository is released under the MIT license, and follows a standard Github development process, using Github tracker for issues and merging pull requests into main.

## Requirements

* Node.js `^22.22.2 || ^24.15.0 || >=26.0.0`, the same range as `engines` in `package.json`; jsdom and stylelint set that floor
* npm 10+

`.npmrc` sets `engine-strict=true`, so `npm install` / `npm ci` fail with a
clear message on an unsupported Node.js instead of breaking halfway through a
build. `Test CI` runs the matrix on the latest 22 and 24, plus a
`test (node floor)` job pinned to 22.22.2 that fails as soon as a dependency
raises its own floor above the advertised range.

## Development

```shell
$ npm install
$ npm run dev          # Vite dev server, opens static/index.html
$ npm run type-check   # tsc --noEmit over src, __test__, tasks and the configs
$ npm run lint         # ESLint (flat config, @antfu/eslint-config)
$ npm run lint:style   # Stylelint for src/**/*.{css,scss}
$ npm test             # Vitest
$ npm run package      # build dist/ and assemble .release/
```

`static/index.html` is the only page: it imports `src/` directly, so the dev
server and the GitHub Pages demo share it. `npm run dev` opens
`/static/index.html`; `build:deployment` builds that same file with `static/` as
the Vite root, which is what puts `index.html` at the root of the `.publish`
artifact.

## TypeScript specifics

* `tsconfig.json` type-checks everything (`noEmit`) and is the config the CI
  `type-check` step uses. `tsconfig.build.json` is the declaration-only config
  that writes `dist/index.d.ts` during the build.
* `tasks/*.ts` are executed by Node's built-in type stripping, so they may only
  use syntax that can be erased: no `enum`, `namespace` or constructor parameter
  properties. `erasableSyntaxOnly` enforces this during `type-check`, and Node's
  ESM resolver requires relative imports to carry the `.ts` extension.
* `release.config.js` stays JavaScript on purpose: semantic-release loads it
  through cosmiconfig, whose TypeScript loader resolves `typescript` from
  semantic-release's own install tree (inside the action) rather than from this
  project.
* `src/types/*.d.ts` holds the ambient declarations for CSS Modules,
  `@cycjimmy/config-lib` and `@cycjimmy/awesome-js-funcs`, none of which ship
  types. `src/types/swiper.ts` describes Swiper structurally on purpose: the
  published declarations must not depend on a consumer's `swiper` install.
* `__test__/type-contract.ts` is a compile-only file: `type-check` fails if the
  declarations stop accepting a documented consumer usage (swiper's own options
  type, synchronous and asynchronous `Popup.load()` overrides, `Page` subclass
  hooks). It is not matched by Vitest's `*.test.ts` pattern.
* A global stylesheet must not be imported for its side effects from
  `src/index.ts`: that import is re-emitted into `dist/index.d.ts` and points at
  a file that is not published. `src/theme/base.scss` is pulled into
  `src/root/root.module.scss` with `@use` instead.

## Build outputs

`npm run build` writes four artifacts into `dist/`:

| File | Format | Purpose |
| --- | --- | --- |
| `dist/h5-pages.esm.js` | ESM | `main`, `module` and `exports` entry (bundlers, `import`) |
| `dist/h5-pages.umd.js` | UMD | unminified browser build for `<script>` tags |
| `dist/h5-pages.umd.min.js` | UMD | minified browser/CDN build, attached to the GitHub release |
| `dist/index.d.ts` | Types | declarations for `types` and the `exports` `types` condition |

`npm run build` runs `build:types` (`tsc -p tsconfig.build.json`) before the
three Vite builds; Vite runs with `emptyOutDir: false`, so the declarations
survive the JS builds. There is no CommonJS bundle.

The CSS Modules output is inlined into the entry chunks as a runtime `<style>`
injection by the `injectCss` plugin in `vite.config.ts`, so no `.css` file is
emitted and a plain `<script>` tag needs nothing else. Stylelint's
`selector-class-pattern` keeps the SCSS selectors kebab-case; the camelCase keys
in JS (`style.popupWrapper`) come from Vite's `localsConvention: 'camelCaseOnly'`.

`npm run build:deployment` builds `static/index.html` as a regular Vite app into
`.publish/` (`base: './'` so it works under the repository subpath). The
`Deploy To GitHub Pages` workflow uploads `.publish` as a Pages artifact and
publishes it with `actions/deploy-pages`.

## Repository settings required by the deployment

The Pages deployment cannot be fully expressed in code, so the switch itself lives in the repository settings:

1. **Settings → Pages → Build and deployment → Source**: select **GitHub Actions**. With *Deploy from a branch* selected, `actions/deploy-pages` refuses to run, because no Pages site is served from the artifact flow.
2. The legacy `gh-pages` branch and the `ACCESS_TOKEN` secret are no longer used: the site is uploaded as an artifact and published with the workflow's own OIDC token, so no stored credential is involved. Both can be removed once the first deployment from `main` has succeeded.

## Repository settings required by the bots

`.github/workflows/dependabotAutoMerge.yml` merges non-major Dependabot pull requests automatically. Three settings cannot be expressed in code and must be enabled by a maintainer:

1. **Settings → Actions → General → Workflow permissions**: choose *Read and write permissions*. Dependabot opens its pull requests from branches inside this repository, which is why the `pull_request` event can hand `GITHUB_TOKEN` a write token there. Pull requests from forks stay read-only, and the workflow skips them through the `head.repo.full_name` guard.
2. **Settings → General**: enable *Allow auto-merge*.
3. **Branch protection on `main`**: block force pushes and deletions, but leave *Require status checks to pass before merging* **off**. `semantic-release` pushes `chore(release): … [skip ci]` straight to `main`, and GitHub rejects that push while a required check is configured. A repository owned by a personal account cannot add the GitHub Actions app to a ruleset bypass list either, so there is no way to have both.

The CI gate for Dependabot lives in `dependabotAutoMerge.yml` instead: it polls `gh pr checks` for the expected check names, squash merges only after they pass, and confirms the pull request reached `MERGED` before it asks for the Pages deployment. `Test CI` reports one check per matrix cell (`test (22, ubuntu-latest)` and so on), so the `test-status` job aggregates them into a single `Test CI Summary` check that is easy to read.

`Test CI` keeps the write token away from the steps that execute repository code: the `test` job is read-only, and the semantic-release dry-run lives in its own `release-dry-run` job gated to trusted refs.

## npm trusted publishing

`release.yml` authenticates to npm with **trusted publishing** (OIDC): no
`NPM_TOKEN` is stored, and the job declares `id-token: write`. The npm side must
be configured once by a maintainer:

1. Open the package settings on npmjs.com → **Trusted Publisher** → **GitHub Actions**.
2. Owner `cycjimmy`, Repository `h5-pages`, Workflow filename `release.yml`, Environment left empty.
3. Save. A release from a different workflow file name will be rejected with `401`.

## Labels

The triage bot, the issue forms and the pull request labeler reference labels that have to exist in the repository. `issues.addLabels` fails with `422` for unknown labels, so keep this list in sync when a rule changes:

| Label | Used by |
| --- | --- |
| `bug` | `bug_report.yml` form |
| `enhancement` | `feature_request.yml` form |
| `needs-info` | triage rule 2, plus the 7-day lifecycle in `stale.yml` |
| `usage` | triage rule 1 (questions about using the library) |
| `triaged` | manual exemption from the half-year staleness in `stale.yml` |
| `stale` | applied and removed by `actions/stale` |
| `ci` | `dependabot.yml` and `.github/labeler.yml` |
| `build` | `.github/labeler.yml` |
| `dependencies` | `dependabot.yml` and `.github/labeler.yml` |
| `documentation` | `.github/labeler.yml` |

## Commits

[Conventional Commits](https://www.conventionalcommits.org/) are required: `semantic-release` derives the version and the changelog from them. A breaking change must be marked with `!` and a `BREAKING CHANGE:` footer. Commit subjects and bodies are written in English.
