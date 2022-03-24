import { types } from "../types/types";

const initialState = {
    booking: {
        adults: 2,
        children: 0
    }
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
                booking: { ...state.booking, ...action.payload }
            }
        case types.bookingAddIdHotel:
            return {
                ...state,
                booking: { ...state.booking, idHotel: action.payload }
            }
        case types.bookingAddCountry:
            return {
                ...state,
                booking: { ...state.booking, country: action.payload }
            }
        case types.bookingAddDate:
            return {
                ...state,
                booking: { ...state.booking, date: action.payload }
            }
        case types.bookingAddDays:
            return {
                ...state,
                booking: { ...state.booking, days: action.payload }
            }
        case types.bookingAddRoomId:
            return {
                ...state,
                booking: { ...state.booking, roomId: action.payload }
            }
        case types.bookingAddRoomType:
            return {
                ...state,
                booking: { ...state.booking, roomType: action.payload }
            }
        case types.bookingAddFood:
            return {
                ...state,
                booking: { ...state.booking, food: action.payload }
            }
        case types.bookingAddParking:
            return {
                ...state,
                booking: { ...state.booking, parking: action.payload }
            }
        case types.bookingAddAdults:
            return {
                ...state,
                booking: { ...state.booking, adults: action.payload }
            }
        case types.bookingAddChildren:
            return {
                ...state,
                booking: { ...state.booking, children: action.payload }
            }
        case types.bookingAddTotal:
            return {
                ...state,
                booking: { ...state.booking, total: action.payload }
            }
        case types.bookingClear:
            return {
                booking: null
            }
        default:
            return state;
    }
}