import { call, all, takeLatest, put } from 'redux-saga/effects';
import { 
    getDocumentsSuccess,
    getDocumentsFailure,
    createDocumentSuccess,
    createDocumentFailure
} from '../actions/docs/docs.actions';
import { DocsTypes } from '../actions/docs/docs.types';
import { createDocumentEndpoint } from '../../services/endpoints/docs.endpoints';
import { getDocumentsEndpoint } from '../../services/endpoints/drive.endpoints';

function* createDocumentWorker() {
    try {
        const { data } = yield call(createDocumentEndpoint);
        yield put(createDocumentSuccess(data));
    } catch (error) {
        yield put(createDocumentFailure(error.message));
    }
}

function* getDocumentsWorker(action) {
    const config = action.payload;
    try {
        const { data } = yield call (
            getDocumentsEndpoint,
            config
        )
        yield put(getDocumentsSuccess(data.files));
        console.log('getDocumentsWorker', data)
    } catch (error) {
        yield put(getDocumentsFailure(error.message));
    }
}


export function* documentsSaga() {
    yield all([
        takeLatest(DocsTypes.CREATE_DOC_REQUEST, createDocumentWorker),
        takeLatest(DocsTypes.GET_DOCUMENTS_REQUEST, getDocumentsWorker),
    ]);
}