var envify = require('envify/custom');

module.exports = function( grunt ) {

	'use strict';
	var banner = '/**\n * <%= pkg.homepage %>\n * Copyright (c) <%= grunt.template.today("yyyy") %>\n * This file is generated automatically. Do not edit.\n */\n';
	// Project configuration
	grunt.initConfig( {

		pkg: grunt.file.readJSON( 'package.json' ),

		addtextdomain: {
			options: {
				textdomain: 'mjj-faq',
			},
			target: {
				files: {
					src: [ '*.php', '**/*.php', '!node_modules/**', '!php-tests/**', '!bin/**' ]
				}
			}
		},
		makepot: {
			target: {
				options: {
					domainPath: '/languages',
					mainFile: 'mjj-faq.php',
					potFilename: 'mjj-faq.pot',
					potHeaders: {
						poedit: true,
						'x-poedit-keywordslist': true
					},
					type: 'wp-plugin',
					updateTimestamp: true
				}
			}
		},
		browserify: {
      		dev: {
        		src: 'js/src/components/*.jsx',
        		dest: 'js/mjj-faq.js',
      		},
      		prod: {
      			src: 'js/src/components/*.jsx',
        		dest: 'js/mjj-faq.js',
        		options: {
        			transform: [envify({
                    	NODE_ENV: 'production'
                  	})]
        		}
      		}
    	},
    	uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			build: {
				expand: true,
				ext: '.min.js',
          		cwd: 'js',
				src: 'mjj-faq.js',
				dest: 'js'
			}
		},
    	sass: {
			build: {
    			files: {
    			  	'css/mjj-faq.css': 'css/scss/mjj-faq.scss'
    			}
			}
		},
		watch: {
			sass: {
				files: ['css/scss/*.scss'],
				tasks: ['sass'],
				options: {
					debounceDelay: 500
				}
			},

			scripts: {
				files: ['js/src/components/*.jsx'],
				tasks: ['browserify:dev'],
				options: {
					debounceDelay: 500
				}
			}
		}
	} );


	grunt.loadNpmTasks( 'grunt-browserify' );
	grunt.loadNpmTasks( 'grunt-contrib-watch' );
	grunt.loadNpmTasks( 'grunt-contrib-sass' );
	grunt.loadNpmTasks( 'grunt-contrib-uglify' );

	grunt.registerTask( 'build', ['browserify:prod', 'uglify', 'sass' ] );

	

	grunt.util.linefeed = '\n';

};
