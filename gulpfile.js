var gulp = require('gulp');
var webpack = require('webpack-stream');
var webpackConfig = require('./webpack.config.js');

gulp.task('build', function() {
  return gulp.src(['./client/assets/js/*.jsx'])
        .pipe(webpack(webpackConfig))
        .pipe(gulp.dest('./client/dist/js/'));
});

gulp.task('build-watch', function() {
  gulp.watch('./client/assets/js/*.jsx', ['build']);
});
