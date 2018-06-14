import moment from 'moment';

export const getFormattedDate = (stringDate) => moment(stringDate).format('DD/MM/YYYY');

export const formatUserName = (userName = 'John', userSecondName = 'Smith') => {
    const firstName = userName ? userName : 'John';
    const lastName = userName ? userSecondName : 'Smith';

    return ({
        userBadge: () => ((firstName.substring(0, 1) + lastName.substring(0, 1)).toUpperCase()),
        userName: () => ((firstName.substring(0, 1).toUpperCase() + '. ' + lastName.charAt(0).toUpperCase() + lastName.slice(1)))
    })
};
