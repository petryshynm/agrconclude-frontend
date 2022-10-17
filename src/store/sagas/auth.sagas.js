import { call, all, takeLatest, put } from 'redux-saga/effects';
import { loginUserFailure, 
    loginUserSuccess, 
    logoutUserFailure, 
    logoutUserSuccess, 
} from '../actions/auth/auth.actions';
import { AuthTypes } from '../actions/auth/auth.types';
import { loginUserEndpoint, } from '../../services/endpoints/auth.endpoints';
import { getAuthRole } from '../../services/utils';

function* loginUserWorker(action) {
    const body = action.payload;
    try {
        const { data } = yield call(
            loginUserEndpoint,
            body,
        );
        console.log(data)
        yield localStorage.setItem('token', data.data);
        yield put(loginUserSuccess());
    } catch (error) {
        yield put(loginUserFailure(error.message));
    }
}

function* logoutUserWorker() {
    try {
        // yield call(logoutUserEndpoint);
        yield localStorage.removeItem('token');
        yield put(logoutUserSuccess());
    } catch (error) {
        yield put(logoutUserFailure(error.message));
    }
}


export function* authorizationSaga() {
    yield all([
        takeLatest(AuthTypes.LOGIN_REQUEST, loginUserWorker),
        takeLatest(AuthTypes.LOGOUT_REQUEST, logoutUserWorker),
    ]);
}
