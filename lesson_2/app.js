//  -----------------------   Методы HTTP запроса  -------------------------------------
//
// HTTP определяет множество методов запроса, которые указывают, какое желаемое действие выполнится для данного
// ресурса. Несмотря на то, что их названия могут быть существительными, эти методы запроса иногда называются
// HTTP глаголами. Каждый реализует свою семантику, но каждая группа команд разделяет общие свойства: так, методы могут быть безопасными, идемпотентными или кешируемыми.
//
// GET
// Метод GET запрашивает представление ресурса. Запросы с использованием этого метода могут только извлекать данные.
// HEAD
// HEAD запрашивает ресурс так же, как и метод GET, но без тела ответа.
// POST
// POST используется для отправки сущностей к определённому ресурсу. Часто вызывает изменение состояния или
// какие-то побочные эффекты на сервере.
// PUT
// PUT заменяет все текущие представления ресурса данными запроса.
//
// DELETE
// DELETE удаляет указанный ресурс.
// CONNECT
// CONNECT устанавливает "туннель" к серверу, определённому по ресурсу.
//
// OPTIONS
// OPTIONS используется для описания параметров соединения с ресурсом.
// TRACE
// TRACE выполняет вызов возвращаемого тестового сообщения с ресурса.
//
// PATCH
// PATCH используется для частичного изменения ресурса.


const express = require('express');
const expressHbs = require('express-handlebars');
const path = require('path');

const { PORT } = require('./config/variables');
const users = require('./db/users');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'static')));
app.set('view engine', '.hbs');
app.engine('.hbs', expressHbs({ defaultLayout: false }));
app.set('views', path.join(__dirname, 'static'))

app.get('/ping', (req, res) => {
    res.json('Pong')
});

app.get('/', (req, res) => {
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

// app.get('/users', (req, res) => {
//     res.json(
//         [
//             { name: 'Dimas' },
//             { name: 'Vova' },
//         ]
//     )
// });

app.get('/login', (req, res) => {
    res.render('login', {isMale: true});
});

app.get('/users', (req, res) => {
    res.render('users', { userName: 'Viktoriia', users });
});

app.post('/auth', (req, res) => {
    console.log(req.body);
    const { name, password } = req.body;
    res.json('Login OK!');
});

app.get('/users/:user_id', (req, res) => {
    const { user_id } = req.params;
    console.log(req.query);
    const currentUser = users[user_id];

    if (!currentUser) {
        res.status(404).end('User not found')
        return;
    }
    res.json(users[user_id])
});


// app.listen(5000, () => {
//     console.log('App listen 5000')
// });


app.listen(PORT, () => {
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
