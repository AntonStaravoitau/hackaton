import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { getMessageByType } from '../Lib/ErrorTypes';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
    authRequest: ['data'],
    resetPasswordRequest: ['data'],
    resetPasswordSuccess: [
        'token',
    ],
    setHeader: ['token'],
    authSuccess: [
        'token',
        'user'
    ],
    authFailure: ['errorType']
});

export const AuthTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    user: null,
    fetching: null,
    error: null,
    token: null
});

/* ------------- Selectors ------------- */

export const AuthSelectors = {
    selectUser: state => state.auth.user,
    selectToken: state => state.auth.token
};

/* ------------- Reducers ------------- */

export const request = (state) => {
    return state.merge({
        fetching: true,
        error: null,
        user: null,
        token: null
    });
};

export const success = (state, action) => {
    const { token, user } = action;
    return state.merge({
        fetching: false,
        error: null,
        token,
        user
    })
};

export const failure = (state, action) => {
    const { errorType } = action;
    return state.merge({
        fetching: false,
        error: getMessageByType(errorType)
    });
};

export const resetRequest = (state, action) => {
    return state.merge({
        fetching: true,
        error: null,
    });
};

export const resetSuccess = (state, action) => {
    const { token } = action;
    return state.merge({
        fetching: false,
        error: null,
        user: state.user.merge({
            defaultpassword: false
        }),
        token,
    })
};


/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
    [Types.AUTH_REQUEST]: request,
    [Types.AUTH_SUCCESS]: success,
    [Types.AUTH_FAILURE]: failure,
    [Types.RESET_PASSWORD_REQUEST]: resetRequest,
    [Types.RESET_PASSWORD_SUCCESS]: resetSuccess,
});