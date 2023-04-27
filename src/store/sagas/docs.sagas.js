import { call, all, takeLatest, put } from 'redux-saga/effects';
import { 
    createDocumentActions,
    getDocumentsActions,
    copyDocumentActions
} from '../actions/docs/docs.actions';
import { createDocumentEndpoint } from '../../services/endpoints/docs.endpoints';
import { copyDocumentEndpoint, getDocumentsEndpoint } from '../../services/endpoints/drive.endpoints';

function* createDocumentWorker() {
    try {
        const { data } = yield call(createDocumentEndpoint);
        yield put(createDocumentActions.success(data));
    } catch (error) {
        yield put(createDocumentActions.failure(error.message));
    }
}

function* getDocumentsWorker(action) {
    const config = action.payload;
    try {
        const { data } = yield call (
            getDocumentsEndpoint,
            config
        )
        yield put(getDocumentsActions.success(data.files));
        console.log('getDocumentsWorker', data)
    } catch (error) {
        yield put(getDocumentsActions.failure(error.message));
    }
}

function* copyDocumentWorker(action) {
    const fileData = action.payload;
    try {
        const { data } = yield call (
            copyDocumentEndpoint,
            fileData
        )
        yield put(copyDocumentActions.success());
        console.log('copyDocumentWorker', data)
    } catch (error) {
        yield put(copyDocumentActions.failure(error.message));
    }
}

export function* documentsSaga() {
    yield all([
        takeLatest(createDocumentActions.request().type, createDocumentWorker),
        takeLatest(getDocumentsActions.request().type, getDocumentsWorker),
        takeLatest(copyDocumentActions.request().type, copyDocumentWorker),
    ]);
}
