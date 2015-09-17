var gulp       = require('gulp'),
    browserify = require('browserify'),
    reactify   = require('reactify'),
    source     = require('vinyl-source-stream');

gulp.task('js', function(){
    browserify('./dev/javascripts/app.jsx')
        .transform(reactify)
        .bundle()
        .pipe(source('app.js'))
        .pipe(gulp.dest('public/javascripts/build'));
});

gulp.watch('./dev/javascripts/*.jsx', ['js']);
gulp.task('default', ['js']);
