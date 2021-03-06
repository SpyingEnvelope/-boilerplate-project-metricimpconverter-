const e = require("express")
const { init } = require("../server")

const lbRegex = /^lbs$/i
const kgRegex = /^kg$/i
const galRegex = /^gal$/i
const literRegex = /^l$/i
const kmRegex = /^km$/i
const miRegex = /^mi$/i
const nonDigitRegex = /\~|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\-|\=|\+|\{|\}|\[|\]|\;|\'|\"|\:|\?|\>|\<|\,|\s|\`|\_|\|/
const splitRegex = /[a-z]/i
const unitRegex = /[0-9](?=[a-zA-Z])/
const forwardSlashRegex = /\//g
const digitRegex = /[0-9]/

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
    } else if (splitNum.match(forwardSlashRegex)) {
      if (splitNum.match(forwardSlashRegex).length > 1) {
        return 'invalid number';
      }
    }

    result = evalStr(result);
    return result;
  };
  
  this.getUnit = function(input) {

    let unit = input;

    if (digitRegex.test(unit)) {
      unit = unit.split(unitRegex)[1];
      if (lbRegex.test(unit)) {
        return 'lbs';
      } else if (kgRegex.test(unit)) {
        return 'kg';
      } else if (galRegex.test(unit)) {
        return 'gal';
      } else if (kmRegex.test(unit)) {
        return 'km';
      } else if (miRegex.test(unit)) {
        return 'mi';
      } else if (literRegex.test(unit)) {
        return 'L';
      } else {
        return 'invalid unit';
      }
    } else {
      if (lbRegex.test(unit)) {
        return 'lbs';
      } else if (kgRegex.test(unit)) {
        return 'kg';
      } else if (galRegex.test(unit)) {
        return 'gal';
      } else if (kmRegex.test(unit)) {
        return 'km';
      } else if (miRegex.test(unit)) {
        return 'mi';
      } else if (literRegex.test(unit)) {
        return 'L';
      } else {
        return 'invalid unit';
      }
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
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;

    let result;

    switch(initUnit) {
      case 'lbs':
        result = initNum * lbsToKg;
        return result.toFixed(5) * 1;
        break;
      case 'kg':
        result = initNum / lbsToKg
        return result.toFixed(5) * 1;
        break;
      case 'gal':
        result = initNum * galToL;
        return result.toFixed(5) * 1;
        break;
      case 'km':
        result = initNum / miToKm;
        return result.toFixed(5) * 1;
        break;
      case 'mi':
        result = initNum * miToKm;
        return result.toFixed(5) * 1;
        break;
      case 'L':
        result = initNum / galToL;
        return result.toFixed(5) * 1;
        break;
      default:
        return 'invalid Unit';
    }
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {

    const result = `${initNum} ${initUnit} converts to ${returnNum} ${returnUnit}`
    
    return result;
  };
  
}

module.exports = ConvertHandler;
