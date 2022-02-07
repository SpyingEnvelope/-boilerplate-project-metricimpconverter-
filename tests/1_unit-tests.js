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
        assert.equal(convertHandler.getNum('1.3/10mi'), 0.13);
    })
});