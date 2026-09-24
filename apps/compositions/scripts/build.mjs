import { existsSync, watch as watchFiles } from "node:fs"
import { mkdir, readdir, readFile, writeFile } from "node:fs/promises"
import { basename, extname } from "node:path"
import { fileURLToPath } from "node:url"
import preact from "@preact/preset-vite"
import { svelte } from "@sveltejs/vite-plugin-svelte"
import vue from "@vitejs/plugin-vue"
import { build } from "vite"
import solid from "vite-plugin-solid"

const root = fileURLToPath(new URL("..", import.meta.url))
const watch = process.argv.includes("--watch")

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

async function readExample(framework, id) {
  const source = await readFile(examplePath(framework, id), "utf8")
  const imports = [...source.matchAll(/from "([^"]+)"|import "([^"]+)"/g)].map((match) => match[1] ?? match[2])
  const styles = imports.filter((path) => path.startsWith("../../styles/")).map((path) => basename(path))
  const dependencies = [
    ...new Set(
      imports
        .filter((path) => !path.startsWith("."))
        .map(packageName)
        .filter((name) => !framework.runtime.includes(name)),
    ),
  ]

  const code = source.replaceAll("../../styles/", "./")
  const dir = `${framework.target}/${id}`

  return {
    dependencies,
    files: [
      { name: `${id}.${framework.ext}`, lang: framework.lang, target: `${dir}/${id}.${framework.ext}`, code },
      ...(await Promise.all(
        styles.map(async (name) => ({
          name,
          lang: "css",
          target: `${dir}/${name}`,
          code: await readFile(`${root}/src/styles/${name}`, "utf8"),
        })),
      )),
    ],
  }
}

async function writeManifest() {
  const ids = await listExamples()
  const examples = await Promise.all(
    ids.map(async (id) => {
      const entries = await Promise.all(
        frameworks.map(async (framework) => {
          if (!existsSync(examplePath(framework, id))) {
            console.warn(`[compositions] ${id} has no ${framework.label} version`)
            return undefined
          }
          return [framework.id, await readExample(framework, id)]
        }),
      )
      return { id, frameworks: Object.fromEntries(entries.filter(Boolean)) }
    }),
  )

  await mkdir(`${root}/dist`, { recursive: true })
  await writeFile(
    `${root}/dist/manifest.json`,
    `${JSON.stringify({ frameworks: frameworks.map(({ id, label }) => ({ id, label })), examples }, null, 2)}\n`,
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

const ids = await writeManifest()

if (watch) watchFiles(`${root}/src`, { recursive: true }, () => writeManifest())

await Promise.all(
  frameworks.map((framework) =>
    build({
      root,
      configFile: false,
      logLevel: "warn",
      plugins: [examplesModule(framework, ids), ...(framework.plugins?.() ?? [])],
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
