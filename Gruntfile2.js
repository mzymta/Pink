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
                    cmq {
                      style: {
                        files: {
                          "build/css/style.css": ["build/css/style.css"],
                        }
                      }
                    },
                    cssmin {
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
                    csscomb: {
                      style: {
                        expand: true,
                        src: ["source/less/**/*.less"]
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

                  });

        require('load-grunt-tasks')(grunt);

        grunt.registerTask('build', ['csscomb',
          'less',
          'autoprefixer',
          'cmq',
          'cssmin',
          'copy']);
  }
