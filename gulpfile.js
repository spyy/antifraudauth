// npm install gulp gulp-mocha gulp-util gulp-nodemon gulp-stubby-server

var gulp = require('gulp');
var mocha = require('gulp-mocha');
var gutil = require('gulp-util');
var nodemon = require('gulp-nodemon');
var stubby = require('gulp-stubby-server');
var gulp = require('gulp');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');

const fs = require('fs');

gulp.task('watch', function() {
  gulp.watch(['api/**', 'test/**'], ['mocha', 'hint']);
});

gulp.task('mocha', function() {
  return gulp.src(['test/**/*.js'])
    .pipe(mocha({ reporter: 'nyan' }))
    .on('error', gutil.log);
});

gulp.task('hint', function () {
    return gulp.src(['api/**/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter(stylish))
        .on('error', function (error) {
            console.error(String(error));
        });
});
