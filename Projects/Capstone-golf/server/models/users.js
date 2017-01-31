'use strict';
var bcrypt = require('bcrypt');

class User {
    constructor(first_name, last_name, username, email, hashed_password) {
        this.first_name = first_name;
        this.last_name = last_name;
        this.username = username;
        this.email = email;
        this.hashed_password = hashed_password;
    }
    passwordHash(password) {
        //const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, 1);
        this.hashed_password = hash;
    }
    unhashPassword(password) {
        console.log("your password works!", bcrypt.compareSync(password, this.hashed_password));
        return bcrypt.compareSync(password, this.hashed_password);
    }
    password() {
        return this.hashed_password;
    }
}

module.exports = User;
