import { call, all, takeLatest, put } from 'redux-saga/effects';
import { getUserContractsEndpoint } from '../../services/endpoints/user.endpoints';
import { getUserContractsFailure, getUserContractsSuccess } from '../actions/user/user.actions';
import { UserTypes } from '../actions/user/user.types';

function* getUserContractsWorker(action) {
    try {
        const { data } = yield call(getUserContractsEndpoint);
        yield put(getUserContractsSuccess(data));
    } catch (error) {
        yield put(getUserContractsFailure(error.message));
    }
}



export function* userSaga() {
    yield all([
        takeLatest(UserTypes.GET_USER_CONTRACTS_REQUEST, getUserContractsWorker),
    ]);
}
