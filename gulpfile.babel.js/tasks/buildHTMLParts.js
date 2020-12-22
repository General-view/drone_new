import gulp from "gulp";
import plumber from "gulp-plumber";
import pug from "gulp-pug";
import pugLinter from "gulp-pug-linter";
import beautify from "gulp-beautify";
import browserSync from "browser-sync";

const buildCutDir = "./build_cut";

exports.buildHTMLParts = function() {
    return gulp.src("src/pug/**/*.pug")
        .pipe(plumber())
        .pipe(pug())
        .pipe(beautify.html({ indent_size: 4 }))
        .pipe(gulp.dest(buildCutDir));
};