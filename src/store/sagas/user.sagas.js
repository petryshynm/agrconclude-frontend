import { call, all, takeLatest, put, select } from 'redux-saga/effects';
import { changeAgreementStatusEndpoint, createAgreementEndpoint, getAgreementEndpoint, getMyAgreementsEndpoint, getSignAgreementsEndpoint, getUsersEndpoint } from '../../services/endpoints/user.endpoints';
import { getUsersActions, getMyAgreementsActions, getAgreementActions, getSignAgreementsActions, createAgreementActions, changeAgreementStatusActions } from '../actions/user/user.actions';
import { giveFilePermissionEndpoint } from '../../services/endpoints/drive.endpoints';

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

function* getMyAgreementsWorker() {
  try {
    const { data } = yield call(getMyAgreementsEndpoint);
    yield put(getMyAgreementsActions.success(data));
  } catch (error) {
    yield put(getMyAgreementsActions.failure(error.message));
  }
};

function* getSignAgreementsWorker(action) {
  try {
    const { data } = yield call(getSignAgreementsEndpoint);
    yield put(getSignAgreementsActions.success(data));
  } catch (error) {
    yield put(getSignAgreementsActions.failure(error.message));
  }
};

function* getAgreementWorker(action) {
  try {
    const id = action.payload;
    const { data } = yield call(getAgreementEndpoint, id);
    yield put(getAgreementActions.success(data));
  } catch (error) {
    yield put(getAgreementActions.failure(error.message));
  }
};

function* createAgreementWorker(action) {
  try {
    const { client, ...rest } = action.payload
    const { expireAt, documentId } = rest;
    const { value: clientId, label: email } = client
    const requestBody = {
      ...rest,
      expireAt: (new Date(expireAt)).toISOString(),
      email,
      clientId
    }
    yield call(createAgreementEndpoint, requestBody)
    yield call(giveFilePermissionEndpoint, documentId, {
      'role': 'reader',
      'type': 'user',
      'emailAddress': email
    })
    yield put(createAgreementActions.success())
    yield put(getMyAgreementsActions.request());
  } catch (error) {
    yield put(createAgreementActions.failure(error.message));
  }
}

function* changeStatusWorker(action) {
  try {
    const { contractId, ...rest } = action.payload;
    yield call(changeAgreementStatusEndpoint, contractId, rest)
    yield put(getAgreementActions.request(contractId));
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

