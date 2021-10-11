module.exports = {
    authorizationUser: (req, res) => {
        try {
            res.json('Authorisation is successful');
        } catch (e) {
            res.json(e.message);
        }
    }
};
