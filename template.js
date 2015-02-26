/**
 * Moskow
 * https://github.com/wilmoth77/Moskow
 *
 * Licensed under the MIT License
 */

'use strict';

// Basic template description
exports.description = 'Create a WordPress theme based on Underscores, Sage (Roots), and Bootstrap.';

// Template-specific notes to be displayed before question prompts.
exports.notes = 'In order to rename all prefixes in the template, please give your theme a new name.';

// Template-specific notes to be displayed after the question prompts.
exports.after = 'Your template is complete! Please run `npm install`, `bower install` and then `grunt compile` to set up all dependencies.';

// Any existing file or directory matching this wildcard will cause a warning.
exports.warnOn = '*';

// The actual init template
exports.template = function (grunt, init, done) {
	init.process({}, [
		// Prompt for these values.
		init.prompt('title', 'Moskow'),
		{
			name   : 'prefix',
			message: 'PHP function prefix (alpha and underscore characters only)',
			default: 'Moskow'
		},
	], function( err, props ) {
		props.keywords = ["underscores", "sage", "bootstrap"];
		props.version = '1.0.0';
                props.author = 'Jeff Wilmoth';
                props.repo = {
                    type: 'git',
                    url: 'https://github.com/wilmoth77/Moskow'
                },
                props.repo = {
                    type: 'licenses',
                    url: 'http://opensource.org/licenses/MIT'
                },
                props.bugs = {
                    url: 'http://www.google.com'
                },
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
                "grunt-contrib-jshint": "latest",
                "grunt-contrib-copy": "latest"
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