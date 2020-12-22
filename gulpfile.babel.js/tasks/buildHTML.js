import gulp from "gulp";
import plumber from "gulp-plumber";
import pug from "gulp-pug";
import pugLinter from "gulp-pug-linter";
import beautify from "gulp-beautify";
import browserSync from "browser-sync";

const buildDir = "./build";

exports.buildHTML = function() {
    return gulp.src("src/pug/*.pug")
        .pipe(plumber())
        .pipe(pugLinter({ reporter: "default" }))
        .pipe(pug())
        .pipe(beautify.html({ indent_size: 4 }))
        .pipe(gulp.dest(buildDir))
        .pipe(browserSync.stream());
};