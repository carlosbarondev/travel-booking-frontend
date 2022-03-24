export const totalPriceBooking = (days, adults, children, roomType, food, parking) => {

    return (days ? days : 1) * ((roomType?.price ? roomType?.price : 0) + ((adults + children) * (food?.price ? food?.price : 0))) + (parking?.price ? parking?.price : 0);

}