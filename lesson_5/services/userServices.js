const User = require('../dataBase/User');

module.exports = {
    getAllUsers: () => User.find(),
    getOne: (email) => User.findOne({ email }),
    getUserById: (_id) => User.findById(_id),
    createUser: (data) => User.create(data),
    updateUser: (_id, data) => User.updateOne({ _id }, data),
    deleteUser: (_id) => User.deleteOne({ _id }),
};
