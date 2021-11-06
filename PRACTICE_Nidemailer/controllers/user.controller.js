const { WELCOME } = require('../configs/email-action.enum');
const User = require('../dataBase/User');
const { passwordService, emailService, jwtService } = require('../service');
const userUtil = require('../util/user.util');
const Action = require('../dataBase/Action');
const {ACTION} = require('../configs/token-types.enum');

module.exports = {
    getUsers: async (req, res, next) => {
        try {
            const users = await User.find();

            res.json(users);
        } catch (e) {
            next(e);
        }

    },

    getUserById: async (req, res, next) => {
        try {
            const { user_id } = req.params;
            const user = await User
                .findById(user_id)
                // .select('+password')
                // .select('-email')
                .lean();

            // isPasswordMatched()

            console.log('_____________________________________________');
            console.log(user);
            console.log('_____________________________________________');

            const normalizedUser = userUtil.userNormalizator(user);

            console.log('______________normalizedUser_______________________________');
            console.log(normalizedUser);
            console.log('______________normalizedUser_______________________________');

            res.json(normalizedUser);
        } catch (e) {
            next(e);
        }
    },

    createUser: async (req, res, next) => {
        try {
            const hashedPassword = await passwordService.hash(req.body.password);

            const newUser = await User.create({ ...req.body, password: hashedPassword });

            const token = jwtService.createActionToken();
            await Action.create({token, type:ACTION, user_id:newUser._id});
            await emailService.sendMail(req.body.email, WELCOME, { userName: req.body.name, token });
            res.json(newUser);
        } catch (e) {
            next(e);
        }
    },

    updateUser: (req, res) => {
        res.json('UPDATE USER');
    },

    deleteAccount: (req, res, next) => {
        try {
            console.log('****************************************');
            console.log(req.user);
            console.log('****************************************');
            res.json('OK');
        } catch (e) {
            next(e);
        }
    }
};
