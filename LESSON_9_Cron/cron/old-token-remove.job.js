const dayJs = require('dayjs');
const utc = require('dayjs/plugin/utc');

dayJs.extend(utc);

const O_Auth = require('../dataBase/O_Auth');

module.exports = async () => {
    const previousMonth = dayJs.utc().subtract(1, 'day');

    console.log('************ prev Month *****************');
    console.log(previousMonth);
    console.log('************ prev Month *****************');

    const deleteInfo = await O_Auth.deleteMany({
        createdAt: { $lt: previousMonth }
    });
    console.log(deleteInfo);
};
