import gulp from "gulp";
import browserSync from "browser-sync";

import clean from "./tasks/clean";
import buildHTML from "./tasks/buildHTML";
import buildHTMLParts from "./tasks/buildHTMLParts";
import buildCSS from "./tasks/buildCSS";
import buildJS from "./tasks/buildJS";
import copyAssets from "./tasks/copyAssets";

const buildDir = "./build";

function watch() {
    browserSync.init({
        server: buildDir,
        port: 4000,
        notify: true
    });

    gulp.watch("./src/pug/**/*.pug", gulp.parallel(buildHTML, buildHTMLParts));
    gulp.watch("./src/sass/**/*.(sass|scss|css)", buildCSS);
    gulp.watch("./src/js/**/*.js", buildJS);
    gulp.watch("./src/assets/**/*.*", copyAssets);
}

export const cleanAll = () => clean;

export function build() {
    gulp.series(
        clean, 
        gulp.parallel(
            buildHTML, 
            buildHTMLParts, 
            buildCSS, 
            buildJS, 
            copyAssets
        )
    );
}


export default () => gulp.series(build, watch);