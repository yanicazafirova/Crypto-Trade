const router = require('express').Router();

const homeController = require('./controllers/homeController');
const authController = require('./controllers/authController');
//const cryptoController = require('./controllert cryptoController');

router.use(homeController);
router.use('/auth', authController);
//router.use('/crypto', cryptoController);
router.get('/*', (req, res) => {
    res.render('home/404');
});

module.exports = router;