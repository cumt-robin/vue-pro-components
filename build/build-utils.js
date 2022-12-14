import { rollup } from 'rollup'
import rollupTypescript from '@rollup/plugin-typescript'
import dts from 'rollup-plugin-dts'
import terser from '@rollup/plugin-terser';
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from '@rollup/plugin-commonjs';
import { resolve } from 'path'
import fastGlob from 'fast-glob'
import { dest, parallel, series, src } from 'gulp'
import { UTILS_PATH } from './path'
import pkgJson from "../packages/utils/package.json";

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
        plugins: [rollupTypescript(), nodeResolve(), commonjs()],
        external: Object.keys(pkgJson.dependencies),
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
        plugins: [rollupTypescript(), nodeResolve(), commonjs()],
        // 如果你觉得第三方依赖体积很大，也可以用 external 拆出来，让调用方提供对应依赖，此时要配合 globals 一起用
        // external: Object.keys(pkgJson.dependencies),
    })

    // const globals = {
    //     dayjs: "dayjs",
    // }

    await Promise.all([
        bundle.write({
            name: 'VpUtils',
            format: 'umd',
            file: resolve(UTILS_PATH, 'dist/index.js'),
            sourcemap: true,
            // globals
        }),
        bundle.write({
            name: 'VpUtils',
            format: 'iife',
            file: resolve(UTILS_PATH, 'dist/index.min.js'),
            sourcemap: false,
            plugins: [terser()],
            // globals,
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
