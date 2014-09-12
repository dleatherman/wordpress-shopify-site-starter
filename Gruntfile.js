module.exports = function(grunt) {
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),
    local_config: grunt.file.readJSON('config.json'),

    bowercopy: {
      options: {
        clean: true
      },
      bootstrap: {
        files: {
          'assets/css/less/bootstrap': 'bootstrap/less',
          'assets/js/lib/bootstrap.js': 'bootstrap/dist/js/bootstrap.js',
          'assets/fonts/bootstrap': 'bootstrap/dist/fonts'
        }
      },
      jquery: {
        files: {
          'assets/js/lib/jquery.js': 'jquery/dist/jquery.js'
        }
      },
      chosen: {
        files: {
          'assets/js/lib/chosen.jquery.js': 'chosen/chosen.jquery.js',
          'assets/img/chosen/chosen-sprite@2x.png': 'chosen/chosen-sprite@2x.png',
          'assets/img/chosen/chosen-sprite.png': 'chosen/chosen-sprite.png',
          'assets/css/less/chosen/bootstrap-chosen.less': 'chosen/bootstrap-chosen.less',
          'assets/css/less/chosen/bootstrap-chosen-variables.less': 'chosen/bootstrap-chosen-variables.less'
        }
      },
      isotope: {
        files: {
          'assets/js/lib/jquery.isotope.min.js': 'isotope/jquery.isotope.min.js'
        }
      }
    },

    copy: {
      css: {
        files: [
          {
            expand: true,
            src: 'assets/css/style.min.css',
            dest: 'shop/assets/',
            flatten: true,
            filter: 'isFile'
          },
          {
            expand: true,
            src: 'assets/css/style.min.css',
            dest: '<%= pkg.themeFolder %>/assets/',
            flatten: true,
            filter: 'isFile'
          }
        ]
      },
      js: {
        files: [
          {
            expand: true,
            src: 'assets/js/dist/app.min.js',
            dest: 'shop/assets/',
            flatten: true,
            filter: 'isFile'
          },
          {
            expand: true,
            src: 'assets/js/dist/app.min.js',
            dest: '<%= pkg.themeFolder %>/assets/',
            flatten: true,
            filter: 'isFile'
          }
        ]
      },
      fonts: {
        files: [
          {
            expand: true,
            src: 'assets/fonts/**/*',
            dest: 'shop/assets/',
            flatten: true,
            filter: 'isFile'
          },
          {
            expand: true,
            src: 'assets/fonts/**/*',
            dest: '<%= pkg.themeFolder %>/assets/',
            flatten: true,
            filter: 'isFile'
          }
        ]
      },
      images: {
        files: [
          {
            expand: true,
            src: 'assets/img/**/*',
            dest: 'shop/assets/',
            flatten: true,
            filter: 'isFile'
          },
          {
            expand: true,
            src: 'assets/img/**/*',
            dest: '<%= pkg.themeFolder %>/assets/',
            flatten: true,
            filter: 'isFile'
          }
        ]
      }
    },

    jshint: {
      files: ['assets/js/src/*.js'],
      options: {
        bitwise: true,
        curly: true,
        eqeqeq: true,
        forin: true,
        freeze: true,
        immed: true,
        indent: 2,
        latedef: true,
        newcap: true,
        noarg: true,
        nonbsp: true,
        plusplus: true,
        quotmark: 'single',
        undef: true,
        strict: true,
        trailing: true,
        globals: {
          console: true,
          module: true,
          document: true,
          window: true
        }
      }
    },

    uglify: {
      site: {
        files: {
          'assets/js/dist/app.min.js': [
            'assets/js/lib/*.js',
            'assets/js/src/*.js'
          ]
        }
      }
    },

    less: {
      production: {
        options: {
          paths: ['css'],
          banner : '/*\nTheme Name: Dev Theme \nTheme URI: siteurl \nAuthor: Author \nAuthor URI: Author Website\n*/'
        },
        files: {
          'assets/css/style.css': 'assets/css/less/style.less'
        }
      }
    },

    cssmin: {
      combine: {
        options: {
          banner : '/*\nProject started with The Wordpress/Shopify starter theme by Dan Leatherman (@danleatherman). \n*/',
          keepSpecialComments: 0,
          report: 'gzip'
        },
        files: {
          'assets/css/style.min.css': ['assets/css/style.css']
        }
      }
    },

    shopify: {
      options: {
        api_key: '<%= local_config.shopify_api_key %>',
        password: '<%= local_config.shopify_api_password %>',
        url: '<%= local_config.shopify_url %>',
        base: 'shop/'
      }
    },

    shopify_theme_settings: {
      settings: {
        options: {},
        files: {
          'shop/config/settings.html': 'settings/*.yml'
        }
      }
    },

    watch: {
      configFiles: {
        files: [ 'Gruntfile.js' ],
        options: {
          reload: true
        }
      },
      theme: {
        files: ['<%= pkg.themeFolder %>/*.php', '<%= pkg.themeFolder %>/views/*.twig']
      },
      img: {
        files: ['assets/img/**'],
        tasks: ['copy:img']
      },
      fonts: {
        files: ['assets/fonts/**/*'],
        tasks: ['copy:fonts']
      },
      less: {
        files: ['assets/css/less/**/*.less'],
        tasks: ['less:production', 'cssmin', 'copy:css']
      },
      uglify: {
        files: ['assets/js/src/*.js', 'assets/js/lib/*.js'],
        tasks: ['uglify:site']
      },
      javascript: {
        files: ['assets/js/src/*.js', 'assets/js/lib/*.js'],
        tasks: ['jshint', 'copy']
      },
      shopify: {
        files: ['shop/**'],
        tasks: ['shopify']
      },
      shopify_settings: {
        files: ['settings/**'],
        tasks: ['shopify_theme_settings']
      },
      options: {
        livereload: true,
      }
    },

    db_dump: {
      'local': {
        'options': {
          'title': 'Local DB',
          'database': '<%= local_config.db_name %>',
          'user': '<%= local_config.username %>',
          'pass': '<%= local_config.password %>',
          'host': '<%= local_config.host %>',
          'site_url': '<%= local_config.site_url %>',
          'backup_to': 'db/local.sql',
          'port': '8889'
        }
      },
    },

    db_import: {
      'local': {
        'options': {
          'title': 'Local DB',
          'database': '<%= local_config.db_name %>',
          'user': '<%= local_config.username %>',
          'pass': '<%= local_config.password %>',
          'host': '<%= local_config.host %>',
          'site_url': '<%= local_config.site_url %>',
          'backup_to': 'db/local.sql',
          'port': '8889'
        }
      }
    }

  });

  grunt.loadNpmTasks('grunt-bowercopy');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-mysql-dump-import');

  grunt.registerTask('build', ['uglify:site', 'less:production', 'cssmin']);
  grunt.registerTask('setup', ['bowercopy', 'build', 'copy']);
  grunt.registerTask('default', ['watch']);
}