var jwt = require('jsonwebtoken');
const createToken = (tokenInfo, tokenKey) => {
    return jwt.sign(tokenInfo, tokenKey, {expiresIn: 60 * 60});
};
const tokenVerify = (token, tokenKey, func) => {
    jwt.verify(token, tokenKey, (err, decoded) => {
        func(err);
    });
};
module.exports = {
    createToken,
    tokenVerify
};