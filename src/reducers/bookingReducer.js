import { types } from "../types/types";

const initialState = {
    booking: {}
};

export const bookingReducer = (state = initialState, action) => {

    switch (action.type) {
        case types.bookingInit:
            return {
                booking: action.payload
            }
        case types.bookingAdd:
            return {
                ...state,
                booking: action.payload
            }
        case types.bookingTotal:
            return {
                ...state,
                booking: { ...state.booking, total: action.payload }
            }
        case types.bookingClear:
            return {
                booking: {}
            }
        default:
            return state;
    }
}