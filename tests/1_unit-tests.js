const { AssertionError } = require('chai');
const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
    test('convertHandler should correctly read a whole number input', () => {
        assert.equal(convertHandler.getNum('12lbs'), 12);
        assert.equal(convertHandler.getNum('1l'), 1);
        assert.equal(convertHandler.getNum('41mil'), 41);
    })

    test('convertHandler should correctly read a decimal number input', () => {
        assert.equal(convertHandler.getNum('2.1lbs'), 2.1);
        assert.equal(convertHandler.getNum('24.lbs'), 24);
        assert.equal(convertHandler.getNum('25.4l'), 25.4);
    })

    test('convertHandler should correctly read a fractional input', () => {
        assert.equal(convertHandler.getNum('1/4lbs'), 0.25);
        assert.equal(convertHandler.getNum('5/16mi'), 0.3125);
        assert.equal(convertHandler.getNum('1/10l'), 0.10);
    })

    test('convertHandler should correctly read a fractional input with a decimal', () => {
        assert.equal(convertHandler.getNum('24.5/100lbs'), 0.245);
        assert.equal(convertHandler.getNum('325.42/100km'), 3.2542);
        assert.equal(convertHandler.getNum('1.4/10mi'), 1.4/10);
    })

    test('convertHandler should correctly return an error on a double-fraction (i.e. 3/2/3)', () => {
        assert.equal(convertHandler.getNum('3.2/4/5lbs'), 'invalid number');
        assert.equal(convertHandler.getNum('10//km'), 'invalid number');
        assert.equal(convertHandler.getNum('32/4/5/6/7/2/1l'), 'invalid number');
    })

    test('convertHandler should correctly default to a numerical input of 1 when no numerical input is provided', () => {
        assert.equal(convertHandler.getNum('lbs'), 1);
        assert.equal(convertHandler.getNum('l'), 1);
        assert.equal(convertHandler.getNum('mi'), 1);
    })

    test('convertHandler should correctly read each valid input unit', () => {
        assert.equal(convertHandler.getUnit('32lbs'), 'lbs');
        assert.equal(convertHandler.getUnit('42/4kg'), 'kg');
        assert.equal(convertHandler.getUnit('33/1l'), 'L');
        assert.equal(convertHandler.getUnit('55.1/2gal'), 'gal');
        assert.equal(convertHandler.getUnit('22.5mi'), 'mi');
        assert.equal(convertHandler.getUnit('1km'), 'km');
    })

    test('convertHandler should correctly return an error for an invalid input unit', () => {
        assert.equal(convertHandler.getUnit('32wow'), 'invalid unit');
        assert.equal(convertHandler.getUnit('32lbsowrlfds'), 'invalid unit');
        assert.equal(convertHandler.getUnit('wow'), 'invalid unit');
        assert.equal(convertHandler.getUnit('32kges'), 'invalid unit');
        assert.equal(convertHandler.getUnit('32liters'), 'invalid unit');
    })

    test('convertHandler should return the correct return unit for each valid input unit', () => {
        assert.equal(convertHandler.getUnit('lbs'), 'lbs');
        assert.equal(convertHandler.getUnit('2kg'), 'kg');
        assert.equal(convertHandler.getUnit('30mi'), 'mi');
        assert.equal(convertHandler.getUnit('40l'), 'L');
        assert.equal(convertHandler.getUnit('40gal'), 'gal');
        assert.equal(convertHandler.getUnit('100km'), 'km');
    })
});