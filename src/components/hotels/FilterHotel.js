import { Card, Form } from "react-bootstrap"
import { Rating } from "react-simple-star-rating";

export const FilterHotel = ({ hotels, setFiltered }) => {

    const handleOrder = () => {
        let stars;
        if (document.getElementById("radio-5-stars").checked) {
            stars = hotels.filter(hotel => hotel.stars === 5)
        } else if (document.getElementById("radio-4-stars").checked) {
            stars = hotels.filter(hotel => hotel.stars >= 4 && hotel.stars < 5)
        } else if (document.getElementById("radio-3-stars").checked) {
            stars = hotels.filter(hotel => hotel.stars >= 3 && hotel.stars < 4)
        } else {
            stars = hotels;
        }
        if (document.getElementById("radio-Precio").checked) {
            setFiltered([...stars.sort((a, b) => a.doubleRoom.price - b.doubleRoom.price)]);
        } else if (document.getElementById("radio-Más visitados").checked) {
            setFiltered([...stars.sort((a, b) => b.bookings - a.bookings)]);
        } else {
            setFiltered([...stars.sort((a, b) => b.rating - a.rating)]);
        }
    }

    return (
        <Card>
            <Card.Header as="h5">¿Cómo quieres que sea tu hotel?</Card.Header>
            <Card.Body>
                <Card.Title>ESTRELLAS</Card.Title>
                <Form>
                    {['Cualquiera', '5', '4', '3'].map((type) => (
                        <Form.Check
                            key={type}
                            type="radio"
                            id={`radio-${type}-stars`}
                            name="stars"
                            label={type !== 'Cualquiera' ?
                                <Rating
                                    style={{ "pointerEvents": "none", "marginTop": "-7px" }}
                                    size={17}
                                    ratingValue={type * 100 / 5}
                                    allowHover={false}
                                /> : "Cualquiera"
                            }
                            onClick={handleOrder}
                            defaultChecked={type === "Cualquiera" ? true : false}
                        />
                    ))}
                </Form>
                <Card.Title>ORDENAR POR</Card.Title>
                <Form>
                    {['Precio', 'Más visitados', 'Mejor valorados'].map((type) => (
                        <Form.Check
                            key={type}
                            type="radio"
                            id={`radio-${type}`}
                            name="order"
                            label={type}
                            onClick={handleOrder}
                            defaultChecked={type === "Precio" ? true : false}
                        />
                    ))}
                </Form>
            </Card.Body>
        </Card>
    )
}