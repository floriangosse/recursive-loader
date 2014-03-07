'use strict';

var loader = require('../lib/recursive-loader.js');

exports['Recursive Loader'] = {

    setUp: function(done) {
        this._path = __dirname + '/test-files';
        done();
    },

    'Test type of loader': function(test) {
        test.expect(1);

        test.equal(
            typeof(loader), 'object',
            'Should be object.'
        );

        test.done();
    },

    'Test method load exists': function(test) {
        test.expect(1);

        test.equal(
            typeof(loader.load), 'function',
            'Should be function.'
        );

        test.done();
    },

    'Test without settings': function(test) {
        // Default priority is 'directory'
        var modules = loader.load(this._path);

        test.expect(15);
        
        // index.js
        test.equal(
            typeof(modules.index), 'function',
            'Should be function.'
        );
        test.equal(
            modules.index(), 'index.js',
            'Should be string \"index.js\"'
        );

        // world.js is ignored because the directory has the priority

        // world/
        test.equal(
            typeof(modules.world), 'object',
            'Should be object'
        );

        // world/index.js
        test.equal(
            typeof(modules.world.index), 'object',
            'Should be object.'
        );

        // world/index.js#turn
        test.equal(
            typeof(modules.world.index.turn), 'function',
            'Should be function.'
        );
        test.equal(
            modules.world.index.turn(), 360,
            'Should be number \"360\"'
        );

        // world/index.js#radius
        test.equal(
            typeof(modules.world.index.radius), 'function',
            'Should be function.'
        );
        test.equal(
            modules.world.index.radius(), 6371,
            'Should be number \"6371\"'
        );

        // world/index.js#diameter
        test.equal(
            typeof(modules.world.index.diameter), 'function',
            'Should be function.'
        );
        test.equal(
            modules.world.index.diameter(), 12742,
            'Should be number \"12742\"'
        );

        // world/hello.js
        test.equal(
            typeof(modules.world.hello), 'object',
            'Should be object.'
        );

        // world/hello.js#english
        test.equal(
            typeof(modules.world.hello.english), 'function',
            'Should be function'
        );
        test.equal(
            modules.world.hello.english(), 'Hello World!',
            'Should be string \"Hello World!\"'
        );

        // world/hello.js#german
        test.equal(
            typeof(modules.world.hello.german), 'function',
            'Should be function'
        );
        test.equal(
            modules.world.hello.german(), 'Hallo Welt!',
            'Should be string \"Hallo Welt!\"'
        );

        test.done();
    }
};
