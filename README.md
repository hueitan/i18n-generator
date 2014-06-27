# i18n-generator [![Build Status](https://secure.travis-ci.org/huei90/i18n-generator.png?branch=master)](http://travis-ci.org/huei90/i18n-generator)

Easy your i18n file => i18n generator for node

## Getting Started
Install the module with: `npm install -g i18n-generator`

**node.js**

```javascript
var i18nGenerator = require('i18n-generator');

var inputFile = 'input.txt',
    outputPath = 'output';

i18nGenerator(inputFile, outputPath);

// js-beautify your json
i18nGenerator(inputFile, outputPath, true);
// or given js-beautify options
i18nGenerator(inputFile, outputPath, { indent_size: 2 });

// options => https://github.com/beautify-web/js-beautify#options
```

**cli**

```bash
$ i18n input.txt output
```

## Workflow

**input file**
```
i18n=> | en | zh_TW | de | my
you | you | 你 | Sie | kamu
I | I | 我 | ich | Saya
love | love | 喜歡 | liebe | cinta
eat | eat | 吃 | essen | makan
ilovegithub | i love github | 我愛 Github | ich liebe Github | Saya cinta pada Github
```

**output(de.json)**
```js
{"you":"Sie","I":"ich","love":"liebe","eat":"essen","ilovegithub":"ich liebe Github"}
```
**output(en.json)**
```js
{"you":"you","I":"I","love":"love","eat":"eat","ilovegithub":"i love github"}
```
**output(my.json)**
```js
{"you":"kamu","I":"Saya","love":"cinta","eat":"makan","ilovegithub":"Saya cinta pada Github"}
```
**output(zh_TW.json)**
```js
{"you":"你","I":"我","love":"喜歡","eat":"吃","ilovegithub":"我愛 Github"}
```

## License
Copyright (c) 2014 Huei Tan. Licensed under the MIT license.
