

// var gulp = require('gulp');

// 

// sass.compiler = require('node-sass');

// gulp.task('sass', function () {
//   return gulp.src('./css/*.scss')
//     .pipe(sass().on('error', sass.logError))
//     .pipe(gulp.dest('./css'));
// });



// gulp.task('minify-css', () => {
//   return gulp.src('./css/*.css')
//     .pipe(cleanCSS({ compatibility: 'ie8' }))
//     .pipe(gulp.dest('dist'));
// });

// gulp.task('watch', function () {
//   gulp.watch('./css/*.scss', gulp.series('sass'));
// });

const { series, src, dest, watch, parallel } = require('gulp');
let sass = require('gulp-sass');
let cleanCSS = require('gulp-clean-css');
let autoprefixer = require('gulp-autoprefixer');
/**
 * scss 编译
 * @param {*} cb 
 */
function sassTask() {
  return src('./scss/mouse-ui.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(dest('../css/'));
  cb();
}

/**
 * 压缩css
 */
function minifyCss() {
  return src('../css/*.css')
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(dest('../css/'));
}

/**
 * 自动补全各个浏览器的css前缀
 */
function autoprefixerCss() {
  return src('../css/*.css')
    .pipe(autoprefixer({
      cascade: true,
      remove: true
    }))
    .pipe(dest('../css/'));
}

function watchFiles() {
  watch("./scss/mouse-ui.scss", sassTask);
  //watch("../css/*.css", series(autoprefixerCss, minifyCss));
}

exports.build = series(sassTask, minifyCss, autoprefixerCss);
exports.watch = series(watchFiles);