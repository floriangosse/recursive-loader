/*
 * recursive-loader
 * floriangosse/recursive-loader
 *
 * Copyright (c) 2014 Florian Goße
 * Licensed under the MIT license.
 */

'use strict';

var fs = require('fs'),
    path = require('path'),
    S = require('string');

function Loader() {
    
    /**
     * The priority is used if the formatted name of file and directory 
     * is the same.
     * @type {String}
     * @default 'directory'
     */
    this.priority = 'directory';

    /**
     * Filename formatter
     * @param  {String} filename the unformatted filename
     * @return {String}          the formatted filename
     */
    this.formatFilename = function(filename) {

        return S(filename).camelize().s;
    };

    /**
     * Dirname formatter
     * @param  {String} dirname the unformatted dirname
     * @return {String}         the formatted dirname
     */
    this.formatDirname = function(dirname) {

        return S(dirname).camelize().s;
    }
}

Loader.prototype.load = function(directory) {

    var that = this,
        components = {};

    // get the absolute path
    directory = path.resolve(directory);

    fs.readdirSync(directory).forEach(function (file) {

        // absolute path
        file = directory + '/' + file;

        var component,
            name,
            type,
            extension = path.extname(file),
            filename  = path.basename(file, extension),
            stat      = fs.statSync(file);

        if (stat.isFile()) {
            type = 'file';

            if (extension === '.js') {
                try {
                    component = require(file);
                    name = that.defaults.formatFilename(filename);
                } catch(e) {
                    component = undefined;
                }
            }
        } else if (stat.isDirectory()) {
            type = 'directory';

            component = that.load(file);
            name = that.defaults.formatDirname(filename);
        }

        // Check if component is not empty
        if (component && Object.getOwnPropertyNames(component).length) {
            if (components[name]) {
                if (that.priority === type) {
                    components[name] = component;
                }

            } else {
                components[name] = component;
            }
        }
    });

    return components;
};

module.exports = new Loader();
