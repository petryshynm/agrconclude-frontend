export const createAction = (actionType) => ({
    request: (payload) => ({ type: `${actionType}_REQUEST`, payload }),
    success: (payload) => ({ type: `${actionType}_SUCCESS`, payload }),
    failure: (payload) => ({ type: `${actionType}_FAILURE`, payload }),
})