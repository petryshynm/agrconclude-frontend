import { MainTypes } from "../actions/main/main.types"

const initialValues = {
    isModalOpen: false,
}

export const MainReducer = (state = initialValues, action) => {
    switch (action.type) {
        case MainTypes.TOGGLE_MODAL:
            return {
                ...state,
                isModalOpen: action.payload,
            }
        default:
            return state;
    }
}