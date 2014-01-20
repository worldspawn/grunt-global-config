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

    var c = '';
    var src = this.data.files.src.filter(function(f) {
      if(grunt.file.exists(f)) {
          return true;
        } else {
          grunt.log.warn('Source file "' + f + '" not found.');
          return false;
        }
      })
      .forEach(function(p) {
        var f = grunt.file.read(p);
        var j = JSON.parse(grunt.config.process(f));

        c += JSON.stringify(j);
      });


      grunt.file.write(this.data.files.dest, 'angular.module(\'' + opts.modulename + '\', []).value(\'settings\', ' + c + ');');
      grunt.log.ok(this.data.files.dest);
  });
};
