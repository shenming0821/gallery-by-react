'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass'); // sass 编译
var uglify = require('gulp-uglify'); // js 压缩
var rename = require('gulp-rename'); // 文件重命名
var minifycss = require('gulp-minify-css'); // css 压缩
var gwatch = require('gulp-watch'); // 监控文件变化
var livereload = require("gulp-livereload"); // chorme 安装livereload 一起使用，按ctrl+s 时自动编译和刷新浏览器
var plumber = require('gulp-plumber'); // 编译less 或者js 时，忽略出错文件，防止wacth 终止
var sassPath = "./sass/*.scss";
var scriptsPath = "./jssrc/*.js";
var cssPathDest = "./css";
var scriptsPahtDest = "./js";

// 编译sass
gulp.task('sass', function() {
    return gulp.src(sassPath)
        .pipe(plumber())
        .pipe(gwatch(sassPath))
        .pipe(sass())
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(minifycss())
        .pipe(gulp.dest(cssPathDest))
        .pipe(livereload());
});
// js 压缩
gulp.task("scripts", function() {
    gulp.src(scriptsPath)
        .pipe(plumber())
        .pipe(gwatch(scriptsPath))
        .pipe(uglify())
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(gulp.dest(scriptsPahtDest))
        .pipe(livereload());
});
gulp.task("default", function() {
    livereload.listen();
    gulp.run("scripts", "sass");
    gulp.watch(scriptsPath, ["scripts"]);
    gulp.watch(sassPath, ["sass"]);
});