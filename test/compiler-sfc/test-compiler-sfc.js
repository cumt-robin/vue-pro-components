import { readFileSync } from "fs"
import { resolve, relative } from "path"
import { parse, compileStyle, compileScript, compileTemplate } from "vue/compiler-sfc"
import hash from "hash-sum";

function compileStyleBlock(styleBlock, descriptor) {
    return compileStyle({ source: styleBlock.content, filename: descriptor.filename, id: descriptor.id, scoped: styleBlock.scoped, preprocessLang: styleBlock.lang })
}

export async function test() {
    const fileName = "test.vue"

    const filePath = resolve(__dirname, fileName)

    const fileContent = await readFileSync(filePath)

    const { descriptor } = parse(fileContent.toString(), { filename: fileName })

    const rawShortFilePath = relative(process.cwd(), filePath)
        .replace(/^(\.\.[\/\\])+/, '')
    const shortFilePath = rawShortFilePath.replace(/\\/g, '/')

    const id = hash(shortFilePath)

    descriptor.id = id;

    const styles = descriptor.styles.map(block => compileStyleBlock(block, descriptor))

    console.log(styles)

    const script = compileScript(descriptor, { id })

    console.log(script)

    const hasScoped = descriptor.styles.some((s) => s.scoped);

    const template = compileTemplate({ source: descriptor.template.content, filename: descriptor.filename, id, scoped: hasScoped, slotted: descriptor.slotted })

    console.log(template)
}

test();