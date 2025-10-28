import gulp from 'gulp';
import * as sass from 'gulp-sass';
import * as dartSass from 'sass';
import concat from 'gulp-concat';
import browserSyncCreator from 'browser-sync';
import uglify from 'gulp-uglify-es';
import autoprefixer from 'gulp-autoprefixer';
import imagemin from 'gulp-imagemin';
import imageminPngquant from 'imagemin-pngquant';
import imageminMozjpeg from 'imagemin-mozjpeg';
import imageminGifsicle from 'imagemin-gifsicle';
import del from 'del';
import ghPages from 'gulp-gh-pages';

const { src, dest, watch, parallel, series } = gulp;
const scss = sass.default(dartSass.default);
const browserSync = browserSyncCreator.create();

const Uglify = uglify.default;

gulp.task('deploy', function () {
  return gulp.src('./dist/**/*')
    .pipe(ghPages({
      force: true
    }));
});

function browsersync() {
  browserSync.init({
    server: {
      baseDir: 'app/'
    }
  });
}
export function cleanDist() {
  return del('dist');
}

export function images() {
  return src('app/images/**/*')
    .pipe(imagemin([
      imageminMozjpeg({ quality: 80 }),
      imageminPngquant({ speed: 4 }),
      imageminGifsicle({ interlaced: true }),
      imagemin.svgo({
        plugins: [
          { removeViewBox: false },
          { cleanupIDs: false }
        ]
      }),
    ]))
    .pipe(dest('dist/images'))
}

export function scripts() {
  return src([
    'node_modules/jquery/dist/jquery.js',
    'node_modules/slick-carousel/slick/slick.js',
    'node_modules/mixitup/dist/mixitup.js',
    'node_modules/@fancyapps/fancybox/dist/jquery.fancybox.js',
    'app/js/main.js'

  ])
    .pipe(concat('main.min.js'))
    .pipe(Uglify())
    .pipe(dest('app/js'))
    .pipe(browserSync.stream())
}

export function styles() {
  return src('app/scss/style.scss')
    .pipe(scss({ outputStyle: 'compressed' }))
    .pipe(concat('style.min.css'))
    .pipe(autoprefixer({
      overrideBrowserslist: ['last 10 version'],
      grid: true
    }))
    .pipe(dest('dist/css'))
    .pipe(browserSync.stream())
}

export function build_files() {
  return src([
    'app/fonts/**/*',
    'app/js/main.min.js',
    'app/*.html'
  ], { base: 'app' })
    .pipe(dest('dist'))
}

export function watching() {
  watch(['app/scss/**/*.scss'], styles);
  watch(['app/js/**/*.js', '!app/js/main.min.js'], scripts);
  watch(['app/*.html']).on('change', browserSync.reload);
}

export const build = series(
  cleanDist,
  parallel(styles, scripts, images),
  build_files);

export default parallel(styles, browsersync, watching, scripts);