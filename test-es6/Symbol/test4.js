'use strict'
let name1 = Symbol.for('name');
let name2 = Symbol.for('name');

console.log(name1 === name2);

console.log(Symbol.keyFor(name1));//返回字符串