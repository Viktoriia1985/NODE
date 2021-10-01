module.exports = {
    CONFLICT: (email) => `Email ${email} is already exist`,
    FORBIDDEN: 'forbidden delete',
    NOT_FOUND: 'user not found',
    UPDATED: (id) => `user with id ${id} is updated successfully`
};
