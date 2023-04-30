import { call, all, takeLatest, put } from 'redux-saga/effects';
import { 
    createDocumentActions,
    getDocumentsActions,
    copyDocumentActions,
    getDocumentFieldsActions,
    getSignatureActions,
    createSignatureActions
} from '../actions/docs/docs.actions';
import { createDocumentEndpoint, getDocumentFieldsEndpoint } from '../../services/endpoints/docs.endpoints';
import { copyDocumentEndpoint, createSignatureEndpoint, getDocumentsEndpoint, getFileEndpoint, getSignatureEndpoint } from '../../services/endpoints/drive.endpoints';
import { parseDocument } from '../../services/utils';

function* createDocumentWorker() {
    try {
        const { data } = yield call(createDocumentEndpoint);
        yield put(createDocumentActions.success(data));
    } catch (error) {
        yield put(createDocumentActions.failure(error.message));
    }
}

function* createSignatureWorker(action) {
    const imageUrl = action.payload;
    try {
        const { data } = yield call(createSignatureEndpoint, imageUrl);
        yield put(createDocumentActions.success(data));
        yield put(getSignatureActions.request());
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
        const mappedData = data.files.map(({ name, id }) => ({ value: id, label: name}));
        yield put(getDocumentsActions.success(mappedData));
    } catch (error) {
        yield put(getDocumentsActions.failure(error.message));
    }
}

function* getSignatureWorker() {
    try {
        const { data } = yield call(getSignatureEndpoint)
        const fileId = data.files[0].id;
        const apiKey = process.env.REACT_APP_API_KEY || "";
        const url = `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media&key=${apiKey}`
        const response = yield call(fetch, url, {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}`},
        })
        const responseBlob = yield response.blob();
        const imageUrl = URL.createObjectURL(responseBlob);
        yield put(getSignatureActions.success(imageUrl));
    } catch (error) {
        yield put(getSignatureActions.failure(error.message));
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
    } catch (error) {
        yield put(copyDocumentActions.failure(error.message));
    }
}

function* getDocumentFieldsWorker(action) {
    const documentId = action.payload;
    try {
        const { data } = yield call(getDocumentFieldsEndpoint, documentId)
        yield put(getDocumentFieldsActions.success(parseDocument(data)));
    } catch (error) {
        yield put(getDocumentFieldsActions.failure(error.message));
    }
}

export function* documentsSaga() {
    yield all([
        takeLatest(createDocumentActions.request().type, createDocumentWorker),
        takeLatest(getDocumentsActions.request().type, getDocumentsWorker),
        takeLatest(copyDocumentActions.request().type, copyDocumentWorker),
        takeLatest(getDocumentFieldsActions.request().type, getDocumentFieldsWorker),
        takeLatest(getSignatureActions.request().type, getSignatureWorker),
        takeLatest(createSignatureActions.request().type, createSignatureWorker),
    ]);
}
