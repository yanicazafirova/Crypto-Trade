const router = require('express').Router();

const cryptoService = require('../services/cryptoService');
const { isAuth } = require('../middlewares/authMiddleware');
const { getErrorMessage } = require('../utils/errorMessage');

router.get('/create', isAuth, (req, res) => {
    res.render('crypto/create');
});

router.post('/create', async (req, res) => {
    const { name, image, price, description, paymentMethod } = req.body;

    try {
        await cryptoService.create({ name, image, price, description, paymentMethod, owner: req.user._id });
        res.redirect('/crypto/catalog');
    } catch (error) {
        console.log(error);
        res.render('crypto/create', { error: getErrorMessage(error) });
    }
});

router.get('/catalog', async (req, res) => {
    const items = await cryptoService.getAll().lean();
    console.log(items);
    res.render('crypto/catalog', { items });
});

router.get('/:cryptoId/details', async (req, res) => {
    const item = await cryptoService.getOneDetailed(req.params.cryptoId).lean();
    const isAuthor = item.owner._id == req.user?._id;
    const isBought = item.buyCrypto?.some(x => x._id == req.user?._id);

    res.render('crypto/details', { ...item, isAuthor, isBought });
});

router.get('/:cryptoId/buy', isAuth, async (req, res) => {
    const item = await cryptoService.getOneDetailed(req.params.cryptoId);
    item.buyCrypto.push(req.user._id);
    await item.save();
    res.redirect(`/crypto/${req.params.cryptoId}/details`);
});

router.get('/:cryptoId/edit', isAuth, async (req, res) => {
    const item = await cryptoService.getOne(req.params.cryptoId).lean();
    item.options = createOptions(item.paymentMethod);
    res.render('crypto/edit', { ...item });
});

router.post('/:cryptoId/edit', isAuth, async (req, res) => {
    try {
        await cryptoService.update(req.params.cryptoId, req.body);
        res.redirect(`/crypto/${req.params.cryptoId}/details`);
    } catch (error) {
        res.render('crypto/edit', { error: getErrorMessage(error) });
    }
});

router.get('/search', async (req, res) => {
    let cryptoText = req.query.name;
    let cryptoPay = req.query.paymentMethod;

    let crypto = await cryptoService.search(cryptoText, cryptoPay);

    if (crypto == undefined) {
        crypto = await cryptoService.getAll().lean();
    }

    console.log(crypto);

    res.render('crypto/search', { crypto });
});

function createOptions(paymentMethod) {
    return [
        { content: 'Crypto-wallet', value: 'crypto-wallet' },
        { content: 'Credit-card', value: 'credit-card' },
        { content: 'Debit-card', value: 'debit-card' },
        { content: 'Paypal', value: 'paypal' },
    ].map(x => (x.value === paymentMethod ? { ...x, selected: 'selected' } : x));
}


module.exports = router;