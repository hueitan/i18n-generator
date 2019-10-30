#! /usr/bin/env node

'use strict';

var fs = require('fs');
var i18nGenerator = require('./index');

var userArgs = process.argv;
var inputFileParam = userArgs[2];
var outputFileParam = userArgs[3];

if (userArgs.indexOf('-h') !== -1 || userArgs.indexOf('--help') !== -1) {
    return console.log(`
    i18n <input file> <output path> --watch

    example :
    i18n input.txt output
    i18n input.csv output
    i18n input.txt output --watch

`
    );
}

if (userArgs.indexOf('-v') !== -1 || userArgs.indexOf('--version') !== -1) {
    return console.log(require('./package').version);
}

var filetype = 'pipe';
switch (inputFileParam.match(/(.*)(?:\.([^.]+$))/)[2]) {
    case 'csv': {
        filetype = 'csv';
        break;
    }
    case 'tsv': {
        filetype = 'tsv';
        break;
    }
}

// i18n test/input.txt test/temp --watch
if (userArgs.indexOf('--watch') !== -1) {
    fs.watch(inputFileParam, function () {
        console.log('file ' + inputFileParam + ' changed!');
        i18nGenerator(inputFileParam, outputFileParam, false, filetype);
    });
} else {
    // i18n test/input.txt test/temp
    i18nGenerator(inputFileParam, outputFileParam, false, filetype);
}
