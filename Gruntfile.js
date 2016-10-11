module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        less: {
            style: {
                files: {
                    "build/css/style.css": ["source/less/style.less"]
                }
            }
        },
        autoprefixer: {
            options: {
                browsers: ["last 2 version", "ie 10"]
            },
            style: {
                src: "build/css/style.css"
            }
        },
        cmq: {
            style: {
                files: {
                    "build/css/style.css": ["build/css/style.css"]
                }
            }
        },
        cssmin: {
            style: {
                options: {
                    keepSpecialComments: 0,
                    report: "gzip"
                },
                files: {
                    "build/css/style.min.css": ["build/css/style.css"],
                }
            }
        },
        copy: {
            build: {
                files: [{
                    expand: true,
                    cwd: "source",
                    src: [
                        "img/**",
                        "js/**",
                        "index.html",
                        "form.html",
                        "fonts/**"
                    ],
                    dest: "build"
                }]
            }
        },
        concat: {
            scripts: {
                src: [
                    'bower_components/es5-shim/es5-shim.min.js',
                    'bower_components/es5-shim/es5-sham.min.js',
                    'bower_components/flexie/dist/flexie.min.js',
                    'bower_components/mustache.js/mustache.min.js',
                    'bower_components/picturefill/dist/picturefill.min.js',
                    'bower_components/respond/dest/respond.min.js',
                    'bower_components/tap/dist/tap.min.js',
                    'bower_components/smooth-scroll/smooth-scroll.min.js',
                    'build/js/script.js'
                ],
                dest: 'build/js/production.js'
            }
        },
        uglify: {
            scripts: {
                src: 'build/js/production.js',
                dest: 'build/js/production.min.js'
            }
        },
        watch: {
            scripts: {
                files: ['source/js/*.js'],
                tasks: ['copy', 'concat', 'uglify'],
                options: {
                    spawn: false,
                },
            },
            style: {
              files: ['source/**/*.less'],
              tasks: ['less',
                  'autoprefixer',
                  'cmq',
                  'cssmin'],
              options: {
                  spawn: false,
              }
            },
            other: {
              files: ['source/*.html', 'source/img/**', 'source/fonts/**'],
              tasks: ['copy'],
              options: {
                  spawn: false,
              }
            }
        }

    });

    require('load-grunt-tasks')(grunt);

    grunt.registerTask('build', ['less',
        'autoprefixer',
        'cmq',
        'cssmin',
        'copy',
        'concat',
        'uglify'
    ]);
}
