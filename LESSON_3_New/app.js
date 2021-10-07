const express = require('express');
const mongoose = require('mongoose');

const { config: { PORT, MONGO_CONNECT_URL } } = require('./configs');

const app = express();

mongoose.connect(MONGO_CONNECT_URL);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const userRouter = require('./routes/user.router');

app.use('/users', userRouter);

app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`App listen ${ PORT }`);
});
