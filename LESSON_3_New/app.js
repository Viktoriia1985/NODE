const express = require('express');
const mongoose = require('mongoose');

const { config: { PORT, MONGO_CONNECT_URL } } = require('./configs');
const userRouter = require('./routes/user.router');
const authRouter = require('./routes/auth.router');

mongoose.connect(MONGO_CONNECT_URL);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', userRouter);
app.use('/auth', authRouter);

app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`App listen ${ PORT }`);
});
