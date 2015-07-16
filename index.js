'use strict';

/***
 * via: http://docs.mongodb.org/manual/reference/object-id/
 *
 * ObjectId is a 12-byte BSON type, constructed using:
 *   a 4-byte value representing the seconds since the Unix epoch,
 *   a 3-byte machine identifier,
 *   a 2-byte process id, and
 *   a 3-byte counter, starting with a random value.
 */
var sprint = require('sprint');
module.exports = function simpleObjectId () {

  function pad (string, length) {
    string = string.toString();
    var delta = length - string.length;

    var padder = '';

    if (delta) {
      while (delta--) {
        padder += 0;
      }
    }

    return padder + string;

  }

  function getValue (length) {
    var max = new Array(length + 1).join('f');
    var r = Math.random() * parseInt(max, 16) | 0;
    return pad(r.toString(16), length);
  }

  function genTimestamp () {
    return (+new Date() / 1000 | 0).toString(16);
  }


  return sprint('%s%s%s%s', genTimestamp(), getValue(6), getValue(4), getValue(6));
};
