import { bookingAddAdults, bookingAddChildren, bookingAddDate, bookingAddDays, bookingAddFood, bookingAddParking, bookingAddRoomId, bookingAddRoomType } from "../actions/booking";

export const initBooking = (booking, dispatch) => {
    if (!booking.date) {
        const d = new Date();
        d.setDate(d.getDate() + 2)
        dispatch(bookingAddDate({
            startDate: new Date().toISOString(),
            endDate: d.toISOString()
        }));
        dispatch(bookingAddDays(2));
    }
    if (!booking.adults) {
        dispatch(bookingAddAdults(2));
    }
    if (!booking.children) {
        dispatch(bookingAddChildren(0));
    }
    if (booking.roomId) {
        dispatch(bookingAddRoomId(null));
    }
    if (booking.roomType) {
        dispatch(bookingAddRoomType(null));
    }
    if (booking.food) {
        dispatch(bookingAddFood(null));
    }
    if (booking.parking) {
        dispatch(bookingAddParking(null));
    }
}