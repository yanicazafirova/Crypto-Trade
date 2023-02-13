const mongoose = require('mongoose');
const { CONNECTION_STRING } = require('../constants');


exports.databaseInit = () => {

    mongoose.set('strictQuery', false);
    console.log('DB connected!');

    return mongoose.connect(CONNECTION_STRING);
};