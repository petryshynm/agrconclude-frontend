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
        const mappedData = data.map(({ email, id, avatarUrl }) => ({ 
          value: id,
          label: email,
          image: avatarUrl,
        }));
        yield put(getUsersActions.success(mappedData));
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
              documentId: "some_id1",
              status: "pending",
              timestamp: "16.03.2023",
              receiverId: "someUserId",
            },
            {
              label: "Угода про нерозголошення",
              documentId: "some_id2",
              status: "concluded",
              timestamp: "18.03.2023",
              receiverId: "someUserId3",
            },
            {
              label: "Угода про звільнення",
              documentId: "some_id3",
              status: "declined",
              timestamp: "21.03.2023",
              receiverId: "someUserId2",
            },
            {
              label: "Угода про співпрацю",
              documentId: "some_id4",
              status: "pending",
              timestamp: "16.03.2023",
              receiverId: "someUserId",
            },
            {
              label: "Угода про нерозголошення",
              documentId: "some_id5",
              status: "concluded",
              timestamp: "18.03.2023",
              receiverId: "someUserId3",
            },
            {
              label: "Угода про звільнення",
              documentId: "some_id6",
              status: "declined",
              timestamp: "21.03.2023",
              receiverId: "someUserId2",
            },
            {
              label: "Угода про співпрацю",
              documentId: "some_id7",
              status: "pending",
              timestamp: "16.03.2023",
              receiverId: "someUserId",
            },
            {
              label: "Угода про нерозголошення",
              documentId: "some_id8",
              status: "concluded",
              timestamp: "18.03.2023",
              receiverId: "someUserId3",
            },
            {
              label: "Угода про звільнення",
              documentId: "some_id9",
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
        const user = {
          id: "f4a22399-f7b2-4e05-96e2-d63a7981393a",
          avatarUrl: "https://lh3.googleusercontent.com/a/AEdFTp7vhij4c559r46Y0404wm4o6sdWaMWc-xPqKZ3p=s96-c",
          email: "bohdan.benkevych@serious-software.com",
          firstName: "Bohdan",
          lastName: "Benkevych"
        }
        const data = [
          {
            label: "Угода про співпрацю",
            documentId: "1_DgRZgP102TFC5J-EV1Upyx-fK9MJag3FsgZHHk51A4",
            status: "pending",
            timestamp: "16.03.2023",
            receiver: user,
          },
          {
            label: "Угода про співпрацю",
            documentId: "1_DgRZgP102TFC5J-EV1Upyx-fK9MJag3FsgZHHk51A4",
            status: "pending",
            timestamp: "16.03.2023",
            receiver: user,
          },
          {
            label: "Угода про нерозголошення",
            documentId: "1_DgRZgP102TFC5J-EV1Upyx-fK9MJag3FsgZHHk51A4",
            status: "concluded",
            timestamp: "18.03.2023",
            receiver: user,
          },
          {
            label: "Угода про звільнення",
            documentId: "1_DgRZgP102TFC5J-EV1Upyx-fK9MJag3FsgZHHk51A4",
            status: "declined",
            timestamp: "21.03.2023",
            receiver: user,
          },
          {
            label: "Угода про співпрацю",
            documentId: "1_DgRZgP102TFC5J-EV1Upyx-fK9MJag3FsgZHHk51A4",
            status: "pending",
            timestamp: "16.03.2023",
            receiver: user,
          },
          {
            label: "Угода про нерозголошення",
            documentId: "1_DgRZgP102TFC5J-EV1Upyx-fK9MJag3FsgZHHk51A4",
            status: "concluded",
            timestamp: "18.03.2023",
            receiver: user,
          },
          {
            label: "Угода про звільнення",
            documentId: "1_DgRZgP102TFC5J-EV1Upyx-fK9MJag3FsgZHHk51A4",
            status: "declined",
            timestamp: "21.03.2023",
            receiver: user,
          },
        ];
        // [
        //   {
        //     id:  "819cca92-1823-4c03-a9c5-c79e0a0e746f",
        //     avatarUrl: "https://lh3.googleusercontent.com/a/AEdFTp6T0yUxvyrJZCtnaDumWQDLo9qE6jKZk7A7c6pU=s96-c",
        //     email: "petryshynmax@gmail.com",
        //     firstName: "Макс",
        //     lastName: "Петришин"
        //   },
        //   {
        //     id: "f4a22399-f7b2-4e05-96e2-d63a7981393a",
        //     avatarUrl: "https://lh3.googleusercontent.com/a/AEdFTp7vhij4c559r46Y0404wm4o6sdWaMWc-xPqKZ3p=s96-c",
        //     email: "bohdan.benkevych@serious-software.com",
        //     firstName: "Bohdan",
        //     lastName: "Benkevych"
        //   }
        // ]
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
            documentId: "some_id1",
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

