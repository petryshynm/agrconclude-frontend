import { call, all, takeLatest, put } from 'redux-saga/effects';
import { loginUserActions, logoutUserActions } from '../actions/auth/auth.actions';
import { loginUserEndpoint } from '../../services/endpoints/auth.endpoints';

function* loginUserWorker(action) {
    const token = action.payload;
    try {
        const { data } = yield call(
            loginUserEndpoint,
            token,
        );
        yield localStorage.setItem('token', data.token);
        yield put(loginUserActions.success(data.token));
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
