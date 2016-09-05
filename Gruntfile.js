module.exports = function(grunt) {

    // 1. Вся настройка находится здесь
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concat: {
            js: {
                src: [
                    'js/libs/*.js',
                    'js/script.js'
                ],
                dest: 'js/build/production.js'
            }
        },
        uglify: {
            build: {
                src: 'js/build/production.js',
                dest: 'js/build/production.min.js'
            }
        },
        watch: {
            options: {
                livereload: true
            },
            scripts: {
                files: ['js/*.js'],
                tasks: ['concat', 'uglify'],
                options: {
                    spawn: false,
                }
            },
            styles: {
                files: ['less/**/*.less', 'css/style.css', 'css/build/style.css'], // which files to watch
                tasks: ['less', 'autoprefixer', 'cssmin'],
                options: {
                    nospawn: true
                }
            },
            images: {
            files: ['img/*.{png,jpg,gif,svg}'], // which files to watch
            tasks: ['imagemin'],
            options: {
                nospawn: true
              }
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
                    "css/style.css": "less/style.less"
                }
            }
        },
        autoprefixer: {
            dist: {
                files: {
                    'css/build/style.css': 'css/style.css'
                }
            }
        },
        cssmin: {
            minify: {
                src: 'css/build/style.css',
                dest: 'css/build/style.min.css'
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
        }

    });

    // 3. Тут мы указываем Grunt, что хотим использовать этот плагин
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-imagemin');

    // 4. Указываем, какие задачи выполняются, когда мы вводим «grunt» в терминале
    grunt.registerTask('default', ['concat', 'uglify', 'less', 'autoprefixer', 'cssmin', 'imagemin']);

};
