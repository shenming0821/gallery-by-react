'use strict'

let getName = Symbol('name');

let obj = {
    getName(){
        return "test-name";
    }
};

console.log(obj.getName());