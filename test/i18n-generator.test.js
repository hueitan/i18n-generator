const fs = require( 'fs' );
const i18nGenerator = require( '../index' );

describe( 'generate', () => {
    let en, de, my, zh, enJson, deJson, myJson, zhJson;

    beforeAll( () => {
        i18nGenerator( 'test/fixtures/input.txt', 'test/fixtures/temp' );

        // exists check
        en = fs.existsSync( './test/fixtures/temp/en.json' );
        de = fs.existsSync( './test/fixtures/temp/de.json' );
        my = fs.existsSync( './test/fixtures/temp/my.json' );
        zh = fs.existsSync( './test/fixtures/temp/zh_TW.json' );

        // content check
        enJson = fs.readFileSync( './test/fixtures/temp/en.json', { encoding : 'utf8' } );
        deJson = fs.readFileSync( './test/fixtures/temp/de.json', { encoding : 'utf8' } );
        myJson = fs.readFileSync( './test/fixtures/temp/my.json', { encoding : 'utf8' } );
        zhJson = fs.readFileSync( './test/fixtures/temp/zh_TW.json', { encoding : 'utf8' } );
    } );

    test( 'en.json file', () => {
        expect( en ).toBeTruthy();
        expect( enJson ).toEqual( '{"you":"you","I":"I","love":"love","eat":"eat","ilovegithub":"i love github"}' );
    } );

    test( 'de.json file', () => {
        expect( de ).toBeTruthy();
        expect( deJson ).toEqual( '{"you":"Du","I":"ich","love":"liebe","eat":"essen","ilovegithub":"ich liebe Github"}' );
    } );

    test( 'my.json file', () => {
        expect( my ).toBeTruthy();
        expect( myJson ).toEqual( '{"you":"kamu","I":"Saya","love":"cinta","eat":"makan","ilovegithub":"Saya cinta pada Github"}' );
    } );

    test( 'zh.json file', () => {
        expect( zh ).toBeTruthy();
        expect( zhJson ).toEqual( '{"you":"你","I":"我","love":"喜歡","eat":"吃","ilovegithub":"我愛 Github"}' );
    } );
} );

describe( 'optionsSplit', () => {
    let en, de, my, zh, enJson, deJson, myJson, zhJson;

    beforeAll( () => {
        i18nGenerator( 'test/fixtures/inputComma.csv', 'test/fixtures/temp', false, 'csv' );

        // exists check
        en = fs.existsSync( './test/fixtures/temp/en.json' );
        de = fs.existsSync( './test/fixtures/temp/de.json' );
        my = fs.existsSync( './test/fixtures/temp/my.json' );
        zh = fs.existsSync( './test/fixtures/temp/zh_TW.json' );

        // content check
        enJson = fs.readFileSync( './test/fixtures/temp/en.json', { encoding : 'utf8' } );
        deJson = fs.readFileSync( './test/fixtures/temp/de.json', { encoding : 'utf8' } );
        myJson = fs.readFileSync( './test/fixtures/temp/my.json', { encoding : 'utf8' } );
        zhJson = fs.readFileSync( './test/fixtures/temp/zh_TW.json', { encoding : 'utf8' } );
    } );

    test( 'en.json file', () => {
        expect( en ).toBeTruthy();
        expect( enJson ).toEqual( '{"you":"you","I":"I","love":"love","eat":"eat","ilovegithub":"i love github"}' );
    } );

    test( 'de.json file', () => {
        expect( de ).toBeTruthy();
        expect( deJson ).toEqual( '{"you":"Du","I":"ich","love":"liebe","eat":"essen","ilovegithub":"ich liebe Github"}' );
    } );

    test( 'my.json file', () => {
        expect( my ).toBeTruthy();
        expect( myJson ).toEqual( '{"you":"kamu","I":"Saya","love":"cinta","eat":"makan","ilovegithub":"Saya cinta pada Github"}' );
    } );

    test( 'zh.json file', () => {
        expect( zh ).toBeTruthy();
        expect( zhJson ).toEqual( '{"you":"你","I":"我","love":"喜歡","eat":"吃","ilovegithub":"我愛 Github"}' );
    } );
} );

describe( 'getMethod', () => {

    let enObject = {"you":"you","I":"I","love":"love","eat":"eat","ilovegithub":"i love github"},
        deObject = {"you":"Du","I":"ich","love":"liebe","eat":"essen","ilovegithub":"ich liebe Github"},
        myObject = {"you":"kamu","I":"Saya","love":"cinta","eat":"makan","ilovegithub":"Saya cinta pada Github"},
        zhObject = {"you":"你","I":"我","love":"喜歡","eat":"吃","ilovegithub":"我愛 Github"};

    test( 'csv file', () => {
        i18nGenerator.get( 'test/fixtures/inputComma.csv', 'csv' , ( err, data ) => {
            expect( data.en ).toEqual( enObject );
            expect( data.de ).toEqual( deObject );
            expect( data.my ).toEqual( myObject );
            expect( data.zh_TW ).toEqual( zhObject );
        } );
    } );

    test( 'txt file', () => {
        i18nGenerator.get( 'test/fixtures/input.txt', ( err, data ) => {
            expect( data.en ).toEqual( enObject );
            expect( data.de ).toEqual( deObject );
            expect( data.my ).toEqual( myObject );
            expect( data.zh_TW ).toEqual( zhObject );
        } );
    } );
} );

describe( 'browserify', () => {
    let input = 'i18n=> | en | zh_TW | de | my\nyou | you | 你 | Du | kamu\nI | I | 我 | ich | Saya\nlove | love | 喜歡 | liebe | cinta\neat | eat | 吃 | essen | makan\nilovegithub | i love github | 我愛 Github | ich liebe Github | Saya cinta pada Github';
    let enObject = {"you":"you","I":"I","love":"love","eat":"eat","ilovegithub":"i love github"},
        deObject = {"you":"Du","I":"ich","love":"liebe","eat":"essen","ilovegithub":"ich liebe Github"},
        myObject = {"you":"kamu","I":"Saya","love":"cinta","eat":"makan","ilovegithub":"Saya cinta pada Github"},
        zhObject = {"you":"你","I":"我","love":"喜歡","eat":"吃","ilovegithub":"我愛 Github"};

    test( 'pipe', () => {
        i18nGenerator.get( input, 'pipe', ( err, data ) => {
            expect( data.en ).toEqual( enObject );
            expect( data.de ).toEqual( deObject );
            expect( data.my ).toEqual( myObject );
            expect( data.zh_TW ).toEqual( zhObject );
        } );
    } );
} );

describe( 'nestObject', () => {
    let en, de, my, zh, enJson, deJson, myJson, zhJson;

    beforeAll( () => {
        i18nGenerator( 'test/fixtures/inputNest.txt', 'test/fixtures/temp' );

        // exists check
        en = fs.existsSync( './test/fixtures/temp/en.json' );
        de = fs.existsSync( './test/fixtures/temp/de.json' );
        my = fs.existsSync( './test/fixtures/temp/my.json' );
        zh = fs.existsSync( './test/fixtures/temp/zh_TW.json' );

        // content check
        enJson = fs.readFileSync( './test/fixtures/temp/en.json', { encoding : 'utf8' } );
        deJson = fs.readFileSync( './test/fixtures/temp/de.json', { encoding : 'utf8' } );
        myJson = fs.readFileSync( './test/fixtures/temp/my.json', { encoding : 'utf8' } );
        zhJson = fs.readFileSync( './test/fixtures/temp/zh_TW.json', { encoding : 'utf8' } );
    } );

    test( 'en.json file', () => {
        expect( en ).toBeTruthy();
        expect( enJson ).toEqual( '{"you":"you","I":"I","love":"love","eat":"eat","ilovegithub":"i love github","global":{"sleep":"sleep","morning":"morning","people":{"Ahmad":"Ahmad"}},"Back":"back"}' );
    } );

    test( 'de.json file', () => {
        expect( de ).toBeTruthy();
        expect( deJson ).toEqual( '{"you":"Du","I":"ich","love":"liebe","eat":"essen","ilovegithub":"ich liebe Github","global":{"sleep":"schlafen","morning":"Morgen","people":{"Ahmad":"Ahmad"}},"Back":"terug"}' );
    } );

    test( 'my.json file', () => {
        expect( my ).toBeTruthy();
        expect( myJson ).toEqual( '{"you":"kamu","I":"Saya","love":"cinta","eat":"makan","ilovegithub":"Saya cinta pada Github","global":{"sleep":"tidur","morning":"pagi","people":{"Ahmad":"Ahmad"}},"Back":"balik"}' );
    } );

    test( 'zh.json file', () => {
        expect( zh ).toBeTruthy();
        expect( zhJson ).toEqual( '{"you":"你","I":"我","love":"喜歡","eat":"吃","ilovegithub":"我愛 Github","global":{"sleep":"睡覺","morning":"早安","people":{"Ahmad":"Ahmad"}},"Back":"回來"}' );
    } );
} );

describe( 'nestObjectEmptyKey', () => {
    let en, de, my, zh, enJson, deJson, myJson, zhJson;

    beforeAll( () => {
        i18nGenerator( 'test/fixtures/inputNestEmptyKey.txt', 'test/fixtures/temp' );

        // exists check
        en = fs.existsSync( './test/fixtures/temp/en.json' );
        de = fs.existsSync( './test/fixtures/temp/de.json' );
        my = fs.existsSync( './test/fixtures/temp/my.json' );
        zh = fs.existsSync( './test/fixtures/temp/zh_TW.json' );

        // content check
        enJson = fs.readFileSync( './test/fixtures/temp/en.json', { encoding : 'utf8' } );
        deJson = fs.readFileSync( './test/fixtures/temp/de.json', { encoding : 'utf8' } );
        myJson = fs.readFileSync( './test/fixtures/temp/my.json', { encoding : 'utf8' } );
        zhJson = fs.readFileSync( './test/fixtures/temp/zh_TW.json', { encoding : 'utf8' } );
    } );

    test( 'en.json file', () => {
        expect( en ).toBeTruthy();
        expect( enJson ).toEqual( '{"you":"you","I":"I","love":"love","eat":"eat","ilovegithub":"i love github","global":{"sleep":"sleep","morning":"morning","people":{"Ahmad":"Ahmad"}},"Back":"back"}' );
    } );

    test( 'de.json file', () => {
        expect( de ).toBeTruthy();
        expect( deJson ).toEqual( '{"you":"Du","I":"ich","love":"liebe","eat":"essen","ilovegithub":"ich liebe Github","global":{"sleep":"schlafen","morning":"Morgen","people":{"Ahmad":"Ahmad"}},"Back":"terug"}' );
    } );

    test( 'my.json file', () => {
        expect( my ).toBeTruthy();
        expect( myJson ).toEqual( '{"you":"kamu","I":"Saya","love":"cinta","eat":"makan","ilovegithub":"Saya cinta pada Github","global":{"sleep":"tidur","morning":"pagi","people":{"Ahmad":"Ahmad"}},"Back":"balik"}' );
    } );

    test( 'zh.json file', () => {
        expect( zh ).toBeTruthy();
        expect( zhJson ).toEqual( '{"you":"你","I":"我","love":"喜歡","eat":"吃","ilovegithub":"我愛 Github","global":{"sleep":"睡覺","morning":"早安","people":{"Ahmad":"Ahmad"}},"Back":"回來"}' );
    } );
} );

describe( 'tsvSplitter', () => {
    let en, de, my, zh, enJson, deJson, myJson, zhJson;

    beforeAll( () => {
        i18nGenerator( 'test/fixtures/inputTab.tsv', 'test/fixtures/temp', false, 'tsv' );

        // exists check
        en = fs.existsSync( './test/fixtures/temp/en.json' );
        de = fs.existsSync( './test/fixtures/temp/de.json' );
        my = fs.existsSync( './test/fixtures/temp/my.json' );
        zh = fs.existsSync( './test/fixtures/temp/zh_TW.json' );

        // content check
        enJson = fs.readFileSync( './test/fixtures/temp/en.json', { encoding : 'utf8' } );
        deJson = fs.readFileSync( './test/fixtures/temp/de.json', { encoding : 'utf8' } );
        myJson = fs.readFileSync( './test/fixtures/temp/my.json', { encoding : 'utf8' } );
        zhJson = fs.readFileSync( './test/fixtures/temp/zh_TW.json', { encoding : 'utf8' } );
    } );

    test( 'en.json file', () => {
        expect( en ).toBeTruthy();
        expect( enJson ).toEqual( '{"you":"you","I":"I","love":"love","eat":"eat","ilovegithub":"i love github"}' );
    } );

    test( 'de.json file', () => {
        expect( de ).toBeTruthy();
        expect( deJson ).toEqual( '{"you":"Du","I":"ich","love":"liebe","eat":"essen","ilovegithub":"ich liebe Github"}' );
    } );

    test( 'my.json file', () => {
        expect( my ).toBeTruthy();
        expect( myJson ).toEqual( '{"you":"kamu","I":"Saya","love":"cinta","eat":"makan","ilovegithub":"Saya cinta pada Github"}' );
    } );

    test( 'zh.json file', () => {
        expect( zh ).toBeTruthy();
        expect( zhJson ).toEqual( '{"you":"你","I":"我","love":"喜歡","eat":"吃","ilovegithub":"我愛 Github"}' );
    } );
} );

describe( 'commaAdvance', () => {
    let en, de, my, zh, enJson, deJson, myJson, zhJson;

    beforeAll( () => {
        i18nGenerator( 'test/fixtures/inputCommaAdvance.csv', 'test/fixtures/temp', false, 'csv' );

        // exists check
        en = fs.existsSync( './test/fixtures/temp/en.json' );
        de = fs.existsSync( './test/fixtures/temp/de.json' );
        my = fs.existsSync( './test/fixtures/temp/my.json' );
        zh = fs.existsSync( './test/fixtures/temp/zh_TW.json' );

        // content check
        enJson = fs.readFileSync( './test/fixtures/temp/en.json', { encoding : 'utf8' } );
        deJson = fs.readFileSync( './test/fixtures/temp/de.json', { encoding : 'utf8' } );
        myJson = fs.readFileSync( './test/fixtures/temp/my.json', { encoding : 'utf8' } );
        zhJson = fs.readFileSync( './test/fixtures/temp/zh_TW.json', { encoding : 'utf8' } );
    } );

    test( 'en.json file', () => {
        expect( en ).toBeTruthy();
        expect( enJson ).toEqual( '{"ilovegithub":"i love github but u"}' );
    } );

    test( 'de.json file', () => {
        expect( de ).toBeTruthy();
        expect( deJson ).toEqual( '{"ilovegithub":"was du gesagt"}' );
    } );

    test( 'my.json file', () => {
        expect( my ).toBeTruthy();
        expect( myJson ).toEqual( '{"ilovegithub":"saya pun"}' );
    } );

    test( 'zh.json file', () => {
        expect( zh ).toBeTruthy();
        expect( zhJson ).toEqual( '{"ilovegithub":"我愛 github,但我也愛 git"}' );
    } );
} );
