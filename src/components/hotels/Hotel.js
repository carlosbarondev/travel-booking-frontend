import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Col, Image, Row } from "react-bootstrap";
import { normalizeText } from 'normalize-text';
import { Rating } from "react-simple-star-rating";
import Swal from "sweetalert2";
import { bookingAddFood, bookingAddParking, bookingAddRoomId, bookingAddRoomType } from "../../actions/booking";

export const Hotel = (props) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { booking } = useSelector(state => state.booking);

    const { name, city, img, stars, doubleRoom, rating, comments } = props;

    const handleInfo = () => {
        if (!booking.country) {
            return Swal.fire('Seleccione un destino', ``, 'info');
        }
        if (!booking.date) {
            return Swal.fire('Seleccione una fecha', ``, 'info');
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
        navigate(`/hoteles/${normalizeText(name.replace(/\s+/g, "-"))}`);
    }

    return (
        <Row className="border mb-4">
            <Col xs={4} className="p-0">
                <Image className="h-100" src={img} fluid />
            </Col>
            <Col xs={8} className="d-flex flex-column">
                <span className="mt-2">
                    <strong style={{ "fontSize": "20px" }}>{name}</strong>
                    <Rating
                        className="ms-2"
                        style={{ "pointerEvents": "none", "marginTop": "-6px" }}
                        size={22}
                        ratingValue={stars * 20}
                        allowHover={false}
                    />
                </span>
                <div className="text-muted mt-2">{city.toUpperCase()}</div>
                <span className="mt-2">
                    <Rating
                        style={{ "pointerEvents": "none", "marginTop": "-6px" }}
                        size={15}
                        ratingValue={rating}
                        allowHover={false}
                    />
                    <span className="text-muted ms-2">{`${comments.length} Opiniones`}</span>
                </span>
                <div className="mt-auto">
                    <Button
                        className="float-end"
                        size="lg"
                        style={{ "width": "250px", "marginBottom": "-4px" }}
                        onClick={handleInfo}
                    >
                        {`Disfrútalo desde ${doubleRoom.price} €`}
                    </Button>
                </div>
                <div>
                    <i
                        className="fa-solid fa-circle-info fa-xl ms-1"
                        style={{ "cursor": "pointer" }}
                        onClick={handleInfo}
                    ></i>
                    <span
                        className="linkHotel ms-1"
                        style={{ "cursor": "pointer" }}
                        onClick={handleInfo}
                    >Info</span>
                    <strong className="float-end mt-1 mb-2 me-1" style={{ "fontSize": "14px" }}>Precio total - Impuestos incluidos</strong>
                </div>
            </Col>
        </Row>
    )
}