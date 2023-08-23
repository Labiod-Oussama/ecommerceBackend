const jwt = require('jsonwebtoken');
const maxAge = 60 * 60 * 24
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: maxAge
    })
}
module.exports.createToken = createToken;