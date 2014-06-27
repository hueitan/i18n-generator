'use strict';

var fs = require('fs');
var i18nGenerator = require('./i18n-generator.js');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.i18nGenerator = {
  setUp: function(done) {
    // setup here
    done();
  },
  generate: function (test) {
      test.expect(4);

      var isExist = fs.existsSync('./test/temp');

      if (!isExist) {
          fs.mkdirSync('./test/temp');
      }

      i18nGenerator('test/input.txt', 'test/temp');

      var en = fs.existsSync('./test/temp/de.json'),
          de = fs.existsSync('./test/temp/de.json'),
          my = fs.existsSync('./test/temp/my.json'),
          zh = fs.existsSync('./test/temp/zh_TW.json');

      test.equal(en, true, 'en.json should be generated');
      test.equal(de, true, 'fr.json should be generated');
      test.equal(my, true, 'my.json should be generated');
      test.equal(zh, true, 'zh.json should be generated');

      // should check file content

      test.done();
  }
};
