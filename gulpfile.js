import concat from "gulp-concat";
import uglify from "gulp-uglify";
import imagemin from "gulp-imagemin";
import gulp from "gulp";
import sass from "sass";
import gulpsass from "gulp-sass";
import cssnano from "gulp-cssnano";
import cleanCss from "gulp-clean-css"

import webserver from "gulp-webserver";
const scss = gulpsass(sass);

gulp.task("sass", function () {
  return gulp
    .src("src/scss/*.scss")
    .pipe(scss())
    .pipe(cleanCss())
    .pipe(gulp.dest("app/css"));
});
gulp.task("js", function () {
  return gulp
    .src(["src/js/*.js"])
    // .pipe(concat("all.js"))
    .pipe(uglify())
    .pipe(gulp.dest("app/js"));
});
gulp.task("image", function () {
  return gulp.src(["image/"]).pipe(imagemin()).pipe(gulp.dest("app/image"));
});
gulp.task("webserver", () => {
  return gulp.src("app").pipe(
    webserver({
      port: 3000,
      livereload: true,
      open: true,
    })
  );
});
gulp.task("watch", function () {
  gulp.watch("src/scss/*.scss", gulp.series("sass"));
  gulp.watch("src/js/*.js", gulp.series("js"));
});

gulp.task("default", gulp.series("js", "image", "webserver", "watch"));