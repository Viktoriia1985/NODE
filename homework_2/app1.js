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

const { PORT } = require('./config/variables');
const users = require('./db/users.json');

const app1 = express();

const fs = require('fs');

app1.use(express.json());
app1.use(express.urlencoded({ extended: true }));

app1.use(express.static(path.join(__dirname, 'static')));
app1.set('view engine', '.hbs');
app1.engine('.hbs', expressHbs({ defaultLayout: false }));
app1.set('views', path.join(__dirname, 'static'));

app1.get('/', (req, res) => {
    res.render('homeTask')
});

app1.get('/users', (req, res) => {
    res.render('users', { users });
})

// const usersPath = path.join(__dirname, 'db1', 'users.json');

app1.post('/users', async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);

    const data = await fs.readFileSync(path.join(__dirname, 'db', 'users.json'))
    const users = JSON.parse(data.toString());

    const user = users.find(user => user.email === email && user.password === password);

    if (!user) {
        res.redirect('/registration')
        return;
    }

    res.redirect('/users');
    res.end();
});

app1.get('/users/:user_id', (req, res) => {
    const { user_id } = req.params;
    const currentUser = users[user_id];

    if (!currentUser) {
        res.status(404).end('User not found');
        return;
    }
    res.render('user_id', { currentUser });
});

app1.get('/login', (req, res) => {
    res.render('login')
})

app1.post('/login', async (req, res) => {
    console.log(req.body)
    const { email, password } = req.body;

    const data = await fs.readFileSync(path.join(__dirname, 'db', 'users.json'))
    const users = JSON.parse(data.toString());

    const user = users.find(user => user.email === email && user.password === password)

    if (!user) {
        res.redirect('/registration');
        return;
    }
    res.redirect('/users');
    res.end();
});


app1.get('/registration', (req, res) => {
    res.render('registration');
    console.log(req.body);
});

app1.post('/registration', async (req, res) => {
    const { name, age, email, password } = req.body;
    console.log(req.body);

    const data = await fs.readFileSync(path.join(__dirname, 'db', 'users.json'))
    const users = JSON.parse(data.toString());

    const userForRegister = users.find(user => user.name === name && user.age === age && user.email === email
        && user.password === password);

    if (!userForRegister) {
        res.status(404).end('USER NOT FOUND!');
        users.push(req.body);
        return;
    }

    res.redirect('/users');
    res.end();
});


app1.listen(PORT, () => {
    console.log('App listen', PORT);
})

