'use strict'
class User {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    //// 静态方法
    // User.getClassName = function () {
    //     return 'User';
    // };
    static getClassName() {
        return "User";
    }

    // User.prototype.changeName = function () {
    //     this.name = name;
    // }

    changeName(name) {
        this.name = name;
    }

    changeAge(age) {
        this.age = age;
    }

    get info() {
        return 'name:' + this.name;
    }
}

class Manager extends User{
    constructor(name,age,password){
        super(name,age);//先创造父对象，把所有的方法都指向父对象添加到父对象上
        this.password = password;
    }

    changePassword(password){
        this.password = password;
    }
}