import { createAction } from "..";
import { DocsTypes } from "./docs.types";

export const getDocumentsActions = createAction(DocsTypes.GET_DOCUMENTS);

export const getDocumentFieldsActions = createAction(DocsTypes.GET_DOCUMENT_FIELDS);

export const signDocumentFieldsActions = createAction(DocsTypes.SIGN_DOCUMENT_FIELDS);

export const getSignatureActions = createAction(DocsTypes.GET_SIGNATURE);

export const createSignatureActions = createAction(DocsTypes.CREATE_SIGNATURE);