//  цьому файлі створюється бізнес логіка

const db = require('../db/users');

module.exports = {
    getSingleUser: (req, res) => {
        const { user_id } = req.params;
        const user = db[user_id];

        if (!user) {
            res.status(404).json('User not found');
            return;
        }
        res.json(user);
    },
    getAllUsers: () => {
        // console.log(req.body);
        // res.json('HELLO TO ALL USERS');
        // const {} = req.params;
        // const users = db[{}];
        //
        // res.json(users);

    },
    createUser: (req, res) => {
        // eslint-disable-next-line no-console
        console.log(req.body);
        res.json('OK');
    }
};
