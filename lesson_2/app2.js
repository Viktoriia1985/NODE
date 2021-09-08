
const express = require('express');
const expressHbs = require('express-handlebars');
const path = require('path');

const { PORT } = require('./config/variables');
const users = require('./db/users');

const app2 = express();

app2.use(express.json());
app2.use(express.urlencoded({ extended: true }));

app2.use(express.static(path.join(__dirname, 'static')));
app2.set('view engine', '.hbs');
app2.engine('.hbs', expressHbs({ defaultLayout: false }));
app2.set('views', path.join(__dirname, 'static'))

app2.get('/ping', (req, res) => {
    res.json('Pong')
});

app2.get('/', (req, res) => {
    console.log(req);

    // res.end('finish');
    //res.send('<h1>send HTML</h1>');    //send to browser HTML
    // res.json({name: 'Viktoriia', age: '36'});
    // res.write('HELLO ');
    // res.write('World ');
    // res.write('2021');
    // res.end();
    res.status(404).end('Not found')
});

 app2.get('/users', (req, res) => {
    res.json(
        [
            { name: 'Dimas' },
            { name: 'Vova' },
        ]
    )
});

app2.get('/login', (req, res) => {
    res.render('login', {isMale: true});
});

app2.get('/users', (req, res) => {
    res.render('users', { userName: 'Viktoriia', users });
});

app2.post('/auth', (req, res) => {
    console.log(req.body);
    const { name, password } = req.body;
    res.json('Login OK!');
});

app2.get('/users/:user_id', (req, res) => {
    const { user_id } = req.params;
    console.log(req.query);
    const currentUser = users[user_id];

    if (!currentUser) {
        res.status(404).end('User not found')
        return;
    }
    res.json(users[user_id])
});

// app2.listen(5000, () => {
//     console.log('App listen 5000')
// });

app2.listen(PORT, () => {
    console.log('App listen', PORT);
});


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
