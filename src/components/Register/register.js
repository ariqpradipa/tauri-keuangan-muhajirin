import React from 'react';

var sha256 = require('js-sha256').sha256;


const Register = () => {

    var scramble = "MasjidAl-Muhajirin"

    var username = scramble + "user" + scramble;
    console.log("Username: ", username);

    console.log(sha256.hex(username))


    var password = scramble + "user123" + scramble;
    console.log("Password: ", password);

    console.log(sha256.hex(password))
    
}

export default Register;