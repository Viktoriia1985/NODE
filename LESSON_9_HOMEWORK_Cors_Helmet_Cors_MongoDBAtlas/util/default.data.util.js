const User = require('../dataBase/User');
const { ADMIN } = require('../configs/user-roles.enum');

module.exports = async () => {
    const user = await User.findOne({role: ADMIN});

    if (!user) {
        await User.createUserWithHashPassword({
            name: 'Viktoriia',
            email: 'flightsspb@gmail.com',
            password: '123!_World',
            role: ADMIN
        });
    }
};
