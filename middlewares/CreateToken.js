const jwt = require('jsonwebtoken');
const maxAge = 60 * 60 * 24
const createToken = (id) => {
    return jwt.sign({ id }, 'Oussama LD', {
        expiresIn: maxAge
    })
}
module.exports.createToken=createToken;