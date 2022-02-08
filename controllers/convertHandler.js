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
const unitRegex = /[0-9](?=[a-zA-Z])/
const forwardSlashRegex = /\//g

/* const lbRegex = /^lbs$/i
const kgRegex = /^kg$/i
const galRegex = /^gal$/i
const literRegex = /^l$/i
const kmRegex = /^km$/i
const miRegex = /^mi$/i
const nonDigitRegex = /\~|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\-|\=|\+|\{|\}|\[|\]|\;|\'|\"|\:|\?|\>|\<|\,|\s|\`|\_|\|/
const splitRegex = /[a-z]/i
const unitRegex = /[0-9](?=[a-zA-Z])/
const forwardSlashRegex = /\//g
const digitRegex = /[0-9]/g */

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

    // console.log(input);

    // console.log(digitRegex.test(input));
    let unit = input;

  /*  if (digitRegex.test(input)) {
      console.log('i entered digit regex if')
      const splitArr = input.split(unitRegex);
      if (splitArr.length > 2) {
        return 'invalid unit';
      } else {
        console.log('i am here')
        console.log(splitArr[1])
        unit = splitArr[1];
      }
    } */

    
    // console.log(unit);


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
      console.log('i am at else')
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

    const result = `${initNum} ${initUnit} converts to ${returnNum} ${returnUnit}`
    
    return result;
  };
  
}

module.exports = ConvertHandler;
