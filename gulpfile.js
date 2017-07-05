'use strict';

const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const mocha = require('gulp-mocha');
const gutil = require('gulp-util');
const eslint = require('gulp-eslint');
const istanbul = require('gulp-istanbul');
const plumber = require('gulp-plumber');
const wait = require('gulp-wait');

const path = {
  SERVER: ['server.js', 'gulpfile.js', './server/*.js'],
  TEST: ['./tests/*.spec.js']
};

const esLintOptions = {
    useEslintrc: true,
    fix: true,
};

gulp.task('lint', () => gulp.src([...path.SERVER, ...path.TEST])
  .pipe(eslint(esLintOptions))
  .pipe(eslint.format())
  .pipe(eslint.results(() => { // Called once for all ESLint results.
  }))
  .pipe(eslint.failAfterError()) //Stop a task/stream if an ESLint error has been reported for any file, but wait for all of them to be processed first.
);

gulp.task('test-coverage', () => {
  gulp.src(['server/getFunFactModule.js'])  // Covering files
  .pipe(istanbul({
    includeUntested: true,
  }))
  .pipe(istanbul.hookRequire())
}); // Force `require` to return covered files


// Mocha test Task
gulp.task('test', ['test-coverage'], () => {

  return gulp.src(path.TEST, { read: false })
  .pipe(plumber())
  .pipe(wait(1500))
  .pipe(mocha({
      reporter: 'mocha-jenkins-reporter',
      reporterOptions: {
          junit_report_name: 'Logistics Tests',
          junit_report_path: 'tests/report/report.xml',
          junit_report_stack: '1',
      },
      timeout: 7000,
  }))
  .on('error', function(err) {
    gutil.log(err.toString());
  })
  // Creating the reports after tests ran
  .pipe(istanbul.writeReports({
      dir: './tests/coverage',
      reporters: ['lcov', 'html', 'text-summary'],
      reportOpts: {
        dir: './tests/coverage',
      },
  }))
  // .pipe(istanbul.enforceThresholds(  { thresholds:  {  global: 80  }  }))
  .once('end', () => {
      process.exit();
  });
});

gulp.task('watch-test', () => {
    gulp.watch(path.TEST, ['mocha']);
});

// Watch task for server
// Watch files for changes
gulp.task('watch', () => {
  gulp.watch([path.SERVER], ['lint']);
});

// Nodemon Tasks
gulp.task('nodemon', () => {
  nodemon({
    script: 'server.js',
    tasks: ['lint-server']
  })
  .on('restart', () => {
    gutil.log('Nodemon restarted!');
  });
});

// Watch task for server
// Watch files for changes
gulp.task('watch', () => {
    gulp.watch([path.SERVER], ['lint']);
});

gulp.task('start', ['lint', 'watch', 'nodemon']);
gulp.task('default', ['start']);
