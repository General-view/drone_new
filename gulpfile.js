const gulp = require("gulp");
const plumber = require("gulp-plumber");
const pug = require("gulp-pug");
const pugLinter = require("gulp-pug-linter");
const beautify = require("gulp-beautify");
const sass = require("gulp-sass");
const rename = require("gulp-rename");
const autoPrefixer = require("gulp-autoprefixer");
const shorthand = require("gulp-shorthand");
const cleanCSS = require("gulp-clean-css");
const webpack = require("webpack-stream");
const browserSync = require("browser-sync").create();
const del = require("del");

const build = "./build";
const buildCut = "./build_cut";

sass.compiler = require('node-sass');

// Delete build directories
gulp.task("clean", async function() {
    return await del([buildCut, build]);  
});

// Compile PUG into holistic HTML pages
gulp.task('build-html', function() {
    return gulp.src("src/pug/*.pug")
        .pipe(plumber())
        .pipe(pugLinter({ reporter: "default" }))
        .pipe(pug())
        .pipe(beautify.html({ indent_size: 4 }))
        .pipe(gulp.dest(build))
        .pipe(browserSync.stream());
});

// Compile PUG into HTML modules, for further back-side assemble
gulp.task("build-html-parts", function() {
    return gulp.src("src/pug/**/*.pug")
        .pipe(plumber())
        .pipe(pug())
        .pipe(beautify.html({ indent_size: 4 }))
        .pipe(gulp.dest(buildCut));
});

// Compile SASS into CSS
gulp.task("build-css", function() {
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
        .pipe(gulp.dest(build + "/css"))
        .on("end", browserSync.reload);
});

// Cope ASSETS folder
gulp.task("copy-assets", function() {
    return gulp.src("./src/assets/**/*.*")
        .pipe(plumber())
        .pipe(gulp.dest(build + "/assets"))
        .on("end", browserSync.reload);
});

// Use webpack to bundle JS file
gulp.task("build-js", function() {
    return gulp.src("./src/js/script.js")
        .pipe(plumber())
        .pipe(webpack({
            mode: "production",
            output: {
                filename: "script.js"
            },
            watch: false,
            devtool: "source-map",
            module: {
                rules: [
                    {
                        test: /\.m?js$/,
                        exclude: /(node_modules|bower_components)/,
                        use: {
                            loader: "babel-loader",
                            options: {
                                presets: [["@babel/preset-env", {
                                    debug: true,
                                    corejs: 3,
                                    useBuiltIns: "usage"
                                }]]
                            }
                        }
                    }
                ]
            }
        }))
        .pipe(gulp.dest(build + "/js"))
        .on("end", browserSync.reload);
});

// Watch changes in dev files and run the server
gulp.task("watch", () => {
    browserSync.init({
        server: build,
        port: 4000,
        notify: true
    });

    gulp.watch("./src/pug/**/*.pug", gulp.parallel("build-html", "build-html-parts"));
    gulp.watch("./src/sass/**/*.(sass|scss|css)", gulp.parallel("build-css"));
    gulp.watch("./src/js/**/*.js", gulp.parallel("build-js"));
    gulp.watch("./src/assets/**/*.*", gulp.parallel("copy-assets"));
});


gulp.task("build", gulp.series("clean", 
    gulp.parallel("build-html", "build-html-parts", "build-css", "build-js", "copy-assets")));

gulp.task("default", gulp.series("build", "watch"));