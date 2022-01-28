const emailActionsEnum = require('../configs/email-action.enum');

module.exports = {
    [emailActionsEnum.WELCOME]: {
        templateName: 'welcome',
        subject: 'Welcome !!'
    },
    [emailActionsEnum.ORDER_CONFIRMED]: {
        templateName: 'order-confirmed',
        subject: 'Cool!'
    },
    [emailActionsEnum.USER_BLOCKED]: {
        templateName: 'us-b',
        subject: 'oops'
    },
    [emailActionsEnum.FORGOT_PASSWORD]: {
        templateName: 'forgot-password',
        subject: 'Everybody forgot something. Dont worry)'
    },
    [emailActionsEnum.SET_NEW_PASSWORD]: {
        templateName: 'set-new-password',
        subject: 'Password was changed'
    }
};
