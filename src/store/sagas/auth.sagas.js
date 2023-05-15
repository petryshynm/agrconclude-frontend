import { call, all, takeLatest, put } from 'redux-saga/effects';
import { editProfileActions, getProfileActions, loginUserActions, logoutUserActions } from '../actions/auth/auth.actions';
import { loginUserEndpoint } from '../../services/endpoints/auth.endpoints';
import { editProfileEndpoint, getProfileEndpoint } from '../../services/endpoints/user.endpoints';

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

function* editProfileWorker(action) {
    try {
      const { data } = yield call(editProfileEndpoint, action.payload)
      yield put(editProfileActions.success(data));
    } catch (error) {
      yield put(editProfileActions.failure(error.message));
    }
  };
  
  function* getProfileWorker(action) {
    try {
      const { data } = yield call(getProfileEndpoint, action.payload)
      yield put(getProfileActions.success(data));
    } catch (error) {
      yield put(getProfileActions.failure(error.message));
    }
  };

export function* authorizationSaga() {
    yield all([
        takeLatest(loginUserActions.request().type, loginUserWorker),
        takeLatest(logoutUserActions.request().type, logoutUserWorker),
        takeLatest(editProfileActions.request().type, editProfileWorker),
        takeLatest(getProfileActions.request().type, getProfileWorker),
    ]);
}
