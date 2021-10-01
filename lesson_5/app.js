const express = require('express');
const mongoose = require('mongoose');

const { PORT, DB_URL } = require('./config/variables');

const app = express();

mongoose.connect(DB_URL);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const { userRouter, carRouter } = require('./routes');

app.get('/ping', (req, res) => res.json('Pong'));
app.use('/users', userRouter);
app.use('/cars', carRouter);
app.use('*', _notFoundError);
app.use(_mainErrorHandler);

app.listen(PORT, () => {
    console.log('App listen', PORT);
});

function _notFoundError(err, req, res, next) {
    next({
        status: err.status || 404,
        message: err.message || 'Not found',
    });
}

// eslint-disable-next-line no-unused-vars
function _mainErrorHandler(err, req, res, next) {
    res
        .status(err.status || 500)
        .json({
            message: err.message
        });
}

// ------------------------------------------------------------------------------------------------------
//  !! BAD !!
// app.put('/updateUser/:user_id');
// app.post('/insertUser/:user_id');
// app.get('/user/single/:user_id');
// app.get('/user/all');

// --------------  Коды ответа HTTP (https://developer.mozilla.org/ru/docs/Web/HTTP/Status) ---------------
//
// Код ответа (состояния) HTTP показывает, был ли успешно выполнен определённый HTTP запрос. Коды
// сгруппированы в 5 классов:
//
// Информационные 100 - 199
// Успешные 200 - 299
// Перенаправления 300 - 399
// Клиентские ошибки 400 - 499
// Серверные ошибки 500 - 599
//
//
//     CREATED: 201,
//     ACCEPTED: 202,
//     NO_CONTENT: 204,
//     BAD_REQUEST: 400,
//     NOT_FOUND: 404,
//     CONFLICT: 409,
//     SERVER_ERROR: 500
//
