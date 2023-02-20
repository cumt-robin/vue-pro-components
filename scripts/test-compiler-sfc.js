import { readFileSync } from "fs"
import { resolve, relative } from "path"
import { parse, compileStyle, compileScript } from "vue/compiler-sfc"
import hash from "hash-sum";

export async function test() {
    const fileName = "test.vue"

    const fileContent = await readFileSync(resolve(__dirname, fileName))

    const { descriptor } = parse(fileContent.toString(), { filename: fileName })

    const styleBlock = descriptor.styles[0]

    const rawShortFilePath = relative(process.cwd(), fileName)
        .replace(/^(\.\.[\/\\])+/, '')
    const shortFilePath = rawShortFilePath.replace(/\\/g, '/')
    const id = hash(shortFilePath)

    const style = compileStyle({ source: styleBlock.content, filename: descriptor.filename, id, scoped: styleBlock.scoped, preprocessLang: styleBlock.lang })

    console.log(style)

    const script = compileScript(descriptor, { id })

    console.log(script)
}

test();