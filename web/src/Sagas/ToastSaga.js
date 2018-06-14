import { getMessageByType } from '../../../web/src/Common/Lib/ErrorTypes';
import {toastr} from 'react-redux-toastr';

const toastrOptions = {
    timeOut: 5000,
    position: 'top-left',
    newestOnTop: false,
    transitionIn: 'fadeIn',
    transitionOut: 'fadeOut',
    progressBar: false,
    width: '100%',
};

export function* errorToast(action) {
    const { errorType } = action;
    yield toastr.error(getMessageByType(errorType), toastrOptions);
}