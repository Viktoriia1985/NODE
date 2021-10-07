const express = require('express');


const { PORT } = require('./configs/config');

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const userRouter = require('./routes/user.router');

app.use('/users', userRouter);

app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`App listen ${ PORT }`);
});
