const jwt = require('../utils/jwt');
const { AUTH_COOKI_NAME, JWT_SECRET } = require('../constants');

exports.auth = async (req, res, next) => {
    const token = req.cookies[AUTH_COOKI_NAME];

    if (token) {
        try {
            const decodedToken = await jwt.verify(token, JWT_SECRET)

            req.user = decodedToken;
            res.locals.isAuthenticated = true;
            res.locals.user = decodedToken;
        } catch (error) {
            res.clearCookie(AUTH_COOKI_NAME);
            return res.status(401).redirect('404');
        }
    }
    next();
};

exports.isAuth = (req, res, next) => {
    if (!req.user) {
        return res.redirect('/auth/login');
    }

    next();
};

