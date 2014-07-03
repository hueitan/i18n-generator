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

        return;
    }

    for (var j = 1; j < output.length; j++) {
        variable.i18n[variable.language[j - 1]][output[0].trim()] = output[j].trim();
    }

}

function i18nFileGenerate(output, options) {

    for (var lang in variable.i18n) {
        var writeText = JSON.stringify(variable.i18n[lang]);

        if (options) {
            writeText = beautify(writeText, options);
        }

        fs.writeFileSync(output + '/' + lang + '.json', writeText, { flag: 'w'});

    }

}

function readFileAndGenerating(input, split) {
    var data;

    try {
        data = fs.readFileSync(input);
    } catch (e) {
        data = input;
    }

    var remaining = '';

    if (split) {
        variable.split = split;
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
}

module.exports = function (input, output, options, split) {


    var isExist = fs.existsSync(output);

    if (!isExist) {
        fs.mkdirSync(output);
    }

    readFileAndGenerating(input, split);

    i18nFileGenerate(output, options || null);

};

module.exports.get = function (input, split, cb) {

    readFileAndGenerating(input, split);

    cb(null, variable.i18n);
};

/* browser window */
if (typeof window !== 'undefined') {
    // If we're running a web page
    window.i18n = module.exports.get;
}

// basic
// module.exports('test/input.txt', 'test/temp');

// options splitter
// module.exports('test/inputComma.txt', 'test/temp', null, ',');

// using callback
// module.exports.get('test/input.txt', '|', function (err, data) {console.log(data);});

// using input string data
// module.exports.get('i18n=> | en | zh_TW | de | my\nyou | you | 你 | Du | kamu\nI | I | 我 | ich | Saya\nlove | love | 喜歡 | liebe | cinta\neat | eat | 吃 | essen | makan\nilovegithub | i love github | 我愛 Github | ich liebe Github | Saya cinta pada Github', '|', function (err, data) {console.log(data);});