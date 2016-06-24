var gulp = require('gulp'),
	sass = require('gulp-sass'), // sass 编译
	uglify = require('gulp-uglify'), // js 压缩
	rename = require('gulp-rename'), // 文件重命名
	gwatch = require('gulp-watch'), // 监控文件变化
	livereload = require("gulp-livereload"), // chorme 安装livereload 一起使用，按ctrl+s 时自动编译和刷新浏览器
	plumber = require('gulp-plumber'), // sass 或者js 时，忽略出错文件，防止wacth 终止
	rev = require('gulp-rev'),
	revCollector = require('gulp-rev-collector');


// gulp.task('base64', function() {
// 	return gulp.src('./img/*')
// 		.pipe(sprite({
// 			base64: false,
// 			name: 'sprite',
// 			margin: 4,
// 			cssPath: './icon',
// 			style: '_base64.scss',
// 			processor: 'scss'
// 		}))
// 		.pipe(gulp.dest('./dist/scss/'));
// });


gulp.task('sass', function() {

	return gulp.src('./src/scss/**/*.scss')
		.pipe(sass({
			outputStyle: 'compressed'
		}).on('error', sass.logError))
		.pipe(rename({
			suffix: ".min"
		}))
		.pipe(gulp.dest('./src/css'))
		.pipe(livereload());
});
// gulp.task('sass:watch', function() {
// 	gulp.watch('./src/scss/**/*.scss', ['sass'])

// });
// gulp.task('css', ['sass'], function() {
// 	return gulp.src('./src/css/**/*.css')
// 		.pipe(rev())
// 		.pipe(gulp.dest('dist/css'))
// 		.pipe(rev.manifest())
// 		.pipe(gulp.dest('./src/rev/css'))
// 		.pipe(livereload());
// });

// gulp.task('rev', ['css'], function() {
// 	return gulp.src(['./src/rev/css/*.json', './src/*.html'])
// 		.pipe(revCollector({
// 			replaceReved: true
// 		}))
// 		.pipe(gulp.dest('dist'))
// 		.pipe(livereload());
// });
// js 压缩
// gulp.task("scripts", function() {
// 	gulp.src(scriptsPath)
// 		.pipe(plumber())
// 		.pipe(gwatch(scriptsPath))
// 		.pipe(babel({
// 			presets: ['es2015']
// 		}))
// 		.pipe(jsx({
// 			factory: 'React.createClass'
// 		}))
// 		// .pipe(uglify())
// 		.pipe(rename({
// 			suffix: ".min"
// 		}))
// 		.pipe(gulp.dest(scriptsPahtDest))
// 		.pipe(livereload());
// });
gulp.task("default", function() {
	livereload.listen();
	gulp.run("sass");

	gulp.watch(['src/**']).on('change', function(file) {
		gulp.run("sass");
	});


});