import { takeLatest, all } from 'redux-saga/effects';
import API from '../Common/Services/Api';

/* ------------- Types ------------- */

import { AuthTypes } from '../Common/Redux/AuthRedux';
import { MOVE_TO } from '../Common/Constants/Index';
import { errorToast } from './ToastSaga';

/* ------------- Sagas ------------- */

import { authUser, resetRequest, setHeader } from '../Common/Sagas/AuthSaga';
import { navigate } from './NavigateSagas';

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = API.create();

/* ------------- Connect Types To Sagas ------------- */

export default function* root() {
    yield all([
        // some sagas only receive an action
        takeLatest(MOVE_TO, navigate),

        // some sagas receive extra parameters in addition to an action
        takeLatest(AuthTypes.AUTH_FAILURE, errorToast),
        takeLatest(AuthTypes.AUTH_REQUEST, authUser, api),
        takeLatest(AuthTypes.SET_HEADER, setHeader, api),
        takeLatest(AuthTypes.RESET_PASSWORD_REQUEST, resetRequest, api),
    ])
}
