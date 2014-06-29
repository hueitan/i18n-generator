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

var fs = require('fs'),
    beautify = require('js-beautify').js_beautify;

var variableName = {
    rootPath: 'rootPath',
    number: 'number',
    i18nGo: 'i18n=>'
};

var variable = {
    split: '|',
    language: [],
    i18n: {}
};

function i18nGenerating(data) {

    var output;

    output = data.split(variable.split);

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

function i18nGenerate(output, options) {

    for (var lang in variable.i18n) {
        var writeText = JSON.stringify(variable.i18n[lang]);

        if (options) {
            writeText = beautify(writeText, options);
        }

        fs.writeFileSync(output + '/' + lang + '.json', writeText, { flag: 'w'});

    }

}

module.exports = function (input, output, options, split) {

    var data =  fs.readFileSync(input);
    var isExist = fs.existsSync(output);
    var remaining = '';

    if (split) {
        variable.split = split;
    }

    if (!isExist) {
        fs.mkdirSync(output);
    }

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

    i18nGenerate(output, options || null);

};

// module.exports('test/input.txt', 'test/temp');
// module.exports('test/inputComma.txt', 'test/temp', null, ',');
