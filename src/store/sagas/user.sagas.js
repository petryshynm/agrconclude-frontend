import { call, all, takeLatest, put, delay } from 'redux-saga/effects';
import { getUserContractsEndpoint, getUsersEndpoint } from '../../services/endpoints/user.endpoints';
import { getUserContractsActions, getUsersActions, getMyAgreementsActions, getAgreementActions, getSignAgreementsActions } from '../actions/user/user.actions';

function* getUserContractsWorker() {
    try {
        const { data } = yield call(getUserContractsEndpoint);
        yield put(getUserContractsActions.success(data));
    } catch (error) {
        yield put(getUserContractsActions.failure(error.message));
    }
}

function* getUsersWorker() {
    try {
        const { data } = yield call(getUsersEndpoint);
        yield put(getUsersActions.success(data));
    } catch (error) {
        yield put(getUsersActions.failure(error.message));
    }
}

function* getMyAgreementsWorker(action) {
    try {
        // const { data } = yield call(getUsersEndpoint);
        yield delay(2000)
        const data = [
            {
              label: "Угода про співпрацю",
              id: "some_id1",
              status: "pending",
              timestamp: "16.03.2023",
              receiverId: "someUserId",
            },
            {
              label: "Угода про нерозголошення",
              id: "some_id2",
              status: "concluded",
              timestamp: "18.03.2023",
              receiverId: "someUserId3",
            },
            {
              label: "Угода про звільнення",
              id: "some_id3",
              status: "declined",
              timestamp: "21.03.2023",
              receiverId: "someUserId2",
            },
            {
              label: "Угода про співпрацю",
              id: "some_id4",
              status: "pending",
              timestamp: "16.03.2023",
              receiverId: "someUserId",
            },
            {
              label: "Угода про нерозголошення",
              id: "some_id5",
              status: "concluded",
              timestamp: "18.03.2023",
              receiverId: "someUserId3",
            },
            {
              label: "Угода про звільнення",
              id: "some_id6",
              status: "declined",
              timestamp: "21.03.2023",
              receiverId: "someUserId2",
            },
            {
              label: "Угода про співпрацю",
              id: "some_id7",
              status: "pending",
              timestamp: "16.03.2023",
              receiverId: "someUserId",
            },
            {
              label: "Угода про нерозголошення",
              id: "some_id8",
              status: "concluded",
              timestamp: "18.03.2023",
              receiverId: "someUserId3",
            },
            {
              label: "Угода про звільнення",
              id: "some_id9",
              status: "declined",
              timestamp: "21.03.2023",
              receiverId: "someUserId2",
            },
        ];
        yield put(getMyAgreementsActions.success(data));
    } catch (error) {
        yield put(getMyAgreementsActions.failure(error.message));
    }
};

function* getSignAgreementsWorker(action) {
    try {
        // const { data } = yield call(getUsersEndpoint);
        yield delay(2000)
        const data = [
            {
              label: "Угода про співпрацю",
              id: "some_id1",
              status: "pending",
              timestamp: "16.03.2023",
              receiverId: "someUserId",
            },
            {
              label: "Угода про співпрацю",
              id: "some_id2",
              status: "pending",
              timestamp: "16.03.2023",
              receiverId: "someUserId",
            },
            {
              label: "Угода про нерозголошення",
              id: "some_id3",
              status: "concluded",
              timestamp: "18.03.2023",
              receiverId: "someUserId3",
            },
            {
              label: "Угода про звільнення",
              id: "some_id4",
              status: "declined",
              timestamp: "21.03.2023",
              receiverId: "someUserId2",
            },
            {
              label: "Угода про співпрацю",
              id: "some_id5",
              status: "pending",
              timestamp: "16.03.2023",
              receiverId: "someUserId",
            },
            {
              label: "Угода про нерозголошення",
              id: "some_id6",
              status: "concluded",
              timestamp: "18.03.2023",
              receiverId: "someUserId3",
            },
            {
              label: "Угода про звільнення",
              id: "some_id7",
              status: "declined",
              timestamp: "21.03.2023",
              receiverId: "someUserId2",
            },
        ];
        yield put(getSignAgreementsActions.success(data));
    } catch (error) {
        yield put(getSignAgreementsActions.failure(error.message));
    }
};

function* getAgreementWorker(action) {
    try {
        // const { data } = yield call(getUsersEndpoint, action.payload); //should be id there
        yield delay(2000)
        const data = {
            label: "Угода про співпрацю",
            description: "Це угода про ..віфолфдівоіфвовіфдлфвіодлвфіодфвівфі",
            id: "some_id1",
            status: "pending",
            date: "16.03.2024",
            receiverId: "someUserId",
            senderId: "someUserId"
        }
        yield put(getAgreementActions.success(data));
    } catch (error) {
        yield put(getAgreementActions.failure(error.message));
    }
};

export function* userSaga() {
    yield all([
        takeLatest(getUserContractsActions.request().type, getUserContractsWorker),
        takeLatest(getUsersActions.request().type, getUsersWorker),
        takeLatest(getAgreementActions.request().type, getAgreementWorker),
        takeLatest(getSignAgreementsActions.request().type, getSignAgreementsWorker),
        takeLatest(getMyAgreementsActions.request().type, getMyAgreementsWorker),
    ]);
}
