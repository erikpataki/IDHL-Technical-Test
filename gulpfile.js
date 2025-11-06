// Import modules
const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const terser = require('gulp-terser');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();

// Paths
const paths = {
  html: 'src/*.html',
  styles: 'src/scss/**/*.scss',
  scripts: 'src/js/**/*.js',
  assets: 'src/assets/**/*',
  dist: 'dist/'
};

// Compile SCSS
function styles() {
  return gulp.src(paths.styles)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanCSS())
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.dist + 'css'))
    .pipe(browserSync.stream());
}

// Minify JS
function scripts() {
  return gulp.src(paths.scripts)
    .pipe(sourcemaps.init())
    .pipe(terser())
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.dist + 'js'))
    .pipe(browserSync.stream());
}

// Copy HTML
function html() {
  return gulp.src(paths.html)
    .pipe(gulp.dest(paths.dist))
    .pipe(browserSync.stream());
}

// Copy static assets
function assets() {
  return gulp.src(paths.assets, { since: gulp.lastRun(assets) })
    .pipe(gulp.dest(paths.dist + 'assets'))
    .pipe(browserSync.stream());
}

// Watch files
function watchFiles() { 
  browserSync.init({
    server: { baseDir: './dist' },
    notify: false,
    open: false
  });
  gulp.watch(paths.styles, styles);
  gulp.watch(paths.scripts, scripts);
  gulp.watch(paths.html, html);
  gulp.watch(paths.assets, assets);
}

const build = gulp.parallel(styles, scripts, html, assets);

// Default task
exports.assets = assets;
exports.build = build;
exports.default = gulp.series(build, watchFiles);
