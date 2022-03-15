import { types } from "../types/types";


const initialState = {
    step: 2
}

export const uiReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.stepChange:
            return {
                ...state,
                step: action.payload,
            }
        default:
            return state;
    }
}