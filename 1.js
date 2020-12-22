import gulp from "gulp";
import browserSync from "browser-sync";

import clean from "./gulpfile.babel.js/tasks/clean";
import buildHTML from "./gulpfile.babel.js/tasks/buildHTML";
import buildHTMLParts from "./gulpfile.babel.js/tasks/buildHTMLParts";
import buildCSS from "./gulpfile.babel.js/tasks/buildCSS";
import buildJS from "./gulpfile.babel.js/tasks/buildJS";
import copyAssets from "./gulpfile.babel.js/tasks/copyAssets";

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