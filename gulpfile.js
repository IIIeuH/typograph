var gulp         = require('gulp'),
    cleanCss     = require('gulp-cssnano'),
    del          = require('del'),
    concatCss    = require('gulp-concat-css'),
    uglify       = require('gulp-uglify'),
    concat       = require('gulp-concat'),
    imagemin     = require('gulp-imagemin'),
    pngquant     = require('imagemin-pngquant'),
    cache        = require('gulp-cache'),
    buble        = require('gulp-buble'),
    autoprefixer = require('gulp-autoprefixer');


gulp.task('concatCss', function(){
    return [gulp.src(['public/stylesheets/**/*.css'])
        .pipe(concatCss('bundleMain.min.css'))
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
        .pipe(cleanCss())
        .pipe(gulp.dest('public/app/css/')) ,
    gulp.src([
        'bower_components/animate/*.css',
        'bower_components/bootstrap/dist/css/bootstrap.min.css',
        'bower_components/bootstrap-material-design/dist/css/bootstrap-material-design.min.css',
        'bower_components/bootstrap-material-design/dist/css/ripples.min.css',
        'bower_components/select2/dist/css/select2.min.css',
        'bower_components/font-awesome/css/font-awesome.min.css',
        'bower_components/snackbar/dist/snackbar.min.css'
    ])
        .pipe(concatCss('bundleOther.min.css'))
        .pipe(cleanCss())
        .pipe(gulp.dest('public/app/css/'))];
});


gulp.task('clean', function(){
    return del.sync(['public/app/css/*.css', 'public/app/js/*.js', 'public/dist/css/*.css', 'public/dist/js/*.js']);
});

gulp.task('scriptOther', function(){
    return gulp.src([
            'bower_components/jquery/dist/jquery.min.js',
            'bower_components/bootstrap/dist/js/bootstrap.min.js',
            'bower_components/bootstrap-material-design/dist/js/material.min.js',
            'bower_components/bootstrap-material-design/dist/js/ripples.min.js',
            'bower_components/select2/dist/js/select2.full.min.js',
            'bower_components/jquery.maskedinput.min.js',
            'bower_components/snackbar/dist/snackbar.min.js',
            'node_modules/moment/min/moment.min.js'
    ])
        .pipe(concat('other.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('public/app/js/'));
});

gulp.task('script', function(){
    return gulp.src([
            'public/javascripts/*.js'])
        .pipe(concat('main.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('public/app/js/'));
});


gulp.task('img', function() {
    return gulp.src('public/images/**/*')
        .pipe(cache(imagemin({
            interlaced: true,
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        })))
        .pipe(gulp.dest('public/dist/img'));
});

gulp.task('watch', function(){
    gulp.watch('public/stylesheets/**/*.css', ['concatCss']);
    gulp.watch('public/javascripts/**/*.js', ['script']);
});


gulp.task('build', ['clean', 'concatCss', 'scriptOther' ,'script', 'img'], function(){
    var buildCss = gulp.src('public/app/css/*.css')
        .pipe(gulp.dest('public/dist/css/'));
    var buildJs = gulp.src('public/app/js/*.js')
        .pipe(gulp.dest('public/dist/js/'));
    var buildFonts = gulp.src('public/fonts/**/*')
        .pipe(gulp.dest('public/dist/fonts/'));
});