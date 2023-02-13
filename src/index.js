const express = require('express');
const cookieParser = require('cookie-parser');

const { PORT } = require('./constants');

const { hbsConfig } = require('./config/handlebars');
const { databaseInit } = require('./config/database');
const { auth } = require('./middlewares/authMiddleware');

const routes = require('./routes');

const app = express();

hbsConfig(app);

//Use '/static' if static files starts with /static
app.use('/static', express.static('public'));

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(auth);

app.use(routes);

databaseInit()
    .then(() => app.listen(PORT, () => console.log(`Server is listening on port ${PORT}...`)))
    .catch((err) => console.log(err.message));
