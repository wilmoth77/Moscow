module.exports = function(grunt) {

  // Initialize configuration object
    grunt.initConfig({

    // Define configuration for each task
    less: {
        development: {
            options: {
              compress: true,  // Minification
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
        src: [
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
          //'./assets/js/customizer.js',
          //'./assets/js/navigation.js',
          //'./assets/js/skip-link-focus-fix.js',
          './assets/js/script.js'
        ],
        // Concatenate script.js
        dest: './public/js/script.js',
      },
      js_theme: {
        src: [
          './assets/js/theme.js'
        ],
        // Concatenate theme.js
        dest: './public/js/theme.js',
      },
    },

    uglify: {
      options: {
        mangle: false  // Leaves function and variable names unchanged
      },

      script: {
        files: {
          // Minifies  script.js 
          './public/js/script.min.js': './public/js/script.js',
        }
      },
      theme: {
        files: {
          // Minifies theme.js
          './public/js/theme.min.js': './public/js/theme.js',
        }
      },
    },

    imagemin: {
      dynamic: {
        files: [{
            expand: true,
            // Compresses all png / jpg / gif images
            cwd: './assets/img/',
            src: ['**/*.{png,jpg,gif}'],
            dest:'./public/assets/img/'
        }]
      }
    },

    watch: {
        js_script: {
          files: [
            // Watched files
            './assets/js/script.js',
            ],   
          tasks: ['concat:js_script','uglify:script'],
          options: {
          livereload: true
          }
        },
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
          files: ['./assets/less/*.less'],  
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

  // Load plugins
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  
  // Compile CSS and Javascript
  grunt.registerTask('compile', ['concat', 'less', 'uglify', 'imagemin']);

  // Set default task
  grunt.registerTask('default', ['watch']);

};