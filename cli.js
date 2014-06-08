#! /usr/bin/env node

'use strict';

var multiline = require('multiline');
var i18nGenerator = require('./i18n-generator');

var userArgs = process.argv;
var inputFileParam = userArgs[2];
var outputFileParam = userArgs[3];

if (userArgs.indexOf('-h') !== -1 || userArgs.indexOf('--help') !== -1) {
    return console.log(multiline.stripIndent(function () { /*

    i18n <input file> <output path>

    example
    i18n input.txt output
     */
    }));
}

if (userArgs.indexOf('-v') !== -1 || userArgs.indexOf('--version') !== -1) {
    return console.log(require('./package').version);
}


// i18n test/input.txt test/temp
i18nGenerator(inputFileParam, outputFileParam);
