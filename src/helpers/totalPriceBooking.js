export const totalPriceBooking = (rooms, days, roomType, persons, food, parking) => {

    return rooms * (days * (roomType?.price + (persons * food?.price))) + parking?.price;

}