'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
/*   const lbRegex = /[0-9]?lbs/i
  const kgRegex = /[0-9]?kg/i
  const galRegex = /[0-9]?gal/i
  const kmRegex = /[0-9]?km/i
  const miRegex = /[0-9]?mi/i
  const splitRegex = /[a-z]/i */


  let convertHandler = new ConvertHandler();

  app.get("/api/convert", (req, res, next) => {
    let initNum = convertHandler.getNum(req.query.input);
    let initUnit = convertHandler.getUnit(req.query.input);
    let returnUnit = convertHandler.getReturnUnit(initUnit);
    let spellOutInitUnit = convertHandler.spellOutUnit(initUnit);
    let spellOutReturnUnit = convertHandler.spellOutUnit(returnUnit);
    let returnNum = convertHandler.convert(initNum, initUnit);
    let string = convertHandler.getString(initNum, spellOutInitUnit, returnNum, spellOutReturnUnit);

    if (initNum == 'invalid number' && initUnit == 'invalid unit') {
      res.send('invalid number and unit');
    } else if (initNum == 'invalid number') {
      res.send('invalid number');
    } else if (initUnit == 'invalid unit') {
      res.send('invalid unit');
    } else {
      res.json({ 'initNum': initNum, 'initUnit': initUnit, 'returnNum': returnNum, 'returnUnit': returnUnit, 'string': string});
    }

  })

};
