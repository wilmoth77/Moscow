/**
 * bootstrap_s
 * https://github.com/4digits/bootstrap_s
 *
 * Licensed under the MIT License
 */

'use strict';

// Basic template description
exports.description = 'Create a WordPress theme based on Bootstrap and Underscores.';

// Template-specific notes to be displayed before question prompts.
exports.notes = 'In order to rename all prefixes in the Underscores template, please give your theme a new name.';

// Template-specific notes to be displayed after the question prompts.
exports.after = 'Your template is complete! Please run `npm install`, `bower install` and then `grunt compile` to set up all dependencies and Bootstrap.';

// Any existing file or directory matching this wildcard will cause a warning.
exports.warnOn = '*';

// The actual init template
exports.template = function (grunt, init, done) {
	init.process({}, [
		// Prompt for these values.
		init.prompt('title', 'bootstrap_s'),
		{
			name   : 'prefix',
			message: 'PHP function prefix (alpha and underscore characters only)',
			default: 'bootstrap_s'
		},
	], function( err, props ) {
		props.keywords = [];
		props.version = '1.0.0';
		props.devDependencies = {
			"grunt": "latest",
                "load-grunt-tasks": "latest",
                "time-grunt": "latest",
                "grunt-contrib-concat": "latest",
    		"grunt-contrib-less": "latest",
    		"grunt-contrib-uglify": "latest",
    		"grunt-contrib-imagemin": "latest",
    		"grunt-contrib-watch": "latest",
                "grunt-modernizr": "latest",
                "grunt-contrib-jshint": "latest"
		}; 

		// Sanitize names where we need to for PHP/JS
		props.name = props.title.replace(/\s+/g, '-').toLowerCase();
		// Theme language
		props.language = props.title.replace('/[^a-z_]/i', '').replace(/ /g, '').toLowerCase();
		// Development prefix (i.e. to prefix PHP function names, variables)
		props.prefix = props.prefix.replace('/[^a-z_]/i', '').toLowerCase();
		// Development prefix in all caps (e.g. for constants)
		props.prefix_caps = props.prefix.toUpperCase();
		// An additional value, safe to use as a JavaScript identifier.
		props.js_safe_name = props.name.replace(/[\W_]+/g, '_').replace(/^(\d)/, '_$1');
		// An additional value that won't conflict with NodeUnit unit tests.
		props.js_test_safe_name = props.js_safe_name === 'test' ? 'myTest' : props.js_safe_name;
		props.js_safe_name_caps = props.js_safe_name.toUpperCase();

		// Files to copy and process
		var files = init.filesToCopy( props );

		console.log( files );

		// Actually copy and process files
		init.copyAndProcess(files, props, {noProcess: 'screenshot.png'});

		// Generate package.json file
		init.writePackageJSON( 'package.json', props );

		// Done!
		done();
	});
};