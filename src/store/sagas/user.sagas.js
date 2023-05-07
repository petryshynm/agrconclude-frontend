import { call, all, takeLatest, put, delay } from 'redux-saga/effects';
import { changeAgreementStatusEndpoint, createAgreementEndpoint, getUsersEndpoint } from '../../services/endpoints/user.endpoints';
import { getUsersActions, getMyAgreementsActions, getAgreementActions, getSignAgreementsActions, createAgreementActions, changeAgreementStatusActions } from '../actions/user/user.actions';
import axios from 'axios';
import { giveFilePermissionEndpoint } from '../../services/endpoints/drive.endpoints';

function* getUsersWorker() {
    try {
        // TODO  BE
        // const { data } = yield call(getUsersEndpoint);
        // const mappedData = data.map(({ email, id, avatarUrl }) => ({ 
        //   value: id,
        //   label: email,
        //   image: avatarUrl,
        // }));

        const { data } = yield call(axios.get, `http://localhost:5000/users`)
        const mappedData = data.map((user) => { 
          const {  email, avatar_url } = user;
          return {
            value: user,
            label: email,
            image: avatar_url,
          }
        });
        yield put(getUsersActions.success(mappedData));
    } catch (error) {
        yield put(getUsersActions.failure(error.message));
    }
}

function* getMyAgreementsWorker(action) {
    try {
        // TODO BE
        // const { data } = yield call(getUsersEndpoint);
        yield delay(2000)
        const myId = localStorage.getItem('token');
        const { data } = yield call(axios.get, `http://localhost:5000/agreements?sender.id=${myId}`)
        yield put(getMyAgreementsActions.success(data));
    } catch (error) {
        yield put(getMyAgreementsActions.failure(error.message));
    }
};

function* getSignAgreementsWorker(action) {
    try {
        // TODO BE
        // const { data } = yield call(getUsersEndpoint);
        yield delay(2000)
        const myId = localStorage.getItem('token');
        const { data } = yield call(axios.get, `http://localhost:5000/agreements?receiver.id=${myId}`)
        yield put(getSignAgreementsActions.success(data));
    } catch (error) {
        yield put(getSignAgreementsActions.failure(error.message));
    }
};

function* getAgreementWorker(action) {
    try {
        const id = action.payload;
        // const { data } = yield call(getUsersEndpoint, action.payload); //should be id there
        yield delay(2000)
        const { data } = yield call(axios.get, `http://localhost:5000/agreements/${id}`)
        yield put(getAgreementActions.success(data));
    } catch (error) {
        yield put(getAgreementActions.failure(error.message));
    }
};

function* createAgreementWorker(action) {
  // TODO потім не треба буде userId, бо воно береться з токена.
  const { profile, agreementInfo } = action.payload;
  const sender = {
    first_name: profile.givenName,
    id: profile.googleId,
    avatar_url: profile.imageUrl,
    lastName: profile.name,
    email: profile.email
  }

  const { documentId, expireAt, user: receiver, description, label } = agreementInfo;

  const mockAgreement = {
    status: "pending",
    createdAt: "18.03.2023",
    label,
    description,
    expireAt,
    documentId,
    receiver,
    sender,
  }

  try {
    yield call(createAgreementEndpoint, mockAgreement)
    yield call(giveFilePermissionEndpoint, documentId, {
      'role': 'reader',
      'type': 'user',
      'emailAddress': sender.email
    })
    yield put(createAgreementActions.success())
  } catch (error) {
    yield put(createAgreementActions.failure(error.message));
  }
}

function* changeStatusWorker(action) {
  try {
      const { agreementId, ...rest } = action.payload;
      const { data } = yield call(changeAgreementStatusEndpoint, agreementId, rest)
      yield put(getAgreementActions.success(data));
  } catch (error) {
      yield put(getAgreementActions.failure(error.message));
  }
};

export function* userSaga() {
    yield all([
        takeLatest(createAgreementActions.request().type, createAgreementWorker),
        takeLatest(changeAgreementStatusActions.request().type, changeStatusWorker),
        takeLatest(getUsersActions.request().type, getUsersWorker),
        takeLatest(getAgreementActions.request().type, getAgreementWorker),
        takeLatest(getSignAgreementsActions.request().type, getSignAgreementsWorker),
        takeLatest(getMyAgreementsActions.request().type, getMyAgreementsWorker),
    ]);
}

