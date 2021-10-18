module.exports = {
    userNormalizator: (userToNormalize) => {
        const fieldsToRemove = ['password'];

        userToNormalize = userToNormalize.toObject();

        fieldsToRemove.forEach((field) => delete userToNormalize[field]);

        return userToNormalize;
    }
};
