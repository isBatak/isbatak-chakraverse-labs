// Writes the runtime behind the transformer's virtual `@pandacss-internal/css` module to a real file.
// Transformed `styled(el, { ... })` / `cva()` calls import from it, and Turbopack can only resolve files on disk,
// so next.config.ts aliases the import to this output.

import { mkdir, writeFile } from "node:fs/promises"
import { dirname, join } from "node:path"

import { createNodeDriver } from "@pandacss/compiler"
import { getInternalCssRuntimeSource, resolveCxSeparator } from "@pandacss/transformer"

const cwd = join(import.meta.dirname, "..")
const outfile = join(cwd, ".panda/internal-css.mjs")

const driver = await createNodeDriver({ cwd })
const source = getInternalCssRuntimeSource(resolveCxSeparator(driver.config))

await mkdir(dirname(outfile), { recursive: true })
await writeFile(outfile, source)
