/*
 * html2js
 * https://github.com/liuyang/libs
 *
 * Copyright (c) 2014 liuyang
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('html2js', 'The best Grunt plugin ever.', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      punctuation: '.',
      separator: '\n'
    });

    // Iterate over all specified file groups.
    this.files.forEach(function(f) {
      // Concat specified files.
	  // console.log(grunt.file.read("test/html/table.html").replace(/\\s*|\t|\r|\n/g, ""));
      var src = "";
	  
	  //head
	  src += "define(function() {\nvar html = {};\n"
	  
	  //body
	  src += f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).		
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {			
          return true;
        }
      }).map(function(filepath) {
        // Read file source.		
		// console.log(grunt.file.read(filepath));
		var result, key, arr,
			html = grunt.file.read(filepath).replace(/\\s*|\t|\r|\n/g, "");
			
		key = filepath;
		arr = key.split("/");
		key = arr[arr.length - 1];
		
		result = "html['" + key + "'] = '" + html + "';";
        return result;
      })
	  .join(grunt.util.normalizelf(options.separator));
	  
	  //foot
	  src += "\nreturn html;\n});"
	  

      // Handle options.
      // src += options.punctuation;

      // Write the destination file.
      grunt.file.write(f.dest, src);

      // Print a success message.
      grunt.log.writeln('File "' + f.dest + '" created.');
    });
  });

};
