import { put } from 'redux-saga/effects';
import { push } from 'react-router-redux';

export function * navigate (action) {
    yield put(push(action.route));
}