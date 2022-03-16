import { types } from "../types/types"

export const bookingInit = (booking) => {
    return {
        type: types.bookingInit,
        payload: booking
    }
}

export const bookingStartAdd = (idHotel, rooms, days, roomType, persons, food, parking) => {
    return (dispatch) => {
        let booking = {
            idHotel,
            rooms,
            days,
            roomType,
            persons,
            food,
            parking
        }
        dispatch(bookingAdd(booking));
    }
}

export const bookingAdd = (booking) => {
    return {
        type: types.bookingAdd,
        payload: booking
    }
}

export const bookingTotal = (total) => {
    return {
        type: types.bookingTotal,
        payload: total
    }
}

export const bookingClear = () => ({ type: types.bookingClear })