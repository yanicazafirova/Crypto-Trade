const jwtCallback = require('jsonwebtoken');
const { promisify } = require('util');

const jwt = {
    sign: promisify(jwtCallback.sign),
    verify: promisify(jwtCallback.verify),
};

module.exports = jwt;