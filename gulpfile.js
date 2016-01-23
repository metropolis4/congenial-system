var gulp       = require('gulp'),
    browserify = require('browserify'),
    reactify   = require('reactify'),
    $          = require('gulp-load-plugins')(),
    source     = require('vinyl-source-stream');

gulp.task('jsx', function(){
    log("concatenating jsx components...")
    gulp.src('dev/components/**/*.jsx')
        .pipe($.concat('build.jsx'))
        .pipe(gulp.dest('dev/build/'));
});

gulp.task('js', ['jsx'], function(){
    log("Transpiling jsx to js...")
    browserify('./dev/build/build.jsx')
        .transform(reactify)
        .bundle()
        .pipe(source('app.js'))
        .pipe(gulp.dest('public/components'));
});

gulp.task('css', function() {
    log("Compiling CSS...")
    gulp.src('dev/components/**/*.css')
        .pipe($.concat('main.css'))
        .pipe(gulp.dest('public/styles'))
});

gulp.watch('./dev/components/**/*.jsx', ['js']);
gulp.watch('./dev/components/**/*.css', ['css'])
gulp.task('default', ['jsx', 'js', 'css']);

function log(message) {
    $.util.log( $.util.colors.blue(message));
};