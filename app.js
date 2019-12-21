// console.log('hello world');

//var sum = function(x, y) {
//     return x + y;
//}

// var sum = (x, y) => x + y;

// var utils = require('./utils');
// var { sum, PI } = utils;

var MD5 = require('md5.js');
var { sum, PI } = require('./utils');

var x = 10;
var y = 15;
// var s = sum(x, y);
// var s = utils.sum(x, y + utils.PI);
var s = sum(x, y + PI);
console.group(`${x} + ${y} = ${s}`);

var raw_pwd = '123456';
var md5_pwd = new MD5().update(raw_pwd).digest('hex');
console.log(md5_pwd);