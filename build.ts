import isolatedDecl from 'bun-plugin-isolated-decl'

import { existsSync } from 'node:fs'
import { rm } from 'node:fs/promises'

import type { BuildConfig } from 'bun'

const defaultBuildConfig: BuildConfig = {
  entrypoints: [
    './src/array.ts',
    './src/async.ts',
    './src/class.ts',
    './src/curry.ts',
    './src/function.ts',
    './src/index.ts',
    './src/math.ts',
    './src/number.ts',
    './src/object.ts',
    './src/predicates.ts',
    './src/promise.ts',
    './src/random.ts',
    './src/series.ts',
    './src/string.ts',
    './src/util.ts'
  ],
  outdir: './dist',
  plugins: [isolatedDecl()]

  // minify: true,
}

if (existsSync('./dist')) {
  await rm('./dist', { recursive: true })
}

await Bun.build({
  ...defaultBuildConfig,
  format: 'esm',
  naming: '[name].[ext]'
})

await Bun.build({
  ...defaultBuildConfig,
  format: 'cjs',
  naming: '[name].cjs'
})
