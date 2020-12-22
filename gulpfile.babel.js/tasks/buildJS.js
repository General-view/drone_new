import gulp from "gulp";
import plumber from "gulp-plumber";
import webpack from "webpack-stream";
import browserSync from "browser-sync";

const buildDir = "./build";

exports.buildJS = function() {
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
        .pipe(gulp.dest(buildDir + "/js"))
        .on("end", browserSync.reload);
};