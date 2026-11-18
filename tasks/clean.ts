/* eslint no-console: 0 */
import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'

// Only generated directories may be removed: this script is called from the npm
// scripts, and a typo in an argument must never wipe the repository. `trash-cli`
// was replaced by this because it moved the deleted directories into a
// repository-local `.Trash/` folder on external volumes, which ESLint then
// scanned.
const TARGETS = new Set(['dist', '.release'])
const target = process.argv[2]

if (!target || !TARGETS.has(target)) {
  console.error(`clean: expected one of ${[...TARGETS].join(', ')}, got "${target ?? ''}"`)
  process.exit(1)
}

fs.rmSync(path.resolve(target), { recursive: true, force: true })
console.log(`clean: removed ${target}`)
