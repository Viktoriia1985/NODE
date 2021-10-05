// Зробити логінацію, реєстрацію і список усіх юзерів<br>
//             /login<br>
//             /registration <br>
//             /users<br>
//             /user<br>
//             Переірити чи присутній e-mail в базі,<br>
//             якщо присутній, то перекинути на сторінку юзерів,<br>
//             якщо ні - то на сторінку реєстрації.
//

const express = require('express');
const expressHbs = require('express-handlebars');
const path = require('path');
const { promisify } = require('util');

const { variables: { PORT } } = require('./config');

const app1 = express();

const fs = require('fs');
const readPromisify = promisify(fs.readFile);
const writePromisify = promisify(fs.writeFile);

app1.use(express.json());
app1.use(express.urlencoded({ extended: true }));

app1.use(express.static(path.join(__dirname, 'static')));
app1.set('view engine', '.hbs');
app1.engine('.hbs', expressHbs({ defaultLayout: false }));
app1.set('views', path.join(__dirname, 'static'));

app1.get('/', (req, res) => {
    res.render('homeTask')
});

const readFile = async () => {
    const data = await readPromisify(path.join(__dirname, 'db', 'users.json'));
    return JSON.parse(data.toString());
}

const writeFile = (arr) => {
    return writePromisify(path.join(__dirname, 'db', 'users.json'), JSON.stringify(arr));
}

app1.get('/users', async (req, res) => {
       const users = await readFile();

    res.render('users', { users });
})

app1.post('/users',  (req, res) => {
    const { email, password } = req.body;

    const users = await readFile();

    const user = users.find(user => user.email === email && user.password === password);

    if (!user) {
        res.redirect('/registration');
        retur
    }

    res.redirect('/users');
    res.end();
});

app1.get('/users/:user_id', async (req, res) => {
    const { user_id } = req.params;

    const users = await readFile();

    const currentUser = users[user_id];

    if (!currentUser) {
        res.status(404).end('User not found');
        return;
    }
    res.render('user_id', { currentUser });
});

app1.get('/login', (req, res) => {
    res.render('login');
});

app1.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const users  = await readFile();

    const user = users.find(user => user.email === email && user.password === password);

    if (!user) {
        res.redirect('/registration');
        return;
    }

    res.redirect('/users');
    res.end();
});


app1.get('/registration', (req, res) => {
    res.render('registration');
});

app1.post('/registration', async (req, res) => {
    const { body, body: { email, password, name, age } } = req;

    if (!email || !password || !name || !age) {
        res.status(400).end('BAD REQUEST');
        return;
    }

    const users = await readFile();

    const userForRegister = users.find(user => user.email === body.email);

    if (userForRegister) {
        res.status(404).end('EMAIL IS EXIST!');
        return;
    }

    users.push(body);
    await writeFile(users);

    res.redirect('/login');
    res.end();
});

app1.listen(PORT, () => {
    console.log('App listen', PORT);
});

