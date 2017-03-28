/* Include gulp */
var gulp = require('gulp');

/* Plugins */
var sass = require('gulp-sass');
var jsmin = require('gulp-jsmin');
var rename = require('gulp-rename');
var browserSync = require('browser-sync').create();

/* Task */
gulp.task('sass', function () {
  gulp.src('assets/css/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(gulp.dest('assets/css'));
});

gulp.task('jsmin', function() {
  gulp.src('assets/js/scripts.js')
  .pipe(jsmin())
  .pipe(rename({suffix: '.min'}))
  .pipe(gulp.dest('assets/js'));
})

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: ''
    },
  });
});

/* Watch */
gulp.task('watch', ['browserSync', 'sass', 'jsmin'], function () {
  gulp.watch('assets/css/**/*.scss', ['sass'], browserSync.reload);
  gulp.watch('assets/js/**/*.js', ['jsmin']);
  gulp.watch('*.html', browserSync.reload);
  gulp.watch('assets/css/**/*.scss', browserSync.reload);
  gulp.watch('assets/js/**/*.js', browserSync.reload);
});

