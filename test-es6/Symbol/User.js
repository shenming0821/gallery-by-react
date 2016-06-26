'use strict';

let getName = Symbol('getName');

module.exports = class User{
    //相对私有的方法
    [getName](){
        return 'test-name';
    };

    print(){
        console.log(this[getName]());
    };
};