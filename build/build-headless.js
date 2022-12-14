import { rollup } from 'rollup'
import rollupTypescript from '@rollup/plugin-typescript'
import dts from 'rollup-plugin-dts'
import terser from '@rollup/plugin-terser';
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from '@rollup/plugin-commonjs';
import { resolve } from 'path'
import fastGlob from 'fast-glob'
import { dest, parallel, series, src } from 'gulp'
import { HEADLESS_PATH } from './path'
import pkgJson from "../packages/headless/package.json";

const getInputs = async (glob = 'src/**/*.ts') => {
    return await fastGlob(glob, {
        cwd: HEADLESS_PATH,
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
        external: [
            ...Object.keys(pkgJson.dependencies),
            ...Object.keys(pkgJson.peerDependencies)
        ],
    })

    await Promise.all([
        bundle.write({
            format: 'esm',
            dir: resolve(HEADLESS_PATH, 'es'),
            sourcemap: false,
        }),
        bundle.write({
            format: 'cjs',
            dir: resolve(HEADLESS_PATH, 'lib'),
            sourcemap: false,
        }),
    ])
}

export const buildBundle = async () => {
    const bundle = await rollup({
        input: resolve(HEADLESS_PATH, 'src/index.ts'),
        plugins: [rollupTypescript(), nodeResolve(), commonjs()],
        // vue 是运行时框架，最好拆出来
        external: Object.keys(pkgJson.peerDependencies),
    })

    const globals = {
        vue: "Vue",
    }

    await Promise.all([
        bundle.write({
            name: 'VpHeadless',
            format: 'umd',
            file: resolve(HEADLESS_PATH, 'dist/index.js'),
            sourcemap: true,
            globals
        }),
        bundle.write({
            name: 'VpHeadless',
            format: 'iife',
            file: resolve(HEADLESS_PATH, 'dist/index.min.js'),
            sourcemap: false,
            plugins: [terser()],
            globals,
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
        dir: resolve(HEADLESS_PATH, 'types'),
    })
}

export const copyDts = async () => {
    return src("types/**/*.d.ts", {
        cwd: HEADLESS_PATH,
    })
        .pipe(dest(resolve(HEADLESS_PATH, "es")))
        .pipe(dest(resolve(HEADLESS_PATH, "lib")))
}

export const startBuildHeadless = series(
    parallel(buildModules, buildBundle, buildTypes),
    copyDts
)
