const User = require('../dataBase/User');
const { ADMIN } = require('../configs/user-roles.enum');


module.exports = async () => {
    const user = await User.findOne({ role: ADMIN });

    if (!user) {
        await User.createUserWithHashPassword({
            name: 'Admin',
            email: 'Admin@gmail.com',
            password: '123!_Admin',
            role: ADMIN
        });
    }
};
