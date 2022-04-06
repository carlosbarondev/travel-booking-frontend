import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Col, Container, Form, Image, ListGroup, Row } from "react-bootstrap";
import { Rating } from "react-simple-star-rating";
import Swal from "sweetalert2";

import { fetch_No_Token } from "../../helpers/fetch";
import { DateBarHotel } from "./DateBarHotel";
import { Comments } from "./Comments";
import { BookingDetails } from "./BookingDetails";
import { bookingAddFood, bookingAddIdHotel, bookingAddParking, bookingAddRoomId, bookingAddRoomType, bookingAddTotal } from "../../actions/booking";
import { totalPriceBooking } from "../../helpers/totalPriceBooking";

export const HotelScreen = () => {

    const { HotelName } = useParams();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { booking } = useSelector(state => state.booking);

    const [hotel, setHotel] = useState();
    const [availableRooms, setAvailableRooms] = useState();
    const [checking, setChecking] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try {
                const resp = await fetch_No_Token(`hotels/${HotelName}/?from_date=${booking.date.startDate}&to_date=${booking.date.endDate}`);
                const body = await resp.json();
                if (body.msg) {
                    console.log(body.msg);
                    navigate("/");
                } else {
                    setHotel(body.hotel);
                    dispatch(bookingAddIdHotel(body.hotel._id));
                    setAvailableRooms(body.availableRooms);
                    setChecking(true);
                }
            } catch (error) {
                console.log(error);
                navigate("/");
            }
        }
        fetchData();
    }, [HotelName, navigate, booking?.date, dispatch]);

    useEffect(() => {
        const total = totalPriceBooking(booking.days, booking.adults, booking.children, booking.roomType, booking.food, booking.parking);
        dispatch(bookingAddTotal(total));
    }, [booking?.days, booking?.adults, booking?.children, booking?.roomType, booking?.food, booking?.parking, dispatch]);


    const handleSelect = (type, content) => {
        switch (type) {
            case "roomType":
                const free = availableRooms.find(room => room.category === content.type);
                if (!free) {
                    return Swal.fire('Sin disponibilidad', `No hay habitaciones ${content.type} disponibles para las fechas elegidas`, 'info');
                } else {
                    let family;
                    if ((booking.adults > 2) || (booking.children > 1) || (booking.adults === 2 && booking.children > 0)) {
                        family = true;
                    }
                    if (family && content.type !== "Familiar") {
                        return Swal.fire('No disponible', `Máximo dos adultos`, 'info');
                    }
                    document.getElementById(content.type).checked ? document.getElementById(content.type).checked = false : document.getElementById(content.type).checked = true;
                    if (document.getElementById(content.type).checked) {
                        dispatch(bookingAddRoomId(free._id));
                        return dispatch(bookingAddRoomType(content));
                    } else {
                        dispatch(bookingAddRoomId(null));
                        return dispatch(bookingAddRoomType(null));
                    }
                }
            case "food":
                document.getElementById(content.type).checked ? document.getElementById(content.type).checked = false : document.getElementById(content.type).checked = true;
                return document.getElementById(content.type).checked ? dispatch(bookingAddFood(content)) : dispatch(bookingAddFood(null));
            case "parking":
                document.getElementById(content.type).checked ? document.getElementById(content.type).checked = false : document.getElementById(content.type).checked = true;
                return document.getElementById(content.type).checked ? dispatch(bookingAddParking(content)) : dispatch(bookingAddParking(null));
            default:
                return
        }
    }

    return (
        checking &&
        <>
            <div className="hotel-head-text">
                <Image className="w-100" src={hotel.img ? hotel.img : "/assets/no-image.png"} fluid />
                <div className='hotel-text-on-image'>
                    <h1>{hotel.name}</h1>
                    <Rating
                        className="ms-1"
                        style={{ "pointerEvents": "none" }}
                        size={30}
                        ratingValue={hotel.stars * 20}
                        allowHover={false}
                    />
                </div>
            </div>
            <Container className="mb-4">
                <h3 className="px-0 mx-0 mt-4">{hotel.name}</h3>
                <div className="d-flex align-items-center">
                    <Rating
                        className="me-2 mb-1"
                        style={{ "pointerEvents": "none" }}
                        size={20}
                        ratingValue={hotel.rating}
                        allowHover={false}
                    />
                    <div>
                        {
                            hotel.comments.length > 0
                                ? <a className="linkHotel text-muted" href="#stars">{hotel.comments.length === 1 ? `${hotel.comments.length} valoración` : `${hotel.comments.length} valoraciones`}</a>
                                : `Sin valoraciones`
                        }
                    </div>
                </div>
                <div className="mt-3 mb-4" style={{ "whiteSpace": "pre-wrap" }}>{hotel.description}</div>
                <DateBarHotel />
                <Row>
                    <Col xs={12} lg={8} className="mt-4">
                        <h3>Elige tu habitación</h3>
                        <Row className="border mt-4 mx-1" onClick={() => handleSelect("roomType", { type: "Doble", price: hotel.doubleRoom.price })} style={{ "cursor": "pointer" }}>
                            <Col xs={12} md={5} className="p-0">
                                <Form.Check
                                    style={{ "pointerEvents": "none", "position": "absolute", "marginTop": "5px", "marginLeft": "12px" }}
                                    type='radio'
                                    id="Doble"
                                    name="roomType"
                                    label={``}
                                />
                                <Image className="h-100 roomScreen" src={hotel.doubleRoom.img ? hotel.doubleRoom.img : "/assets/no-image.png"} fluid />
                            </Col>
                            <Col xs={12} md={7} className="p-0">
                                <h4 className="mt-3 ms-3">Doble</h4>
                                <div className="text-muted ms-4"><i className="fa-solid fa-bed"></i> Capacidad: 2 adultos</div>
                                <h5 className="mt-2 text-muted ms-4">Amplitud y todas las facilidades</h5>
                                <div className="mt-auto me-3">
                                    <h3 className="text-end mt-4">Desde {hotel.doubleRoom.price}€</h3>
                                    <div className="text-muted text-end mb-2" style={{ "fontSize": "12px", "marginTop": "-7px" }}>habitación/noche - Impuestos incluidos</div>
                                </div>
                            </Col>
                        </Row>
                        <Row className="border mt-5 mx-1" onClick={() => handleSelect("roomType", { type: "Familiar", price: hotel.familyRoom.price })} style={{ "cursor": "pointer" }}>
                            <Col xs={12} md={5} className="p-0">
                                <Form.Check
                                    style={{ "pointerEvents": "none", "position": "absolute", "marginTop": "5px", "marginLeft": "12px" }}
                                    type='radio'
                                    id="Familiar"
                                    name="roomType"
                                    label={``}
                                />
                                <Image className="h-100 roomScreen" src={hotel.familyRoom.img ? hotel.familyRoom.img : "/assets/no-image.png"} fluid />
                            </Col>
                            <Col xs={12} md={7} className="p-0">
                                <h4 className="mt-3 ms-3">Familiar</h4>
                                <div className="text-muted ms-4"><i className="fa-solid fa-bed"></i> Capacidad: 4 adultos</div>
                                <h5 className="mt-2 text-muted ms-4">Espacio para toda la familia</h5>
                                <div className="mt-auto me-3">
                                    <h3 className="text-end mt-4">Desde {hotel.familyRoom.price}€</h3>
                                    <div className="text-muted text-end mb-2" style={{ "fontSize": "12px", "marginTop": "-7px" }}>habitación/noche - Impuestos incluidos</div>
                                </div>
                            </Col>
                        </Row>
                        <Row className="border mt-5 mx-1" onClick={() => handleSelect("roomType", { type: "Suite", price: hotel.suiteRoom.price })} style={{ "cursor": "pointer" }}>
                            <Col xs={12} md={5} className="p-0">
                                <Form.Check
                                    style={{ "pointerEvents": "none", "position": "absolute", "marginTop": "5px", "marginLeft": "12px" }}
                                    type='radio'
                                    id="Suite"
                                    name="roomType"
                                    label={``}
                                />
                                <Image className="h-100 roomScreen" src={hotel.suiteRoom.img ? hotel.suiteRoom.img : "/assets/no-image.png"} fluid />
                            </Col>
                            <Col xs={12} md={7} className="p-0">
                                <h4 className="mt-3 ms-3">Suite</h4>
                                <div className="text-muted ms-4"><i className="fa-solid fa-bed"></i> Capacidad: 2 adultos</div>
                                <h5 className="mt-2 text-muted ms-4">Dos pisos para ti y tu acompañante</h5>
                                <div className="mt-auto me-3">
                                    <h3 className="text-end mt-4">Desde {hotel.suiteRoom.price}€</h3>
                                    <div className="text-muted text-end mb-2" style={{ "fontSize": "12px", "marginTop": "-7px" }}>habitación/noche - Impuestos incluidos</div>
                                </div>
                            </Col>
                        </Row>
                        <h3 className="mt-5">Elige un régimen</h3>
                        <Row className="border d-flex flex-column mt-4 mx-1" onClick={() => handleSelect("food", { type: "Alojamiento y desayuno", price: 0 })} style={{ "cursor": "pointer" }}>
                            <span className="ms-3 mt-3 d-flex align-items-center">
                                <Form.Check
                                    style={{ "pointerEvents": "none", "display": "inline-block" }}
                                    type='radio'
                                    id="Alojamiento y desayuno"
                                    name="food"
                                    label={``}
                                />
                                <h4 className="ms-1" style={{ "display": "inline" }}>Alojamiento y desayuno</h4>
                            </span>
                            <ListGroup className="ms-3">
                                <ListGroup.Item className="border-0 w-75"><i className="fa-solid fa-check me-1"></i> Desayuno buffet completo</ListGroup.Item>
                            </ListGroup>
                            <h3 className="text-end mt-auto me-3 mb-3">Incluido</h3>
                        </Row>
                        <Row className="border d-flex flex-column mt-4 mx-1" onClick={() => handleSelect("food", { type: "Media Pensión", price: 10 })} style={{ "cursor": "pointer" }}>
                            <span className="ms-3 mt-3 d-flex align-items-center">
                                <Form.Check
                                    style={{ "pointerEvents": "none", "display": "inline-block" }}
                                    type='radio'
                                    id="Media Pensión"
                                    name="food"
                                    label={``}
                                />
                                <h4 className="ms-1" style={{ "display": "inline" }}>Media Pensión</h4>
                            </span>
                            <ListGroup className="ms-3">
                                <ListGroup.Item className="border-0 w-75"><i className="fa-solid fa-check me-1"></i> Desayuno buffet completo</ListGroup.Item>
                                <ListGroup.Item className="border-0 w-75"><i className="fa-solid fa-check me-1"></i> Cena buffet</ListGroup.Item>
                                <ListGroup.Item className="border-0 w-75"><i className="fa-solid fa-check me-1"></i> No incluye bebidas en la cena</ListGroup.Item>
                            </ListGroup>
                            <div className="mt-auto me-3">
                                <h3 className="text-end mt-3">+10€</h3>
                                <div className="text-muted text-end mb-2" style={{ "fontSize": "12px", "marginTop": "-7px" }}>Persona/noche</div>
                            </div>
                        </Row>
                        <Row className="border d-flex flex-column mt-4 mx-1" onClick={() => handleSelect("food", { type: "Todo Incluido", price: 40 })} style={{ "cursor": "pointer" }}>
                            <span className="ms-3 mt-3 d-flex align-items-center">
                                <Form.Check
                                    style={{ "pointerEvents": "none", "display": "inline-block" }}
                                    type='radio'
                                    id="Todo Incluido"
                                    name="food"
                                    label={``}
                                />
                                <h4 className="ms-1" style={{ "display": "inline" }}>Todo Incluido</h4>
                            </span>
                            <ListGroup className="ms-3">
                                <ListGroup.Item className="border-0 w-75"><i className="fa-solid fa-check me-1"></i> Desayuno, almuerzo y cena buffet</ListGroup.Item>
                                <ListGroup.Item className="border-0 w-75"><i className="fa-solid fa-check me-1"></i> Snack Bar</ListGroup.Item>
                                <ListGroup.Item className="border-0 w-75"><i className="fa-solid fa-check me-1"></i> Helados a granel</ListGroup.Item>
                                <ListGroup.Item className="border-0 w-75"><i className="fa-solid fa-check me-1"></i> Servicio de bar (marcas nacionales)</ListGroup.Item>
                            </ListGroup>
                            <div className="mt-auto me-3">
                                <h3 className="text-end mt-3">+40€</h3>
                                <div className="text-muted text-end mb-2" style={{ "fontSize": "12px", "marginTop": "-7px" }}>Persona/noche</div>
                            </div>
                        </Row>
                        <h3 className="mt-5">Complete su reserva (Opcional)</h3>
                        <Row className="border mt-4 mx-1" onClick={() => handleSelect("parking", { type: "Parking", price: 30 })} style={{ "cursor": "pointer" }}>
                            <Col xs={5} className="p-3">
                                <Form.Check
                                    style={{ "pointerEvents": "none", "position": "absolute", "marginTop": "5px", "marginLeft": "12px" }}
                                    type='radio'
                                    id="Parking"
                                    name="parking"
                                    label={``}
                                />
                                <Image className="h-100" src="/assets/parking.png" fluid />
                            </Col>
                            <Col xs={7} className="d-flex flex-column">
                                <h3 className="mt-2 mt-md-3 ms-3 mb-4 mb-sm-0">Parking en el hotel</h3>
                                <h3 className="text-end mt-auto">+30€</h3>
                            </Col>
                        </Row>
                    </Col>
                    <Col xs={12} lg={4} className="mt-5">
                        <BookingDetails hotel={hotel} />
                    </Col>
                </Row>
                <Comments hotel={hotel} />
            </Container>
        </>
    )
}