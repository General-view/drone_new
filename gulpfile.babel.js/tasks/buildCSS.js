import gulp from "gulp";
import plumber from "gulp-plumber";
import sass from "gulp-sass";
import rename from "gulp-rename";
import autoPrefixer from "gulp-autoprefixer";
import shorthand from "gulp-shorthand";
import cleanCSS from "gulp-clean-css";
import nodeSass from "node-sass";
import browserSync from "browser-sync";

sass.compiler = nodeSass;

const buildDir = "./build";

exports.buildCSS = function() {
    return gulp.src("src/sass/*.sass")
        .pipe(plumber())
        .pipe(sass({ outputStyle: "compressed" }))
        .pipe(rename(function(path) {
            path.basename = "style";
            path.extname = ".min.css";
        }))
        .pipe(autoPrefixer({ cascade: false }))
        .pipe(shorthand())
        .pipe(cleanCSS())
        .pipe(gulp.dest(buildDir + "/css"))
        .on("end", browserSync.reload);
};