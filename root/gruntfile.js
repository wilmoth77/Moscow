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

     // Define configuration for each task
    less: {
        development: {
            options: {
              compress: true,  // Minification
              sourceMap: true,
              sourceMapFilename: 'public/css/base.css.map',
              sourceMapRootpath: '/wp-content/themes/{%= title %}/'
              sourceMapURL: '/wp-content/themes/{%= title %}/public/css/base.css.map'
            },
            files: {
              // Compile base.less into base.min.css
              "./public/css/base.min.css":"./assets/less/base.less",
            }
        }
    },
    
    concat: {
      options: {
        separator: ';',
      },
      js_script: {
        src: [jsFileList],
        // Concatenate script.js
        dest: './public/js/script.js',
      },
    },
    uglify: {
        options: {
            mangle: false  // Leaves function and variable names unchanged
      },
      dist: {
        script: {
        files: {
          './public/js/script.min.js': [jsFileList]
        }
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
    dist: {
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
            // Compresses all png / jpg / gif / ico images
            cwd: './assets/img/',
            src: ['**/*.{png,jpg,gif,ico}'],
            dest:'./public/img/'
        }]
      }
    },

    watch: {
        js_theme: {
          files: [
            // Watched files
            './assets/js/theme.js',
            ],   
          tasks: ['concat:js_theme','uglify:theme'],
          options: {
          livereload: true
          }
        },
        less: {
          // Watched files
          files: [
          '/assets/less/*.less',
          'assets/less/**/*.less'
          ],
          tasks: ['less'],
          options: {
          livereload: true
          }
        },
        images: {
          // Watched files
          files: ['./assets/img/**/*.{png,jpg,gif}'], 
          tasks: ['imagemin'],
          options: {
          livereload: true
          }
        },
        html: {
          // Watch php for changes
          files: ['**/*.php'],
          tasks: [],
          options: {
          livereload: true
          }
        }
      }

});
 // Compile tasks
    grunt.registerTask('compile', ['concat', 'less', 'uglify', 'imagemin', 'modernizr', 'jshint']);
 // Set default task
    grunt.registerTask('default', ['watch']);
};