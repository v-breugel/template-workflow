var gulp = require('gulp');
var htmlmin = require("gulp-htmlmin");
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var uglify = require('gulp-uglify');
var argv = require('yargs').argv;

// buildfolder of the client
var buildDest = 'clients/' + argv.client + '/build';

gulp.task('html', function () {
    gulp.src('clients/' + argv.client + '/html/*.html')
        .pipe(htmlmin())
        .pipe(gulp.dest(buildDest));
});

gulp.task('js', function () {
    gulp.src('clients/' + argv.client + '/js/*.js')
        .pipe(uglify({
            mangle: false
        }))
        .pipe(gulp.dest(buildDest));
});

gulp.task('sass', function () {
    return gulp.src('clients/' + argv.client + '/scss/*.scss')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(gulp.dest(buildDest));
});

gulp.task('build', ['html', 'sass', 'js']);

// watch all clients files except the build files
gulp.task('watch', function() {
    gulp.watch(['clients/' + argv.client + '/**/*', '!clients/' + argv.client + '/build/*'] , ['build']);
});
