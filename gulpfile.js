"use strict";

var gulp = require("gulp");
var sass = require("gulp-sass");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var concatcss = require('gulp-concat');
var server = require("browser-sync").create();

gulp.task('blocks', function() {
    return gulp.src('source/sass/blocks/**/*.scss')
      .pipe(concatcss("blocks.scss"))
      .pipe(plumber())
      .pipe(gulp.dest('source/sass/'));
});

gulp.task("style", function() {
  gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest("source/css"))
    .pipe(server.stream());
});

gulp.task("serve", ["style"], function() {
  server.init({
    server: "source/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("source/sass/**/*.{scss,sass}", ["blocks","style"]);
  gulp.watch("source/*.html").on("change", server.reload);
});
