import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Col, Container, Form, Image, ListGroup, Row } from "react-bootstrap";
import { Rating } from "react-simple-star-rating";
import Swal from "sweetalert2";

import { fetch_No_Token } from "../../helpers/fetch";
import { bookingStartAdd } from "../../actions/booking";
import { totalPriceBooking } from "../../helpers/totalPriceBooking";
import { stepChange } from "../../actions/ui";

export const HotelScreen = () => {

    const { HotelName } = useParams();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { role } = useSelector(state => state.auth);
    const { booking } = useSelector(state => state.booking);

    const [hotel, setHotel] = useState();
    const [availableRooms, setAvailableRooms] = useState();
    const [rooms, setRooms] = useState(1);
    const [days, setDays] = useState(3);
    const [roomId, setRoomId] = useState(null);
    const [roomType, setRoomType] = useState(null);
    const [persons, setPersons] = useState(2);
    const [food, setFood] = useState(null);
    const [parking, setParking] = useState({ type: "Sin Parking", price: 0 });
    const [total, setTotal] = useState(0);
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
                    setAvailableRooms(body.availableRooms);
                    setChecking(true);
                }
            } catch (error) {
                console.log(error);
                navigate("/");
            }
        }
        fetchData();
    }, [HotelName, navigate, booking.date.startDate, booking.date.endDate]);

    useEffect(() => {
        if (checking) {
            dispatch(bookingStartAdd(hotel._id, rooms, days, roomId, roomType, persons, food, parking));
            setTotal(totalPriceBooking(rooms, days, roomType, persons, food, parking));
        }
    }, [checking, hotel, rooms, days, roomId, roomType, persons, food, parking, dispatch])

    const handleSelect = (type, content) => {
        switch (type) {
            case "roomType":
                const free = availableRooms.find(room => room.category === content.type);
                if (!free) {
                    return Swal.fire('No disponible', `No hay habitaciones ${content.type} disponibles`, 'info');
                } else {
                    document.getElementById(content.type).checked ? document.getElementById(content.type).checked = false : document.getElementById(content.type).checked = true;
                    if (document.getElementById(content.type).checked) {
                        setRoomId(free._id);
                        return setRoomType(content);
                    } else {
                        setRoomId(null);
                        return setRoomType(null);
                    }
                }
            case "food":
                document.getElementById(content.type).checked ? document.getElementById(content.type).checked = false : document.getElementById(content.type).checked = true;
                return document.getElementById(content.type).checked ? setFood(content) : setFood(null)
            case "parking":
                document.getElementById(content.type).checked ? document.getElementById(content.type).checked = false : document.getElementById(content.type).checked = true;
                return document.getElementById(content.type).checked ? setParking(content) : setParking({ type: "Sin Parking", price: 0 })
            default:
                return
        }
    }

    const handleStart = () => {
        if (role !== "ADMIN_ROLE") {
            dispatch(stepChange(2));
            localStorage.setItem('step', 2);
            navigate("/datos");
        } else {
            Swal.fire('Login', "Debe cerrar la sesión de Administrador y acceder como cliente", 'info');
        }
    }

    return (
        checking &&
        <>
            <div className="hotel-head-text">
                <Image className="w-100" src={hotel.img} fluid />
                <div className='hotel-text-on-image'>
                    <h1>{hotel.name}</h1>
                    <Rating
                        className="ms-1"
                        style={{ "pointerEvents": "none" }}
                        size={30}
                        ratingValue={hotel.stars * 20}
                        allowHover={false}
                    />
                    <h3>{total}€</h3>
                </div>
            </div>
            <Container>
                <div className="mt-5" style={{ "whiteSpace": "pre-wrap" }}>{hotel.description}</div>
                <h3 className="mt-5">Elige tu habitación</h3>
                <Row>
                    <Col xs={12} lg={4} className="p-4">
                        <div className="border h-100 d-flex flex-column" onClick={() => handleSelect("roomType", { type: "Doble", price: hotel.doubleRoom.price })}>
                            <Form.Check
                                style={{ "pointerEvents": "none", "position": "absolute", "marginTop": "5px", "marginLeft": "12px" }}
                                type='radio'
                                id="Doble"
                                name="roomType"
                                label={``}
                            />
                            <Image className="w-100" src={hotel.doubleRoom.img} fluid />
                            <h4 className="mt-3 ms-3">Doble</h4>
                            <div className="text-muted ms-3"><i className="fa-solid fa-bed"></i> Capacidad: 2 adultos</div>
                            <h5 className="mt-2 text-muted ms-3">Amplitud y todas las facilidades</h5>
                            <div className="mt-auto me-3">
                                <h3 className="text-end mt-4">Desde {hotel.doubleRoom.price}€</h3>
                                <div className="text-muted text-end mb-2" style={{ "fontSize": "12px", "marginTop": "-7px" }}>habitación/noche - Impuestos incluidos</div>
                            </div>
                        </div>
                    </Col>
                    <Col xs={12} lg={4} className="p-4">
                        <div className="border h-100 d-flex flex-column" onClick={() => handleSelect("roomType", { type: "Familiar", price: hotel.familyRoom.price })}>
                            <Form.Check
                                style={{ "pointerEvents": "none", "position": "absolute", "marginTop": "5px", "marginLeft": "12px" }}
                                type='radio'
                                id="Familiar"
                                name="roomType"
                                label={``}
                            />
                            <Image className="w-100" src={hotel.familyRoom.img} fluid />
                            <h4 className="mt-3 ms-3">Familiar</h4>
                            <div className="text-muted ms-3"><i className="fa-solid fa-bed"></i> Capacidad: 2 adultos</div>
                            <h5 className="mt-2 text-muted ms-3">Espacio para toda la familia</h5>
                            <div className="mt-auto me-3">
                                <h3 className="text-end mt-4">Desde {hotel.familyRoom.price}€</h3>
                                <div className="text-muted text-end mb-2" style={{ "fontSize": "12px", "marginTop": "-7px" }}>habitación/noche - Impuestos incluidos</div>
                            </div>
                        </div>
                    </Col>
                    <Col xs={12} lg={4} className="p-4">
                        <div className="border h-100 d-flex flex-column" onClick={() => handleSelect("roomType", { type: "Suite", price: hotel.suiteRoom.price })}>
                            <Form.Check
                                style={{ "pointerEvents": "none", "position": "absolute", "marginTop": "5px", "marginLeft": "12px" }}
                                type='radio'
                                id="Suite"
                                name="roomType"
                                label={``}
                            />
                            <Image className="w-100" src={hotel.suiteRoom.img} fluid />
                            <h4 className="mt-3 ms-3">Suite</h4>
                            <div className="text-muted ms-3"><i className="fa-solid fa-bed"></i> Capacidad: 2 adultos</div>
                            <h5 className="mt-2 text-muted ms-3">Dos pisos para ti y tu acompañante</h5>
                            <div className="mt-auto me-3">
                                <h3 className="text-end mt-4">Desde {hotel.suiteRoom.price}€</h3>
                                <div className="text-muted text-end mb-2" style={{ "fontSize": "12px", "marginTop": "-7px" }}>habitación/noche - Impuestos incluidos</div>
                            </div>
                        </div>
                    </Col>
                </Row>
                <h3 className="mt-5">Elige un régimen</h3>
                <Row>
                    <Col xs={12} lg={4} className="p-4">
                        <div className="border h-100 d-flex flex-column" onClick={() => handleSelect("food", { type: "Alojamiento y desayuno", price: 0 })}>
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
                                <ListGroup.Item className="border-0"><i className="fa-solid fa-check me-1"></i> Desayuno buffet completo</ListGroup.Item>
                            </ListGroup>
                            <h3 className="text-end mt-auto me-3 mb-3">Incluido</h3>
                        </div>
                    </Col>
                    <Col xs={12} lg={4} className="p-4">
                        <div className="border h-100 d-flex flex-column" onClick={() => handleSelect("food", { type: "Media Pensión", price: 10 })}>
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
                                <ListGroup.Item className="border-0"><i className="fa-solid fa-check me-1"></i> Desayuno buffet completo</ListGroup.Item>
                                <ListGroup.Item className="border-0"><i className="fa-solid fa-check me-1"></i> Cena buffet</ListGroup.Item>
                                <ListGroup.Item className="border-0"><i className="fa-solid fa-check me-1"></i> No incluye bebidas en la cena</ListGroup.Item>
                            </ListGroup>
                            <div className="mt-auto me-3">
                                <h3 className="text-end mt-3">+10€</h3>
                                <div className="text-muted text-end mb-2" style={{ "fontSize": "12px", "marginTop": "-7px" }}>Persona/noche</div>
                            </div>
                        </div>
                    </Col>
                    <Col xs={12} lg={4} className="p-4">
                        <div className="border h-100 d-flex flex-column" onClick={() => handleSelect("food", { type: "Todo Incluido", price: 40 })}>
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
                                <ListGroup.Item className="border-0"><i className="fa-solid fa-check me-1"></i> Desayuno, almuerzo y cena buffet</ListGroup.Item>
                                <ListGroup.Item className="border-0"><i className="fa-solid fa-check me-1"></i> Snack Bar</ListGroup.Item>
                                <ListGroup.Item className="border-0"><i className="fa-solid fa-check me-1"></i> Helados a granel</ListGroup.Item>
                                <ListGroup.Item className="border-0"><i className="fa-solid fa-check me-1"></i> Servicio de bar (marcas nacionales)</ListGroup.Item>
                            </ListGroup>
                            <div className="mt-auto me-3">
                                <h3 className="text-end mt-3">+40€</h3>
                                <div className="text-muted text-end mb-2" style={{ "fontSize": "12px", "marginTop": "-7px" }}>Persona/noche</div>
                            </div>
                        </div>
                    </Col>
                </Row>
                <h3 className="mt-5">Complete su reserva</h3>
                <Row className="mb-5">
                    <Col xs={12} lg={4} className="p-4">
                        <div className="border h-100 d-flex flex-column" onClick={() => handleSelect("parking", { type: "Parking", price: 30 })}>
                            <Form.Check
                                style={{ "pointerEvents": "none", "position": "absolute", "marginTop": "5px", "marginLeft": "12px" }}
                                type='radio'
                                id="Parking"
                                name="parking"
                                label={``}
                            />
                            <Image className="w-100" src="/assets/parking.png" fluid />
                            <h4 className="mt-3 ms-3 mb-5">Parking en el hotel</h4>
                            <h4 className="mt-auto me-3 text-end">Por solo 30€</h4>
                        </div>
                    </Col>
                    <Col xs={12} lg={4}>
                    </Col>
                    <Col xs={12} lg={4}>
                    </Col>
                </Row>
                <div className="d-grid mt-5 mb-5">
                    <Button onClick={handleStart}>
                        Continuar a datos personales {total}€
                    </Button>
                </div>
            </Container>
        </>
    )
}