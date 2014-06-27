/*
 * i18n-generator
 * https://github.com/huei90/i18n-generator
 *
 * Copyright (c) 2014 Huei Tan
 * Licensed under the MIT license.
 */

'use strict';

/**
 * Following the 'Node.js require(s) best practices' by
 * https://github.com/zeMirco/node-require-s--best-practices
 *
 * // Nodejs libs
 * var fs = require('fs'),
 *
 * // External libs
 * debug = require('debug'),
 *
 * // Internal libs
 * data = require('./data.js');
 */

var fs = require('fs');

var variableName = {
    rootPath: 'rootPath',
    number: 'number',
    i18nGo: 'i18n=>'
};

var variable = {
    rootPath: null,
    number: null,
    language: [],
    i18n: {}
};

function readLines(input, output, func, func2) {
    var remaining = '';

    input.on('data', function (data) {

    });

    input.on('end', function () {
        if (remaining.length > 0) {
            func(remaining);
        } else {
            // console.log(variable);

        }
    });
}

function i18nGenerating(data) {

    var output;

    if (data[0] === '#') {

        /**
         * Case for #
         * Not yet implement

        output = data.split('=');

        if (output[0].indexOf(variableName.rootPath) !== -1) {
            variable.rootPath = output[1].trim();
        } else if (output[0].indexOf(variableName.number) !== -1) {
            variable.number = output[1].trim();
        }
        */

    } else {
        output = data.split('|');

        if (output[0].indexOf(variableName.i18nGo) !== -1) {
            for (var i = 1; i < output.length; i++) {
                var lang = output[i].trim();
                variable.language.push(lang);
                variable.i18n[lang] = {};
            }
        } else {
            for (var j = 1; j < output.length; j++) {
                variable.i18n[variable.language[j - 1]][output[0].trim()] = output[j].trim();
            }
        }
    }

}

function i18nGenerate(output) {
    console.log('i18n start')
    for (var lang in variable.i18n) {
        var writeText = JSON.stringify(variable.i18n[lang]);

        // should change it to stream
        fs.writeFileSync(output + '/' + lang + '.json', writeText);
            console.log('i18n start wriet' + lang)

        console.log('i18n write: ' + lang)
    }

    console.log('i18n file generator');
}
module.exports = function (input, output) {
    // readLines(fs.createReadStream(input), output, i18nGenerating, i18nGenerate);
console.log('start io')
    var data =  fs.readFileSync(input);
    var remaining = '';

    remaining += data;
    var index = remaining.indexOf('\n');
    var last = 0;
    while (index > -1) {
        var line = remaining.substring(last, index);
        last = index + 1;
        i18nGenerating(line);
        index = remaining.indexOf('\n', last);
    }

    remaining = remaining.substring(last);

    if (remaining.length > 0) {
        i18nGenerating(remaining);
    }

    i18nGenerate(output);

    console.log('end io')
};

module.exports('test/input.txt', 'test/temp');