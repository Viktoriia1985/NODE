const express = require('express');
const expressHbs = require('express-handlebars');
const path = require('path');

// eslint-disable-next-line no-console
console.log(expressHbs);
// eslint-disable-next-line no-console
console.log(path);

const { PORT } = require('./config/variables');
const users = require('./db/users');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const { authRouter, userRouter } = require('./routes');

app.use('/auth', authRouter);
app.use('/users', userRouter);

app.get('/ping', (req, res) => {
    res.json('Pong');
});

app.get('/users/:user_id', (req, res) => {
    const { user_id } = req.params;
    // eslint-disable-next-line no-console
    console.log(req.query);
    const currentUser = users[user_id];

    if (!currentUser) {
        res.status(404).end('User not found');
        return;
    }
    // res.json(users[user_id])
    res.json(currentUser);
});

app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log('App listen', PORT);
});

// BAD !!
app.put('/updateUser/:user_id');
app.post('/insertUser/:user_id');
app.get('/user/single/:user_id');
app.get('/user/all');

// ---------------     Коды ответа HTTP (https://developer.mozilla.org/ru/docs/Web/HTTP/Status) ---------------
//
// Код ответа (состояния) HTTP показывает, был ли успешно выполнен определённый HTTP запрос. Коды сгруппированы в 5 классов:
//
// Информационные 100 - 199
// Успешные 200 - 299
// Перенаправления 300 - 399
// Клиентские ошибки 400 - 499
// Серверные ошибки 500 - 599
//
