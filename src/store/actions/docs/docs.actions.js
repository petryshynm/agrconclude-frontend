import { createAction } from "..";
import { DocsTypes } from "./docs.types";

export const createDocumentActions = createAction(DocsTypes.CREATE_DOC);

export const getDocumentsActions = createAction(DocsTypes.GET_DOCUMENTS);

export const copyDocumentActions = createAction(DocsTypes.COPY_DOC);
