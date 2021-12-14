const User = require('../dataBase/User');
const O_Auth = require('../dataBase/O_Auth');
const ActionToken = require('../dataBase/ActionToken');
const { userNormalizator } = require('../util/user.util');
const { jwtService, emailService, passwordService } = require('../service');
const ActionTokenTypeEnum = require('../configs/action-token-type.enum');
const EmailActionEnum = require('../configs/email-action.enum');
const { FORGOT_PASSWORD } = require('../configs/action-token-type.enum');
const emailActionsEnum = require('../configs/email-action.enum');

module.exports = {
    login: async (req, res, next) => {
        try {
            await req.user.comparePassword(req.body.password); // перевірка чи співпадають паролі за рахунок методу
            // comparePassword

            const tokenPair = jwtService.generateTokenPair();

            const userNormalized = userNormalizator(req.user);

            await O_Auth.create({
                ...tokenPair,
                user_id: userNormalized._id
            });

            res.json({
                user: userNormalized,
                ...tokenPair
            });
        } catch (e) {
            next(e);
        }
    },

    logout: async (req, res, next) => {
        try {
        const users = await O_Auth.deleteMany({user_id: req.user});

            res.json(users);
        } catch (e) {
            next(e);
        }
    },

    refreshToken: async (req, res, next) => {
        try {
            const { user } = req;

            const tokenPair = jwtService.generateTokenPair();

            const userNormalized = userNormalizator(user);

            await O_Auth.create({
                ...tokenPair,
                user_id: userNormalized._id
            });

            res.json({
                user: userNormalized,
                ...tokenPair
            });
        } catch (e) {
            next(e);
        }
    },

    sendMailForgotPassword: async (req, res, next) => {
        try {
            const { email } = req.body;
            const { user } = req;

            const actionToken = jwtService.generateActionToken(ActionTokenTypeEnum.FORGOT_PASSWORD);

            await ActionToken.create({
                token: actionToken,
                token_type: ActionTokenTypeEnum.FORGOT_PASSWORD,
                user_id: user._id
            });

            await emailService.sendMail(
                email,
                EmailActionEnum.FORGOT_PASSWORD,
                { forgotPasswordUrl: `http//localhost:3000/passwordForgot?token=${ actionToken }` });

            res.json('Sent');
        } catch (e) {
            next(e);
        }
    },

    setNewPasswordAfterForgot: async (req, res, next) => {
        try {
            const { _id, name, email } = req.user;

            const { password } = req.body;

            const hashedPassword = await passwordService.hash(password);

            await User.findByIdAndUpdate(_id, { password: hashedPassword });

            await emailService.sendMail(email, emailActionsEnum.SET_NEW_PASSWORD,{ userName: name });

            await O_Auth.deleteMany({ user_id: _id });

            await ActionToken.deleteMany( {user_id: _id, token_type: FORGOT_PASSWORD});

            res.json('Well done');
        } catch (e) {
            next(e);
        }
    },
};

