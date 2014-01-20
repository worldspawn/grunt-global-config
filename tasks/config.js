/*
 * grunt-global-config
 * https://github.com/vanetix/grunt-global-config
 *
 * Copyright (c) 2013 Matt McFarland
 * Licensed under the MIT license.
 */

module.exports = function(grunt) {

  /**
   * Core `grunt-global-config` task
   */

  grunt.registerMultiTask('config', 'Create a global config from json.', function() {

    /**
     * Default options
     */

    var opts = this.options({
      modulename: 'app.settings'
    });

    if (!grunt.file.exists(this.data.files.src)){
      grunt.log.warn('Source file "' + this.data.files.src + '" not found.');
      return false;
    }

    var f = grunt.file.read(this.data.files.src);
    var j = JSON.parse(grunt.config.process(f));
    var c = JSON.stringify(j);

    grunt.file.write(this.data.files.dest, 'angular.module(\'' + opts.modulename + '\', []).value(\'settings\', ' + c + ');');
    grunt.log.ok(this.data.files.dest);
  });
};
