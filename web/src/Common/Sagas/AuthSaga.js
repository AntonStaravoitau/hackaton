import { call, put } from 'redux-saga/effects'
import AuthActions from '../Redux/AuthRedux'
import { MOVE_TO } from '../Constants/Index';

export function* authUser(api, action) {
    const { data } = action;
    // make the call to the api
    const response = yield call(api.requestLogin, data);

    if (response.ok && response.data.user) {
        yield put(AuthActions.authSuccess(response.data.token, response.data.user));
        yield put(AuthActions.setHeader(response.data.token));
        yield put({type: MOVE_TO, route: response.data.user.defaultpassword ? 'ResetPassword' : 'App'});
    } else {
        yield put(AuthActions.authFailure(response.data && response.data.error && response.data.error.type))
    }
}

export function* resetRequest(api, action) {
    const { data } = action;

    // make the call to the api
    const response = yield call(api.requestResetPassword, data);

    if (response.ok) {
        yield put(AuthActions.resetPasswordSuccess(response.data.token));
        yield put({type: MOVE_TO, route: 'App'});
    } else {
        yield put(AuthActions.authFailure(response.data && response.data.error && response.data.error.type))
    }
}

export function* setHeader(api, action) {
    const { token } = action;
    if (token) {
        yield api.setHeader('Authorization', `Bearer ${token}`);
    }
}