import { rollup } from 'rollup'
import rollupTypescript from '@rollup/plugin-typescript'
import dts from 'rollup-plugin-dts'
import terser from '@rollup/plugin-terser';
import { resolve } from 'path'
import fastGlob from 'fast-glob'
import { dest, parallel, series, src } from 'gulp'
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

    await Promise.all([
        bundle.write({
            name: 'VpUtils',
            format: 'umd',
            file: resolve(UTILS_PATH, 'dist/index.js'),
            sourcemap: true,
        }),
        bundle.write({
            name: 'VpUtils',
            format: 'iife',
            file: resolve(UTILS_PATH, 'dist/index.min.js'),
            plugins: [terser()]
        })
    ])
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

export const copyDts = async () => {
    return src("types/**/*.d.ts", {
        cwd: UTILS_PATH,
    })
        .pipe(dest(resolve(UTILS_PATH, "es")))
        .pipe(dest(resolve(UTILS_PATH, "lib")))
}

export const startBuildUtils = series(
    parallel(buildModules, buildBundle, buildTypes),
    copyDts
)
