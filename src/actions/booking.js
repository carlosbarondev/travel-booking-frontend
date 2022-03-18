import { totalPriceBooking } from "../helpers/totalPriceBooking"
import { types } from "../types/types"

export const bookingInit = (booking) => {
    return {
        type: types.bookingInit,
        payload: booking
    }
}

export const bookingStartAdd = (idHotel, rooms, days, idRoom, roomType, persons, food, parking) => {
    return (dispatch) => {

        const total = totalPriceBooking(rooms, days, roomType, persons, food, parking);

        const booking = {
            idHotel,
            rooms,
            days,
            idRoom,
            roomType,
            persons,
            food,
            parking,
            total
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

export const bookingAddDate = (date) => {
    return {
        type: types.bookingAddDate,
        payload: date
    }
}

export const bookingClear = () => ({ type: types.bookingClear })