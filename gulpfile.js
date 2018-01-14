'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
const gutil = require('gulp-util');

gulp.task('scripts', function() {
    browserify({
        entries: './js/fetch-data.js',
        debug: true
    })
        .transform(babelify)
        .on('error',gutil.log)
        .bundle()
        .on('error',gutil.log)
        .pipe(source('js/app.js'))
        .pipe(gulp.dest(''));
});

gulp.task('scss', function () {
    return gulp.src('./scss/styles.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 4 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('./css'));
});

gulp.task('watch', function () {
    gulp.watch('./scss/**/*.scss', ['scss']);
});