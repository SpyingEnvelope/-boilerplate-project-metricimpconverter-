'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  const lbRegex = /[0-9]?lbs/i
  const kgRegex = /[0-9]?kg/i
  const galRegex = /[0-9]?gal/i
  const kmRegex = /[0-9]?km/i
  const miRegex = /[0-9]?mi/i
  const splitRegex = /[a-z]/i


  let convertHandler = new ConvertHandler();

  app.get("/api/convert", (req, res, next) => {
    console.log(convertHandler);
    let initNum = convertHandler.getNum(req.query.input);
    let initUnit = convertHandler.getUnit(req.query.input);
    let returnUnit = convertHandler.getReturnUnit(initUnit);
    let returnNum = convertHandler.convert(initNum, initUnit);
    let string = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);

    res.json({ 'initNum': initNum, 'initUnit': initUnit, 'returnNum': returnNum, 'returnUnit': returnUnit, 'string': string});
  })

};
