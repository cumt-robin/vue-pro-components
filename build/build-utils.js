import { rollup } from 'rollup'
import rollupTypescript from '@rollup/plugin-typescript'
import dts from 'rollup-plugin-dts'
import { resolve } from 'path'
import fastGlob from 'fast-glob'
import { parallel } from 'gulp'
import { UTILS_PATH } from './path'

const getInputs = async (glob = 'src/**/*.ts') => {
    return await fastGlob(glob, {
        cwd: UTILS_PATH,
        absolute: true,
        onlyFiles: true,
        ignore: ['node_modules'],
    })
}

export const buildModules = async () => {
    const input = await getInputs()

    const bundle = await rollup({
        input,
        plugins: [rollupTypescript()],
    })

    await Promise.all([
        bundle.write({
            format: 'esm',
            dir: resolve(UTILS_PATH, 'es'),
            sourcemap: false,
        }),
        bundle.write({
            format: 'cjs',
            dir: resolve(UTILS_PATH, 'lib'),
            sourcemap: false,
        }),
    ])
}

export const buildBundle = async () => {
    const bundle = await rollup({
        input: resolve(UTILS_PATH, 'src/index.ts'),
        plugins: [rollupTypescript()],
    })

    await bundle.write({
        name: 'VpUtils',
        format: 'umd',
        dir: resolve(UTILS_PATH, 'dist'),
        sourcemap: true,
    })
}

export const buildTypes = async () => {
    const input = await getInputs()

    const bundle = await rollup({
        input,
        plugins: [dts()],
    })

    await bundle.write({
        dir: resolve(UTILS_PATH, 'types'),
    })
}

export const startBuildUtils = parallel(buildModules, buildBundle, buildTypes)
