import { series, src } from "gulp";
import clean from "gulp-clean";
import { startBuildHeadless } from "./build/build-headless";
import { startBuildTypes } from "./build/build-types";
import { startBuildUtils } from "./build/build-utils";
import { UTILS_PATH, HEADLESS_PATH, TYPES_PATH } from "./build/path";

const ARTIFACTS_DIRS = ["dist", "es", "lib", "types"]

function cleanDir(dir = "dist", options = {}) {
    return src(dir, { allowEmpty: true, ...options }).pipe(clean({ force: true }))
}

export const cleanUtils = cleanDir.bind(null, ARTIFACTS_DIRS, { cwd: UTILS_PATH })

export const cleanHeadless = cleanDir.bind(null, ARTIFACTS_DIRS, { cwd: HEADLESS_PATH })

export const cleanTypes = cleanDir.bind(null, ['types'], { cwd: TYPES_PATH })

export const buildUtils = series(cleanUtils, startBuildUtils);

export const buildHeadless = series(cleanHeadless, startBuildHeadless);

export const buildTypes = series(cleanTypes, startBuildTypes);

// 根据依赖关系确定顺序
export const buildBatch = series(
    buildTypes,
    buildUtils,
    buildHeadless
)