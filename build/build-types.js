import { rollup } from 'rollup'
import dts from 'rollup-plugin-dts'
import fastGlob from 'fast-glob'
import { resolve } from 'path'
import { TYPES_PATH } from './path'

const getInputs = async (glob = 'src/**/*.ts') => {
    return await fastGlob(glob, {
        cwd: TYPES_PATH,
        absolute: true,
        onlyFiles: true,
        ignore: ['node_modules'],
    })
}

export const buildTypes = async () => {
    const input = await getInputs()

    const bundle = await rollup({
        input,
        plugins: [dts()],
    })

    await bundle.write({
        dir: resolve(TYPES_PATH, 'types'),
    })
}

export const startBuildTypes = buildTypes