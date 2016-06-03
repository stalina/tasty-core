const gulp = require('gulp');
const jasmine = require('gulp-jasmine');
const istanbul = require('gulp-istanbul');

//prepare file for coverage
gulp.task('pre-test', function () {
        return gulp.src(['app/**/*.js'])
        // Covering files
        .pipe(istanbul())
        // Force `require` to return covered files
        .pipe(istanbul.hookRequire());
    })
    //unit test task
    .task('test', ['pre-test'], function () {
        gulp.src('spec/unit/**/*.spec.js').pipe(jasmine()).pipe(istanbul.writeReports());
    })
    //integration test task
    .task('it', function () {
        gulp.src('spec/it/**/*.spec.js').pipe(jasmine());
    });

gulp.task('default', ['test','it']);



