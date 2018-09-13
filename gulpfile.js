'use strict';
var gulp        = require('gulp'),
    sass        = require('gulp-sass'),
    browserSync = require('browser-sync'),
    concat      = require('gulp-concat'),
    del         = require('del'),
    imagemin    = require('gulp-imagemin'),
    pngquant    = require('imagemin-pngquant'),
    autoprefixer = require('gulp-autoprefixer');

    // links
var SRC_SASS    = 'app/sass/**/*.scss',
    SRC_CSS     = 'app/css',
    SRC_HTML    = 'app/*.html', 
    SRC_JS      = 'app/js/**/*.js',
    SRC_jQuery  = 'app/libs/jquery/dist/jquery.min.js',
    SRC_BT_JS   = 'app/libs/bootstrap/dist/js/bootstrap.min.js',
    SRC_CAROUSEL   = 'app/libs/owl.carousel/dist/owl.carousel.min.js',
    SRC_LIGHTBOX   = 'app/libs/ekko-lightbox/dist/ekko-lightbox.min.js',
    SRC_POPPER     = 'https://unpkg.com/popper.js/dist/umd/popper.min.js';

    // SASS
gulp.task('sass', function () {
  return gulp.src(SRC_SASS)
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(autoprefixer([ 'last 15 versions', '> 1%', 'ie 8'], { cascade: true } ))
    .pipe(gulp.dest(SRC_CSS))
    .pipe(browserSync.reload({stream:true}))
 });

  // Browser-sync
gulp.task('browser-sync', () => {
  browserSync({
    server: {
      baseDir:  'app'
    },
    notify: false
  });
});

// min size img
gulp.task('img', function(){
  return gulp.src('app/img/**/*')
  .pipe(imagemin({
    interlaced: true,
    progressive: true,
    optimizationLevel: 3,
    svgoPlugins: [{ removeViewBox: false}],
    une: [pngquant()]
  }))
  .pipe(gulp.dest('dist/img'));
});

  // include Font Awesome
gulp.task('fontAwesome', function() {
  var font = gulp.src('./app/libs/font-awesome/font/**.*')
      .pipe(gulp.dest('./app/fonts/fontawesome'));
  var css = gulp.src('./app/libs/font-awesome/css/font-awesome.css')
      .pipe(gulp.dest('./app/sass'));
});

  //Owl Carousel .css
gulp.task('slider', function(){
  gulp.src('./app/libs/owl.carousel/dist/assets/owl.carousel.min.css')
  .pipe(gulp.dest('./app/sass'));
});

//Bootstrap lightbox .css
gulp.task('lightbox', function(){
  gulp.src('./app/libs/ekko-lightbox/dist/ekko-lightbox.css')
  .pipe(gulp.dest('./app/sass'));
});

  // transform scripts
gulp.task('scripts', function(){
  return gulp.src([
    SRC_jQuery,
    SRC_CAROUSEL,
    SRC_POPPER,
    SRC_BT_JS,
    SRC_LIGHTBOX
  ])
  .pipe(concat('libs.min.js'))
  .pipe(gulp.dest('app/js'));
});
 
  // Method WATCH
gulp.task('default', ['browser-sync', 'sass', 'scripts'], function () {
  gulp.watch(SRC_SASS, ['sass']);
  gulp.watch(SRC_HTML, browserSync.reload);
  gulp.watch(SRC_JS, browserSync.reload);
});

  // clean
gulp.task('clean', function() {
  return del.sync('dist');
});

  // build
gulp.task('build',['clean', 'img', 'sass', 'scripts'], function(){
  var bildCSS = gulp.src([
    'app/css/style.css',
    'app/css/libs.css'
  ])
  .pipe(gulp.dest('dist/css'));

  var bildFonts = gulp.src('app/fonts/**/*')
  .pipe(gulp.dest('dist/fonts'));

  var bildJs = gulp.src('app/js/**/*')
  .pipe(gulp.dest('dist/js'));

  var bildHtml = gulp.src('app/*.html')
  .pipe(gulp.dest('dist'));
});
