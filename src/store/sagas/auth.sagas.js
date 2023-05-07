import { call, all, takeLatest, put } from 'redux-saga/effects';
import { loginUserActions, logoutUserActions } from '../actions/auth/auth.actions';
import { loginUserEndpoint } from '../../services/endpoints/auth.endpoints';
import axios from 'axios';

function* loginUserWorker(action) {
    // const token = action.payload;
    try {
        // const { data } = yield call(
        //     loginUserEndpoint,
        //     token,
        // );
        // yield localStorage.setItem('token', data.token);
        // yield put(loginUserActions.success(data.token));
        // yield localStorage.setItem('token', token);
        // yield put(loginUserActions.success(token));

        // TODO remove below, uncomment above
        const profileObj = yield JSON.parse(localStorage.getItem('profileObj'));
        yield localStorage.setItem('token', profileObj.googleId)
        const { data } = yield call(axios.get, `http://localhost:5000/users/${profileObj.googleId}`);
        yield put(loginUserActions.success(profileObj));
        console.log(data);
    } catch (error) {
        yield put(loginUserActions.failure(error.message));
    }
}

function* logoutUserWorker() {
    try {
        yield localStorage.removeItem('token');
        yield put(logoutUserActions.success());
    } catch (error) {
        yield put(logoutUserActions.failure(error.message));
    }
}

export function* authorizationSaga() {
    yield all([
        takeLatest(loginUserActions.request().type, loginUserWorker),
        takeLatest(logoutUserActions.request().type, logoutUserWorker),
    ]);
}
