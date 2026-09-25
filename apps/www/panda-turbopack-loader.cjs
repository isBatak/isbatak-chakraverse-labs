// Rewrites Panda calls (css, recipes, patterns, JSX style props) into static class names at build time.
// The CSS itself is written by the Panda CLI (`panda` / `panda dev`) to styled-system/styles.css,
// so Turbopack only has to transform JavaScript.
// See https://github.com/chakra-ui/panda/discussions/3599#discussioncomment-18208332

/** @type {Promise<import("@pandacss/compiler-shared").Compiler> | undefined} */
let compilerPromise

function getCompiler(cwd) {
  compilerPromise ??= import("@pandacss/compiler").then(async ({ createNodeDriver }) => {
    const driver = await createNodeDriver({ cwd })
    return driver.compiler
  })
  return compilerPromise
}

/** @this {import("webpack").LoaderContext<{}>} */
module.exports = function pandaTurbopackLoader(source) {
  const callback = this.async()
  const path = this.resourcePath

  import("@pandacss/transformer")
    .then(async ({ shouldTransform, transformSource }) => {
      if (!shouldTransform(path)) return callback(null, source)
      const compiler = await getCompiler(this.rootContext)
      const result = transformSource({ path, source, compiler })
      callback(null, result.changed ? result.code : source, result.map ?? undefined)
    })
    .catch(callback)
}
