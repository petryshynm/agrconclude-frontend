import { createAction } from "..";
import { MainTypes } from "./main.types";

export const toggleModal = createAction(MainTypes.TOGGLE_MODAL);
