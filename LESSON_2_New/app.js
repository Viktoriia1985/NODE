const express = require('express');
const expressHbs = require('express-handlebars');
const path = require('path');

const { variables: { PORT } } = require('./config');
const { users }= require('./db');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'static')));
app.set('view engine', '.hbs');
app.engine('.hbs', expressHbs({ defaultLayout: false }));
app.set('views', path.join(__dirname, 'static'));

app.get('/ping', (req, res) => {
    res.json('Pong');
});

app.get('/', (req, res) => {
    // console.log(req);

    // res.end('finish');
    // res.send('<h1>HELLO</h1>');
    // res.json({name: 'Viktoriia'});

    // res.write('Hello ');
    // res.write('World');
    // res.write(`Hello big World`);
    // res.end();

    res.status(404).end('Not found');
    //  https://developer.mozilla.org/ru/docs/Web/HTTP/Status
});

app.get('/users', (req, res) => {
    res.render('users', { userName: 'Viktoriia', users });
});

app.get('/login', (req, res) => {
    res.render('login', { isMale: false });
});

app.get('/users/:user_id', (req, res) => {
    const { user_id } = req.params;
    console.log(req.query);
    const currentUser = users[user_id];

    if (!currentUser) {
        res.status(404).end('User Not Found');
        return;
    }
    res.json(currentUser);
});

app.post('/auth', (req, res) => {
    console.log(req.body);
    const { name, password } = req.body;
    res.json('LOGIN')
});

app.listen(PORT, () => {
    console.log('App listen 5000', PORT);
});



