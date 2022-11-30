import { series, src } from "gulp";
import clean from "gulp-clean";
import { startBuildUtils } from "./build/build-utils";
import { UTILS_PATH } from "./build/path";

const ARTIFACTS_DIRS = ["dist", "es", "lib", "types"]

function cleanDir(dir = "dist", options = {}) {
    return src(dir, { allowEmpty: true, ...options }).pipe(clean({ force: true }))
}

export const cleanUtils = cleanDir.bind(null, ARTIFACTS_DIRS, { cwd: UTILS_PATH })

export const buildUtils = series(cleanUtils, startBuildUtils);