'use strict';
module.exports = function(grunt) {
  // Load all tasks
  require('load-grunt-tasks')(grunt);
  // Show elapsed time
  require('time-grunt')(grunt);
  
  var jsFileList = [
    './bower_components/bootstrap/js/transition.js',
    './bower_components/bootstrap/js/alert.js',
    './bower_components/bootstrap/js/button.js',
    './bower_components/bootstrap/js/carousel.js',
    './bower_components/bootstrap/js/collapse.js',
    './bower_components/bootstrap/js/dropdown.js',
    './bower_components/bootstrap/js/modal.js',
    './bower_components/bootstrap/js/tooltip.js',
    './bower_components/bootstrap/js/popover.js',
    './bower_components/bootstrap/js/scrollspy.js',
    './bower_components/bootstrap/js/tab.js',         
    './bower_components/bootstrap/js/affix.js',
    './assets/js/plugins/*.js',
    './assets/js/theme.js'
  ];

  // Initialize configuration object
    grunt.initConfig({
  
  // Less tasks
    less: {
        development: {
            files: {
              "./assets/css/wp-login.css":"./assets/less/wp-login.less",
              "./assets/css/base.css":"./assets/less/base.less",
          }
        },
        production: {
            files: {
                "./public/css/wp-login.min.css":"./assets/less/wp-login.less",
                "./public/css/base.min.css":"./assets/less/base.less",
            },
      // Because I ref /public css files while developing, sourceMap is done here
      // Set to false and compile for live site
            options: {
                compress: true,
                sourceMap: true,
                sourceMapFilename: 'assets/css/base.css.map',
                sourceMapRootpath: '/wp-content/themes/{%= title %}/',
                sourceMapURL: '/wp-content/themes/{%= title %}/assets/css/base.css.map'
            },
            plugins: [
                new (require('less-plugin-autoprefix'))({browsers: ["> 5%, last 2 versions"]})
              ],
        }
    },
    
  // Concatenate and minify the js
    concat: {
        options: {
          separator: ';',
        },
        development: {
          src: [jsFileList],
          dest: './assets/js/script.js',
        },
      },
      uglify: {
        Production: {
          files: {
            './public/js/script.min.js': './assets/js/script.js',
          }
        }
      },
      jshint: {
        options: {
          jshintrc: '.jshintrc'
        },
        all: [
          'gruntfile.js',
          'assets/js/*.js',
          '!assets/js/script.js',
        ]
    },
    
    modernizr: {
        Production: {
            "devFile" : "./bower_components/modernizr/modernizr.js",
            "outputFile" : "./public/js/modernizr.min.js",
            files: {
              'src': [
                ['./public/js/script.min.js'],
                ['./public/css/main.min.css']
              ]
            },
            "extra" : {
                "shiv" : false,
            },
            "uglify" : true,
            "parseFiles" : true,
        }
    },

    imagemin: {
      dynamic: {
        files: [{
            expand: true,
            cwd: './assets/img/',
            src: ['**/*.{png,jpg,gif,ico}'],
            dest:'./public/img/'
        }]
      }
    },

    watch: {
        js: {
          files: [
            jsFileList,
            '<%= jshint.all %>'
          ],
          tasks: ['jshint', 'concat'],
        },
        less: {
          files: [
          './assets/less/*.less',
          './assets/less/**/*.less'
          ],
          tasks: ['less'],
        },
        images: {
          files: ['./assets/img/**/*.{png,jpg,gif}'], 
          tasks: ['imagemin'],
        },
        html: {
          files: ['**/*.php'],
          tasks: [],
        },
        livereload: {
        options: {
          livereload: true
        },
        files: [
          '**/*.php',
          './assets/css/base.css',
          './assets/js/*.js'
        ]
      }
    },
      
    copy: {
        main: {
          files: [
              {expand: true, 
                  cwd: './bower_components/bootstrap/dist/fonts/', 
                  src: ['*.*'], 
                  dest: './public/fonts'
              },
          ],
        }
    },

});
 // Compile tasks
    grunt.registerTask('compile', ['concat', 'less', 'uglify', 'imagemin', 'modernizr', 'jshint', 'copy']);
 // Set default task
    grunt.registerTask('default', ['watch']);
};