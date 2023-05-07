import { call, all, takeLatest, put } from 'redux-saga/effects';
import { 
    createDocumentActions,
    getDocumentsActions,
    getDocumentFieldsActions,
    getSignatureActions,
    createSignatureActions,
    signDocumentFieldsActions
} from '../actions/docs/docs.actions';
import { createDocumentEndpoint, getDocumentFieldsEndpoint, signDocumentFieldsEndpoint } from '../../services/endpoints/docs.endpoints';
import { copyDocumentEndpoint, createSignatureEndpoint, getDocumentsEndpoint, getFileEndpointV2, getSignatureEndpoint, giveFilePermissionEndpoint } from '../../services/endpoints/drive.endpoints';
import { getInsertImageRule, getReplaceRule, parseDocument } from '../../services/utils';

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
        const response = yield call(getFileEndpointV2, fileId)
        const responseBlob = yield response.blob();
        const responseForLink = yield call(getFileEndpointV2, fileId, '&fields=webContentLink')
        const responseJson = yield responseForLink.json();
        const signature = URL.createObjectURL(responseBlob);
        const signatureURL = responseJson.webContentLink
        yield put(getSignatureActions.success({signatureURL, signature}));
    } catch (error) {
        yield put(getSignatureActions.failure(error.message));
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

function* signDocumentFieldsWorker(action) {
    const { signatureURL, fields, senderEmail } = action.payload;

    try {
        const { data: { id: documentId } } = yield call(copyDocumentEndpoint, { fileId: action.payload.documentId })
        const toUpdateFields = { requests: [] }        

        for (const fieldName in fields) {
            if (fieldName === 'sign') continue;
            const rule = getReplaceRule(`{{${fieldName}}}`, fields[fieldName])
            toUpdateFields.requests.push(rule)
        }

        yield call(signDocumentFieldsEndpoint, documentId, toUpdateFields);

        const { data: { body: docBody } } = yield call(getDocumentFieldsEndpoint, documentId)

        const toUpdateSigns = { requests: [] }
        if (fields['sign']) {
            const image = signatureURL;
            let signIndexes = [];
            docBody.content.forEach((element) => {
                if (element.paragraph) {
                    const paragraphText = element.paragraph.elements.filter(e => e.textRun).map(e => e.textRun.content).join('');
                    if (paragraphText.includes(`{{sign}}`)) {
                        signIndexes = [...signIndexes, ...element.paragraph.elements
                            .filter(e => e.textRun)
                            .map((e) => e.startIndex + e.textRun.content.indexOf('{{sign}}'))
                        ]
                    }
                }
            });

            const replaceRule = getReplaceRule(`{{sign}}`, '');
            signIndexes.forEach((signParagraphIndex) => {
                const insertImageRule = getInsertImageRule(image, signParagraphIndex);
                toUpdateSigns.requests.push(insertImageRule)
            })
            toUpdateSigns.requests.push(replaceRule)
            yield call(signDocumentFieldsEndpoint, documentId, toUpdateSigns);
        } 
    
        yield call(giveFilePermissionEndpoint, documentId, {
            'role': 'reader',
            'type': 'user',
            'emailAddress': senderEmail
        })
        yield put(signDocumentFieldsActions.success());
    } catch (error) {
        yield put(signDocumentFieldsActions.failure(error.message));
    }
}

export function* documentsSaga() {
    yield all([
        takeLatest(createDocumentActions.request().type, createDocumentWorker),
        takeLatest(getDocumentsActions.request().type, getDocumentsWorker),
        takeLatest(getDocumentFieldsActions.request().type, getDocumentFieldsWorker),
        takeLatest(signDocumentFieldsActions.request().type, signDocumentFieldsWorker),
        takeLatest(getSignatureActions.request().type, getSignatureWorker),
        takeLatest(createSignatureActions.request().type, createSignatureWorker),
    ]);
}
