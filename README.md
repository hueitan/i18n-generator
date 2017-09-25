# i18n-generator
[![Build Status](https://secure.travis-ci.org/hueitan/i18n-generator.png?branch=master)](http://travis-ci.org/hueitan/i18n-generator)
[![Dependency Status](https://david-dm.org/huei90/i18n-generator.svg)](https://david-dm.org/huei90/i18n-generator)
[![devDependency Status](https://david-dm.org/huei90/i18n-generator/dev-status.svg)](https://david-dm.org/huei90/i18n-generator#info=devDependencies)

i18n json files generator for **node**, **web browser** and **command line**.

[i18n Online Generate Tools](http://hueitan.github.io/i18n-generator)
![screen shot 2016-01-21 at 5 11 23 pm](https://cloud.githubusercontent.com/assets/2560096/12476009/bce5cf48-c061-11e5-93d9-94a9176e3377.png)

## Getting Started

**node.js**<br/>
Install the module with: `npm install i18n-generator`

```javascript
var i18nGenerator = require('i18n-generator');

var inputFile = 'input.txt',
    outputPath = 'output';

i18nGenerator(inputFile, outputPath);

// js-beautify your json
i18nGenerator(inputFile, outputPath, true);
// or given js-beautify options
i18nGenerator(inputFile, outputPath, { indent_size: 2 });
// settings split variable (default as |)
i18nGenerator(inputFile,outputPath, options, 'csv');

// options => https://github.com/beautify-web/js-beautify#options
// splitter support
// | => pipe (default)
// , => csv
// \t => tsv

// get output data api
// input can be file (.txt) or string (data)
i18nGenerator.get(input, 'csv', function (err, data) {
    console.log(data);
    // => output i18n data
});

// or you can
i18nGenerator.get(input, function (err, data) {
	console.log(data);
});
```

**browser**

```html
<script src="i18n-generator.js"></script>
```

```js
var i18n = window.i18n;
i18n(inputData, 'csv', function (err, data) {
    console.log(data);
    // => output i18n data
});

// or easily
i18n(inputData, function (err, data) {
	console.log(data);
	// => split default pipe |
});
```

**cli**
```bash
$ i18n input.txt output

# generate from csv or tsv
$ i18n input.csv output

# watch file
$ i18n input.txt output --watch
```

## Workflow

**input file**
```
i18n=>, en, zh_TW, de, my
you, you, 你, Du, kamu
I, I, 我, ich, Saya
love, love, 喜歡, liebe, cinta
eat, eat, 吃, essen, makan
ilovegithub, i love github, 我愛 Github, ich liebe Github, Saya cinta pada Github
```

**output (de.json)**
```js
{"you":"Du","I":"ich","love":"liebe","eat":"essen","ilovegithub":"ich liebe Github"}
```
**output (en.json)**
```js
{"you":"you","I":"I","love":"love","eat":"eat","ilovegithub":"i love github"}
```
**output (my.json)**
```js
{"you":"kamu","I":"Saya","love":"cinta","eat":"makan","ilovegithub":"Saya cinta pada Github"}
```
**output (zh_TW.json)**
```js
{"you":"你","I":"我","love":"喜歡","eat":"吃","ilovegithub":"我愛 Github"}
```

**Try Advance**
```
i18n=>, en, zh_TW, de, my
ilovegithub, "i love github but u", "我愛 github,但我也愛 git", was du gesagt, "saya pun"
```

**Try Nest**
```
i18n=>, en, zh_TW, de, my
ilovegithub, i love github, 我愛 Github, ich liebe Github, Saya cinta pada Github
=> global
sleep, sleep, 睡覺, schlafen, tidur
morning, morning, 早安, Morgen, pagi
=> people
Ahmad, Ahmad, Ahmad, Ahmad, Ahmad
<=
Back, back, 回來, terug, balik
```

*It's work! Cool right ? You can try it on [online demo tools](http://hueitan.github.io/i18n-generator)*

## License
Copyright (c) 2014-2016 [Huei Tan](https://github.com/hueitan). Licensed under the MIT license.
