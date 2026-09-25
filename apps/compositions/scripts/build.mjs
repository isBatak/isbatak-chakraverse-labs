import { execFile } from "node:child_process"
import { existsSync, watch as watchFiles } from "node:fs"
import { mkdir, readdir, readFile, writeFile } from "node:fs/promises"
import { basename, extname } from "node:path"
import { fileURLToPath } from "node:url"
import { promisify } from "node:util"
import { createNodeDriver } from "@pandacss/compiler"
import { transformSource } from "@pandacss/transformer"
import preact from "@preact/preset-vite"
import { svelte } from "@sveltejs/vite-plugin-svelte"
import vue from "@vitejs/plugin-vue"
import { format } from "oxfmt"
import { build } from "vite"
import solid from "vite-plugin-solid"

const root = fileURLToPath(new URL("..", import.meta.url))
const watch = process.argv.includes("--watch")
const run = promisify(execFile)

const stylings = [
  { id: "panda", label: "Panda CSS" },
  { id: "css", label: "CSS" },
]

const designSystem = "@isbatak/panda-ds/"
const pandaPackages = ["@isbatak/panda-wheel-picker"]

const frameworks = [
  {
    id: "react",
    label: "React",
    ext: "tsx",
    lang: "tsx",
    runtime: ["react", "react-dom"],
    target: "src/components",
    exportName: (name) => name,
    external: [/^react($|\/)/, /^react-dom($|\/)/],
    banner: '"use client";',
  },
  {
    id: "vue",
    label: "Vue",
    ext: "vue",
    lang: "vue",
    runtime: ["vue"],
    target: "src/components",
    plugins: () => [vue()],
  },
  {
    id: "svelte",
    label: "Svelte",
    ext: "svelte",
    lang: "svelte",
    runtime: ["svelte"],
    target: "src/lib/components",
    plugins: () => [svelte()],
  },
  {
    id: "solid",
    label: "Solid",
    ext: "tsx",
    lang: "tsx",
    runtime: ["solid-js"],
    target: "src/components",
    exportName: (name) => name,
    plugins: () => [solid()],
  },
  {
    id: "preact",
    label: "Preact",
    ext: "tsx",
    lang: "tsx",
    runtime: ["preact"],
    target: "src/components",
    exportName: (name) => name,
    plugins: () => [preact()],
  },
  {
    id: "vanilla",
    label: "Vanilla",
    ext: "ts",
    lang: "ts",
    runtime: [],
    target: "src/components",
    exportName: (name) => `create${name}`,
  },
]

const pascalCase = (id) => id.replace(/(^|-)(\w)/g, (_, __, char) => char.toUpperCase())

const examplePath = (framework, id) => `${root}/src/examples/${framework.id}/${id}.${framework.ext}`

const packageName = (specifier) =>
  specifier
    .split("/")
    .slice(0, specifier.startsWith("@") ? 2 : 1)
    .join("/")

async function listExamples() {
  const files = await readdir(`${root}/src/examples/react`)
  return files.filter((file) => file.endsWith(".tsx")).map((file) => basename(file, extname(file)))
}

const cacheDir = `${root}/node_modules/.cache/compositions`

const driver = await createNodeDriver({ cwd: root })

const {
  $schema: _schema,
  ignorePatterns: _ignorePatterns,
  ...formatOptions
} = JSON.parse(await readFile(`${root}/../../.oxfmtrc.json`, "utf8"))

const importsOf = (source) =>
  [...source.matchAll(/from "([^"]+)"|import "([^"]+)"/g)].map((match) => match[1] ?? match[2])

const dependenciesOf = (framework, source) => [
  ...new Set(
    importsOf(source)
      .filter((path) => !path.startsWith(".") && !path.startsWith("styled-system/"))
      .map(packageName)
      .filter((name) => !framework.runtime.includes(name)),
  ),
]

function splitBlocks(css) {
  const blocks = []
  let depth = 0
  let start = 0
  for (let index = 0; index < css.length; index++) {
    if (css[index] === "{") depth++
    if (css[index] === "}") depth--
    if (depth === 0 && (css[index] === "}" || css[index] === ";")) {
      blocks.push(css.slice(start, index + 1).trim())
      start = index + 1
    }
  }
  return blocks
}

const isLayer = (block, name) => block.startsWith(`@layer ${name} {`)

const paletteLayer = (base) => {
  const declarations = base.match(/--colors-color-palette-[\w-]+: [^;]+;/g) ?? []
  return `@layer base {\n  :where(html) {\n${declarations.map((declaration) => `    ${declaration}`).join("\n")}\n  }\n}`
}

async function generateStylesheet(id) {
  const outfile = `${cacheDir}/${id}.css`
  await run(`${root}/node_modules/.bin/panda`, ["cssgen", "--include", `src/examples/*/${id}.*`, "-o", outfile], {
    cwd: root,
  })
  const blocks = splitBlocks(await readFile(outfile, "utf8"))
    .filter((block) => !isLayer(block, "reset"))
    .map((block) => (isLayer(block, "base") ? paletteLayer(block) : block))
  return `${blocks.join("\n")}\n`
}

function compileStyles(framework, id, source) {
  const file = examplePath(framework, id)
  const compile = (code, path) => {
    const result = transformSource({ path, source: code, compiler: driver.compiler })
    const compiled = result.changed ? result.code : code
    return compiled.replace(/^([ \t]*)(import .*\n)(?![ \t]*import )/m, `$1$2$1import "./${id}.css"\n`)
  }
  const script = /(<script[^>]*>)([\s\S]*?)(<\/script>)/
  return script.test(source)
    ? source.replace(script, (_, open, body, close) => open + compile(body, `${file}.ts`) + close)
    : compile(source, file)
}

async function readExample(framework, id, stylesheet) {
  const source = await readFile(examplePath(framework, id), "utf8")
  const name = `${id}.${framework.ext}`
  const dir = `${framework.target}/${id}`
  const file = (code) => ({ name, lang: framework.lang, target: `${dir}/${name}`, code })

  const pandaCode = source.replaceAll(designSystem, "styled-system/")
  const formatted = await format(name, compileStyles(framework, id, source), { ...formatOptions, svelte: true })
  if (formatted.errors.length)
    throw new Error(`[compositions] failed to format ${name}: ${formatted.errors[0].message}`)

  return {
    panda: {
      dependencies: dependenciesOf(framework, pandaCode),
      devDependencies: pandaPackages,
      files: [file(pandaCode)],
    },
    css: {
      dependencies: dependenciesOf(framework, formatted.code),
      devDependencies: [],
      files: [file(formatted.code), { name: `${id}.css`, lang: "css", target: `${dir}/${id}.css`, code: stylesheet }],
    },
  }
}

async function writeManifest() {
  const ids = await listExamples()
  const examples = await Promise.all(
    ids.map(async (id) => {
      const stylesheet = await generateStylesheet(id)
      const entries = await Promise.all(
        frameworks.map(async (framework) => {
          if (!existsSync(examplePath(framework, id))) {
            console.warn(`[compositions] ${id} has no ${framework.label} version`)
            return undefined
          }
          return [framework.id, await readExample(framework, id, stylesheet)]
        }),
      )
      return { id, frameworks: Object.fromEntries(entries.filter(Boolean)) }
    }),
  )

  await mkdir(`${root}/dist`, { recursive: true })
  await writeFile(
    `${root}/dist/manifest.json`,
    `${JSON.stringify({ frameworks: frameworks.map(({ id, label }) => ({ id, label })), stylings, examples }, null, 2)}\n`,
  )
  return ids
}

function examplesModule(framework, ids) {
  const virtualId = "virtual:examples"
  const resolvedId = `\0${virtualId}`
  return {
    name: "compositions-examples",
    resolveId: (id) => (id === virtualId ? resolvedId : undefined),
    load(id) {
      if (id !== resolvedId) return undefined
      const available = ids.filter((example) => existsSync(examplePath(framework, example)))
      const imports = available.map((example, index) =>
        framework.exportName
          ? `import { ${framework.exportName(pascalCase(example))} as Example${index} } from ${JSON.stringify(examplePath(framework, example))}`
          : `import Example${index} from ${JSON.stringify(examplePath(framework, example))}`,
      )
      const entries = available.map((example, index) => `${JSON.stringify(example)}: Example${index}`)
      return `${imports.join("\n")}\nexport const examples = { ${entries.join(", ")} }\n`
    },
  }
}

function snapshotMachines() {
  const prefix = "\0compositions-snapshot:"
  const exampleFile = /\/src\/examples\/[^/]+\/([^/.?]+)\.\w+(\?.*)?$/
  return {
    name: "compositions-snapshot",
    enforce: "pre",
    resolveId(source, importer) {
      const example = importer?.match(exampleFile)?.[1]
      if (source === "@isbatak/zag-wheel-picker" && example) return `${prefix}${example}`
    },
    load(id) {
      if (!id.startsWith(prefix)) return undefined
      return [
        `import { machine } from "@isbatak/zag-wheel-picker"`,
        `import { withSnapshot } from ${JSON.stringify(`${root}mount/snapshot.ts`)}`,
        `export * from "@isbatak/zag-wheel-picker"`,
        `const snapshotMachine = withSnapshot(machine, ${JSON.stringify(id.slice(prefix.length))})`,
        `export { snapshotMachine as machine }`,
      ].join("\n")
    },
  }
}

const ids = await writeManifest()

if (watch) watchFiles(`${root}/src`, { recursive: true }, () => writeManifest())

await Promise.all(
  frameworks.map((framework) =>
    build({
      root,
      configFile: false,
      logLevel: "warn",
      plugins: [snapshotMachines(), examplesModule(framework, ids), ...(framework.plugins?.() ?? [])],
      define: { "process.env.NODE_ENV": JSON.stringify("production") },
      build: {
        outDir: "dist",
        emptyOutDir: false,
        copyPublicDir: false,
        watch: watch ? {} : null,
        lib: {
          entry: `mount/${framework.id}.${framework.ext === "tsx" ? "tsx" : "ts"}`,
          formats: ["es"],
          fileName: framework.id,
          cssFileName: framework.id,
        },
        rollupOptions: {
          external: framework.external ?? [],
          output: { banner: framework.banner ?? "" },
          onLog: (level, log, handler) => log.code !== "MODULE_LEVEL_DIRECTIVE" && handler(level, log),
        },
      },
    }),
  ),
)
