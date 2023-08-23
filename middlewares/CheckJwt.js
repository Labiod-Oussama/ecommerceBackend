const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET;
const verifyToken = (token) => {
    try {
        const decodedToken = jwt.verify(token, secretKey);
        return decodedToken;
    } catch (err) {
        console.error('Error verifying token:', err);
        return null;
    }
};
module.exports = {
    verifyToken
};