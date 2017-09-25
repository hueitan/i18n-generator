/*
 * to CSV
 *
 * Copyright (c) 2014-2017 Huei Tan
 * Licensed under the MIT license.
 */

/**
 * i18n=> | en | zh_TW | de | my
 * you | you | 你 | Du | kamu
 * I | I | 我 | ich | Saya
 * love | love | 喜歡 | liebe | cinta
 * eat | eat | 吃 | essen | makan
 * ilovegithub | i love github | 我愛 Github | ich liebe Github | Saya cinta pada Github
 *
 * to
 *
 * i18n=> , en , zh_TW , de , my
 * you , you , 你 , Du , kamu
 * I , I , 我 , ich , Saya
 * love , love , 喜歡 , liebe , cinta
 * eat , eat , 吃 , essen , makan
 * ilovegithub , i love github , 我愛 Github , ich liebe Github , Saya cinta pada Github
 */

module.exports = function (input, split, cb) {

    var data;

    data = input.replace(new RegExp('[' + split + ']', 'g'), ',');

    cb(null, data);
};

// split | => ,
// module.exports('i18n=> | en | zh_TW | de | my\nyou | you | 你 | Du | kamu\nI | I | 我 | ich | Saya\nlove | love | 喜歡 | liebe | cinta\neat | eat | 吃 | essen | makan\nilovegithub | i love github | 我愛 Github | ich liebe Github | Saya cinta pada Github', '|', function (err, data) {console.log(data);});