import { types } from "../types/types";


const initialState = {
    step: 2,
    shippingModal: false,
    chooseShippingModal: null,
}

export const uiReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.stepChange:
            return {
                ...state,
                step: action.payload,
            }
        case types.shippingModalChange:
            return {
                ...state,
                shippingModal: action.payload,
            }
        case types.shippingModalChoose:
            return {
                ...state,
                chooseShippingModal: action.payload,
            }
        default:
            return state;
    }
}