const cron = require('node-cron');

const removedOldTokens = require('./old.token.remove');

module.exports = () => {
    cron.schedule('*/10 * * * * *', () => {
        console.log('Cron started at', new Date().toISOString());
        removedOldTokens();
        console.log('Cron finished at', new Date().toISOString());
    });
};
