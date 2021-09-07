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
const users = require('./db/users');


const app = express();


app.use(express.static(path.join(__dirname, 'static')));
app.set('view engine', '.hbs');
app.engine('.hbs', expressHbs({ defaultLayout: false }));
app.set('views', path.join(__dirname, 'static'));

app.get('/', (req, res) => {
    res.status(404).end('Not found')
});

app.get('/users', (req, res) => {
    res.render('users', {userName: 'Vika'});
})


app.listen(PORT, () => {
    console.log('App listen', PORT);
})
