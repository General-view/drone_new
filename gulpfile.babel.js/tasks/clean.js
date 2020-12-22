import del from "del";

const buildDir = "./build";
const buildCutDir = "./build_cut";

export async function clean() {
    return await del([buildDir, buildCutDir]);
}