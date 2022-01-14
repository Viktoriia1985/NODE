const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config({ path: '../.env' });

const { MONGO_CONNECT_URL, PORT } = require('./configs/config');

const app = express();

mongoose.connect(MONGO_CONNECT_URL);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const { authRouter, userRouter } = require('./routes');

app.use('/auth', authRouter);
app.use('/users', userRouter);
// eslint-disable-next-line no-unused-vars
app.use('*', (err, req, res, next) => {
    res
        .status(err.status || 500)
        .json({
            msg: err.message
        });
});

app.listen(PORT, () => {
    console.log(`App listen ${PORT}`);
});

function _configureCors(origin, callback) {
    const whiteList = 'http:300;http:4200'.split(';');

    if(!whiteList.includes(origin)) {
        return callback( )
    }
}
