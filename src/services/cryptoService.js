const Crypto = require('../models/Crypto');

exports.create = (cryptoData) => Crypto.create(cryptoData);

exports.update = (cryptoId, newData) => Crypto.findByIdAndUpdate(cryptoId, newData, { runValidators: true });

exports.getAll = () => Crypto.find();

exports.getOneDetailed = (cryptoId) => Crypto.findById(cryptoId).populate('owner').populate('buyCrypto');

exports.getOne = (cryptoId) => Crypto.findById(cryptoId);

exports.search = (cryptoText, cryptoPay) => {
    if (cryptoText) {
        return (Crypto.find({ name: { $regex: cryptoText, $options: 'i' } }).lean());
    }

    if (!cryptoText && cryptoPay) {
        return (Crypto.find({ paymentMethod: cryptoPay }).lean());
    }
}