module.exports = {
    getLogin: (req, res) => {
        try{
            res.json(req.user);
        } catch (e){
            res.json(e.message);
        }
    }
};
