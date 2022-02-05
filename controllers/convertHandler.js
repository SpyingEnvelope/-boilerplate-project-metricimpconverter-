const e = require("express")
const { init } = require("../server")

const lbRegex = /[0-9]?lbs/i
const kgRegex = /[0-9]?kg/i
const galRegex = /[0-9]?gal/i
const literRegex = /[0-9]?l/i
const kmRegex = /[0-9]?km/i
const miRegex = /[0-9]?mi/i
const nonDigitRegex = /\~|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\-|\=|\+|\{|\}|\[|\]|\;|\'|\"|\:|\?|\>|\<|\,|\s|\`|\_|\|/
const splitRegex = /[a-z]/i

function ConvertHandler() {
  
  this.getNum = function(input) {

    function evalStr(str) {
      return new Function('return ' + str)();
    }

    let splitNum = input.split(splitRegex)[0];
    let result;

    if (splitNum) {
      result = splitNum;
    } else {
      result = 1;
    }

    if (nonDigitRegex.test(splitNum)) {
      return 'invalid number';
    };

    result = evalStr(result);
    return result;
  };
  
  this.getUnit = function(input) {

    if (lbRegex.test(input)) {
      return 'lbs';
    } else if (kgRegex.test(input)) {
      return 'kg';
    } else if (galRegex.test(input)) {
      return 'gal';
    } else if (kmRegex.test(input)) {
      return 'km';
    } else if (miRegex.test(input)) {
      return 'mi';
    } else if (literRegex.test(input)) {
      return 'L';
    } else {
      return 'invalid unit';
    }
  };
  
  this.getReturnUnit = function(initUnit) {
    
    switch(initUnit) {
      case 'lbs':
        return 'kg';
        break;
      case 'kg':
        return 'lbs';
        break;
      case 'gal':
        return 'L';
        break;
      case 'km':
        return 'mi';
        break;
      case 'mi':
        return 'km';
        break;
      case 'L':
        return 'gal';
        break;
      default:
        return 'invalid unit';
    }
  };

  this.spellOutUnit = function(unit) {
    let result;

    
    switch(unit) {
      case 'lbs':
        result = 'pounds';
        break;
      case 'kg':
        result = 'kilograms';
        break;
      case 'gal':
        result = 'gallons';
        break;
      case 'km':
        result = 'kilometers';
        break;
      case 'mi':
        result = 'miles';
        break;
      case 'L':
        result = 'liters';
        break;
      default:
        return 'invalid Unit';
    }
    
    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lToGal = 0.26417;
    const kgToLbs = 2.20462;
    const kmToMi = 0.62137;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;

    switch(initUnit) {
      case 'lbs':
        return initNum * lbsToKg;
        break;
      case 'kg':
        return initNum * kgToLbs;
        break;
      case 'gal':
        return initNum * galToL;
        break;
      case 'km':
        return initNum * kmToMi;
        break;
      case 'mi':
        return initNum * miToKm;
        break;
      case 'L':
        return initNum * lToGal;
        break;
      default:
        return 'invalid Unit';
    }
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {

/*    switch(initUnit) {
      case 'lbs':
        initialUnit = 'pounds';
        returnedUnit = 'kilograms';
        break;
      case 'kg':
        initialUnit = 'kilograms';
        returnedUnit = 'pounds';
        break;
      case 'gal':
        initialUnit = 'gallons';
        returnedUnit = 'liters';
        break;
      case 'km':
        initialUnit = 'kilometers';
        returnedUnit = 'miles';
        break;
      case 'mi':
        initialUnit = 'miles';
        returnedUnit = 'kilometers';
        break;
      case 'L':
        initialUnit = 'liters';
        returnedUnit = 'gallons';
        break;
      default:
        return 'invalid Unit';
    } */

    const result = `${initNum} ${initUnit} converts to ${returnNum} ${returnUnit}`
    
    return result;
  };
  
}

module.exports = ConvertHandler;
