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

var fs = require("fs");
var babel = require('babelify');
var browserify = require("browserify");

var watchify = require('watchify');
var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var gutil = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');
var assign = require('lodash.assign');

// 编译sass
gulp.task('sass', function () {
    return gulp.src(sassPath)
        .pipe(plumber())
        .pipe(gwatch(sassPath))
        .pipe(sass())
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(minifycss())
        .pipe(livereload())
        .pipe(gulp.dest(cssPathDest));
});
// gulp.task('browserify', function () {
//     return browserify("./jssrc/index.js")
//         .transform("babelify", { presets: ["es2015"] })
//         .bundle()
//         .pipe(livereload())
//         .pipe(fs.createWriteStream("./jssrc/bundle.js"));
// });
// js 压缩
gulp.task("scripts", function () {
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
//

// 在这里添加自定义 browserify 选项
var customOpts = {
  entries: ['./jssrc/index.js'],
  debug: false
};
var opts = assign({}, watchify.args, customOpts);
var b = watchify(browserify(opts));

// 在这里加入变换操作
// 比如： b.transform("babelify", { presets: ["es2015"] });
b.transform("babelify", { presets: ["es2015"] });

gulp.task('js', bundle); // 这样你就可以运行 `gulp js` 来编译文件了
b.on('update', bundle); // 当任何依赖发生改变的时候，运行打包工具
b.on('log', gutil.log); // 输出编译日志到终端

function bundle() {
  return b.bundle()
    // 如果有错误发生，记录这些错误
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source('bundle.js'))
    .pipe(livereload())
    // 可选项，如果你不需要缓存文件内容，就删除
    //.pipe(buffer())
    // 可选项，如果你不需要 sourcemaps，就删除
    //.pipe(sourcemaps.init({loadMaps: true})) // 从 browserify 文件载入 map
       // 在这里将变换操作加入管道
    //.pipe(sourcemaps.write('./')) // 写入 .map 文件
    .pipe(gulp.dest('./jssrc'));
}


gulp.task("default", function () {
    livereload.listen();
    //gulp.run( "sass", "js");
    gulp.run( "sass", "scripts");
    //gulp.watch(scriptsPath, ["scripts"]);
    gulp.watch(sassPath, ["sass"]);
});
