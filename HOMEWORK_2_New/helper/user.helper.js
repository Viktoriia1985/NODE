const fs = require('fs');
const util = require("util");

const readPromisify = util.promisify(fs.readFile);
const writePromisify = util.promisify(fs.writeFile);

const readDateBase = (db) => readPromisify(db);
const writeToDateBase = (db, data) => writePromisify(db, JSON.stringify(data));

module.exports = {
    readDateBase,
    writeToDateBase
};
