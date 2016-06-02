const gulp = require('gulp');
const jasmine = require('gulp-jasmine');

gulp.task('test', function () {
        gulp.src('spec/unit/**/*.spec.js').pipe(jasmine());
})
    .task('it', function () {
        gulp.src('spec/it/**/*.spec.js').pipe(jasmine());
    });

gulp.task('default', ['test', 'it']);
