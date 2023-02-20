import { all } from 'redux-saga/effects';
import { authorizationSaga } from './auth.sagas';
import { userSaga } from './user.sagas';
import { documentsSaga } from './docs.sagas';

export default function* rootSaga() {
    yield all([
        authorizationSaga(),
        userSaga(),
        documentsSaga(),
    ]);
}
