const path = require('path');
const db = path.join('__dirname', '../', 'db', 'users.json');
const { readDateBase, writeToDateBase } = require('../helper/user.helper');

module.exports = {
    getUsers: async (req, res) => {
        const users = await readDateBase(db);
        res.json(JSON.parse(users));
    },

    getUserById: async (req, res) => {
        const { user_id } = req.params;
        const users = await readDateBase(db);
        res.json(JSON.parse(users).find(item => item.id === +user_id));
    },

    createUser: async (req, res) => {
        const users = JSON.parse(await readDateBase(db));
        users.push({ ...req.body, id: users[users.length - 1].id + 1 });
        await writeToDateBase(db, users);
        res.json(users);
    },

    deleteUser: async (req, res) => {
        const { user_id } = req.params;
        const users = await readDateBase(db);
        const newUsers = JSON.parse(users).filter(item => item.id !== +user_id);
        await writeToDateBase(db, newUsers);
        res.json(newUsers);
    }
};
