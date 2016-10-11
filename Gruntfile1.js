module.exports = function(grunt) {

    // 1. Вся настройка находится здесь
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        watch: {
            options: {
                livereload: true
            },
            concatjs: {
                files: ['bower_components/**/*', 'js/script.js'],
                tasks: ['concat'],
                options: {
                    spawn: false,
                }
            },
            uglifyjs: {
                files: ['js/production.js'],
                tasks: ['uglify'],
                options: {
                    spawn: false,
                }
            },
            less: {
                files: ['less/**/*.less'],
                tasks: ['less'],
                options: {
                    nospawn: true
                }
            },
            prefixstyles: {
                files: ['css/style-noprefix.css'],
                tasks: ['autoprefixer']
            },
            minifystyles: {
                files: ['css/style.css'],
                tasks: ['cssmin']
            },
            copy: {
                files: ['index.html', 'form.html', 'css/style.css', 'css/style.min.css', 'js/production.js', 'js/production.min.js', 'js/form1.js', 'img/*', 'fonts/*', 'img/favicon/*'], // which files to watch
                tasks: ['copy'],
                options: {
                    nospawn: true
                }
            }

        },
        concat: {
            js: {
                src: [
                    'bower_components/es5-shim/es5-shim.min.js',
                    'bower_components/es5-shim/es5-sham.min.js',
                    'bower_components/flexie/dist/flexie.min.js',
                    'bower_components/mustache.js/mustache.min.js',
                    'bower_components/picturefill/dist/picturefill.min.js',
                    'bower_components/respond/dest/respond.min.js',
                    'bower_components/tap/dist/tap.min.js',
                    'bower_components/smoothScroll/smoothscroll.min.js',
                    'js/script.js'
                ],
                dest: 'js/production.js'
            }
        },
        uglify: {
            build: {
                src: 'js/production.js',
                dest: 'js/production.min.js'
            }
        },
        less: {
            development: {
                options: {
                    compress: true,
                    yuicompress: true,
                    optimization: 2
                },
                files: {
                    "css/style-noprefix.css": "less/style.less"
                }
            }
        },
        autoprefixer: {
            dist: {
                files: {
                    'css/style.css': 'css/style-noprefix.css'
                }
            }
        },
        cssmin: {
            dist: {
                files: {
                    'css/style.min.css': 'css/style.css'
                }
            }
        },
        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'img/',
                    src: ['*.{png,jpg,gif,svg}'],
                    dest: 'img/build/'
                }]
            }
        },
        copy: {
            main: {
                files: {
                    'build/index.html': 'index.html',
                    'build/form.html': 'form.html',
                    'build/css/style.css': 'css/style.css',
                    'build/css/style.min.css': 'css/style.min.css',
                    'build/js/production.js': 'js/production.js',
                    'build/js/production.min.js': 'js/production.min.js',
                    'build/': 'img/*.{png,jpg,gif,svg}',
                    'build/': 'img/favicon/*.{png,jpg,gif,svg}',
                    'build/': 'fonts/*.*',
                }
            }
        },




    });

    // 3. Тут мы указываем Grunt, что хотим использовать этот плагин
    require('load-grunt-tasks')(grunt);

    // 4. Указываем, какие задачи выполняются, когда мы вводим «grunt» в терминале
    grunt.registerTask('default', ['concat',
        'uglify',
        'less',
        'autoprefixer',
        'cssmin',
        'copy'
    ]);

};
