import gulp from "gulp";
import plumber from "gulp-plumber";
import browserSync from "browser-sync";

const buildDir = "./build";

exports.copyAssets = function() {
    return gulp.src("./src/assets/**/*.*")
        .pipe(plumber())
        .pipe(gulp.dest(buildDir + "/assets"))
        .on("end", browserSync.reload);
};