var gulp = require('gulp');
var htmlmin = require("gulp-htmlmin");
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var uglify = require('gulp-uglify');
var argv = require('yargs').argv;

/*
    Get files to be build from client
*/

// buildfolder of the client
var buildDest = 'clients/' + argv.client + '/build';

// get build files config from client
var buildFiles = require('./clients/' + argv.client + '/gulp-config.json');

// create list of scss files to be build.
var scssFiles = buildFiles.scssFiles;
for(var i = 0; i < scssFiles.length; i++ ) {
    scssFiles[i] = './clients/' + argv.client + '/scss/' + scssFiles[i];
}

// create list of js files to be build.
var jsFiles = buildFiles.jsFiles;
for(var i = 0; i < scssFiles.length; i++ ) {
    jsFiles[i] = './clients/' + argv.client + '/js/' + jsFiles[i];
}

// create list of html files to be build.
var htmlFiles = buildFiles.htmlFiles;
for(var i = 0; i < scssFiles.length; i++ ) {
    htmlFiles[i] = './clients/' + argv.client + '/html/' + htmlFiles[i];
}

/*
    Tasks
*/

gulp.task('html', function () {
    gulp.src(htmlFiles)
        .pipe(htmlmin())
        .pipe(gulp.dest(buildDest));
});

gulp.task('js', function () {
    gulp.src(jsFiles)
        .pipe(uglify({
            mangle: false
        }))
        .pipe(gulp.dest(buildDest));
});

gulp.task('sass', function () {
    return gulp.src(scssFiles)
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(gulp.dest(buildDest));
});

gulp.task('build', ['html', 'sass', 'js']);

// watch all clients files except the build files
// example usage: gulp watch --client velux
gulp.task('watch', function() {
    gulp.watch(['clients/' + argv.client + '/**/*', '!clients/' + argv.client + '/build/*'] , ['build']);
});
