import * as CONSTANTS from '../Constants/Lang';

export const getMessageByType = (type) => {
    const messages = {
        'wrongpassword': CONSTANTS.WRONG_USERNAME_OR_PASSWORD,
        'default': CONSTANTS.UNKNOWN_ERROR,
    };
    return messages[type] || messages.default

};
