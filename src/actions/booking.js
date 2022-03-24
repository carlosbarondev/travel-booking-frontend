import { totalPriceBooking } from "../helpers/totalPriceBooking"
import { types } from "../types/types"

export const bookingInit = (booking) => {
    return {
        type: types.bookingInit,
        payload: booking
    }
}

export const bookingStartAdd = (idHotel, roomId, roomType, food, parking, days, persons) => {
    return (dispatch) => {

        const total = totalPriceBooking(days, roomType, persons, food, parking);

        const booking = {
            idHotel,
            roomId,
            roomType,
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

export const bookingAddIdHotel = (idHotel) => {
    return {
        type: types.bookingAddIdHotel,
        payload: idHotel
    }
}

export const bookingAddCountry = (country) => {
    return {
        type: types.bookingAddCountry,
        payload: country
    }
}

export const bookingAddDate = (date) => {
    return {
        type: types.bookingAddDate,
        payload: date
    }
}

export const bookingAddRoomId = (roomId) => {
    return {
        type: types.bookingAddRoomId,
        payload: roomId
    }
}

export const bookingAddRoomType = (roomType) => {
    return {
        type: types.bookingAddRoomType,
        payload: roomType
    }
}

export const bookingAddFood = (food) => {
    return {
        type: types.bookingAddFood,
        payload: food
    }
}

export const bookingAddParking = (parking) => {
    return {
        type: types.bookingAddParking,
        payload: parking
    }
}

export const bookingAddDays = (days) => {
    return {
        type: types.bookingAddDays,
        payload: days
    }
}

export const bookingAddAdults = (adults) => {
    return {
        type: types.bookingAddAdults,
        payload: adults
    }
}

export const bookingAddTotal = (total) => {
    return {
        type: types.bookingAddTotal,
        payload: total
    }
}

export const bookingAddChildren = (children) => {
    return {
        type: types.bookingAddChildren,
        payload: children
    }
}

export const bookingClear = () => ({ type: types.bookingClear })