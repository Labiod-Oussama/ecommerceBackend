const jwt = require('jsonwebtoken');
const secretKey = 'Oussama LD';
const verifyToken = (token) => {
    try {
        const decodedToken = jwt.verify(token, secretKey);
        return decodedToken;
    } catch (err) {
        console.error('Error verifying token:', err);
        return null;
    }
};
module.exports={
    verifyToken
};