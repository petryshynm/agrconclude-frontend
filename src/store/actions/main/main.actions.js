import { MainTypes } from "./main.types";

export const toggleModal = (isModalOpen) => ({
    type: MainTypes.TOGGLE_MODAL,
    payload: isModalOpen,
});