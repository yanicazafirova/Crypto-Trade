const User = require('../models/User');
const jwt = require('../utils/jwt');
const { JWT_SECRET } = require('../constants');

exports.getSession = (user) => {
    const payload = {
        _id: user._id,
        username: user.username,
    };

    return jwt.sign(payload, JWT_SECRET, { expiresIn: '2h' });
};

exports.register = (userData) => User.create(userData);

exports.login = async (username, password) => {
    const user = await User.findOne({ username });

    if (!user) {
        throw new Error('Email or password dont match!');
    }

    const isValid = await user.validatePassword(password);

    if (!isValid) {
        throw new Error('Email or password dont match!');
    }

    // return this.getSession(user);
    const payload = {
        _id: user._id,
        username: user.username,
    };

    const token = await jwt.sign(payload, JWT_SECRET, { expiresIn: '2h' });

    return token;
};

