import { all } from 'redux-saga/effects';
import { authorizationSaga } from './auth.sagas';
import { userSaga } from './user.sagas';

export default function* rootSaga() {
    yield all([
        authorizationSaga(),
        userSaga(),
    ]);
}
