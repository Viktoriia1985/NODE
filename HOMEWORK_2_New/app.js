const express = require('express');

const userRouter = require('./routes/user.router');

const app = express();
const { variables: {PORT} } = require('./config');

app.use(express.json());
app.use(express.urlencoded( {extended: true}));

app.use('/users', userRouter);

app.listen(PORT, () => {
    console.log('App listen 5000', PORT);
});

