# Recursive Loader [![Build Status](https://secure.travis-ci.org/floriangosse/recursive-loader.png?branch=master)](http://travis-ci.org/floriangosse/recursive-loader)

> Load modules recursive and save them in an object.

## Getting Started
Install the module with: `npm install recursive-loader`

```javascript
var loader = require('recursive-loader'),
    modules = loader.load('./my-modules');

modules.myFunction();
// OR
modules.world.hello();
```

## Documentation

### Configuration

#### priority
* Type: `String`,
* Default: `directory`

Specifies the priority you want to use. For example, `file`.

#### formatFilename
* Type: `Function`,
* Default: Return camlized filename

#### formatDirname
* Type: `Function`,
* Default: Return camlized dirname

### Usage examples

Use `file` as priority for loading modules.

```javascript
var loader = require('recursive-loader');

loader.priority = 'file';

// load and use modules
```

Use custom formatter for file or dirname.
```javascript
var loader = require('recursive-loader');

loader.formatFilename = function(filename) {
    
    return filename.replace('-', '').toUpperCase();
};

loader.formatDirname = function(dirname) {
    
    return dirname.replace('-', '').toLowerCase();
};

// load and use modules
```

## License
Copyright (c) 2014 Florian Goße. Licensed under the MIT license.
