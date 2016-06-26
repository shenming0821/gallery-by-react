'use strict';
let name = Symbol('name');

let obj = {
    age: 22,
    [name]: 'username'
}

// console.log(Object.getOwnPropertyNames(obj));
// console.log(Object.keys(obj)); // ['age']


// for (var key in obj) {
//     console.log(key);
// } // age

let key = Object.getOwnPropertySymbols(obj)[0];
console.log(key); // Symbol(name)