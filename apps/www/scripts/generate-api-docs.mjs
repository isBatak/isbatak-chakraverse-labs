import { writeFile } from "node:fs/promises"
import { fileURLToPath } from "node:url"
import ts from "typescript"

const machines = {
  "wheel-picker": {
    file: "../../../packages/zag/wheel-picker/src/wheel-picker.types.ts",
    context: "WheelPickerProps",
    api: "WheelPickerApi",
  },
}

const outFile = fileURLToPath(new URL("../data/api.json", import.meta.url))

const files = Object.values(machines).map(({ file }) => fileURLToPath(new URL(file, import.meta.url)))
const program = ts.createProgram(files, {
  strict: true,
  exactOptionalPropertyTypes: true,
  module: ts.ModuleKind.ESNext,
  moduleResolution: ts.ModuleResolutionKind.Bundler,
  target: ts.ScriptTarget.ESNext,
  skipLibCheck: true,
  noEmit: true,
})
const checker = program.getTypeChecker()

function getInterface(sourceFile, name) {
  const node = sourceFile.statements.find(
    (statement) => ts.isInterfaceDeclaration(statement) && statement.name.text === name,
  )
  if (!node) throw new Error(`Interface ${name} not found in ${sourceFile.fileName}`)
  return checker.getTypeAtLocation(node)
}

function getTypeText(symbol, declaration) {
  if (declaration.type) return declaration.type.getText().replace(/\s+/g, " ")
  return checker.typeToString(
    checker.getTypeOfSymbolAtLocation(symbol, declaration),
    undefined,
    ts.TypeFormatFlags.NoTruncation,
  )
}

function getMembers(type, filter = () => true) {
  const members = {}
  for (const symbol of checker.getPropertiesOfType(type)) {
    const name = symbol.getName()
    const declaration = symbol.valueDeclaration ?? symbol.declarations?.[0]
    if (!declaration || !filter(name)) continue

    const member = {
      type: getTypeText(symbol, declaration),
      description: ts.displayPartsToString(symbol.getDocumentationComment(checker)).trim(),
    }
    const defaultTag = symbol.getJsDocTags(checker).find((tag) => tag.name === "default")
    if (defaultTag?.text) member.defaultValue = ts.displayPartsToString(defaultTag.text).trim()

    members[name] = member
  }
  return members
}

const data = {}
for (const [name, machine] of Object.entries(machines)) {
  const sourceFile = program.getSourceFile(fileURLToPath(new URL(machine.file, import.meta.url)))
  data[name] = {
    api: getMembers(getInterface(sourceFile, machine.api), (member) => !/^get\w+Props$/.test(member)),
    context: getMembers(getInterface(sourceFile, machine.context)),
  }
}

await writeFile(outFile, `${JSON.stringify(data, null, 2)}\n`)
