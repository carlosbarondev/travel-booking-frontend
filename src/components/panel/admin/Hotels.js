import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Card, Col, ListGroup, Row } from "react-bootstrap";
import Swal from "sweetalert2";
import { normalizeText } from 'normalize-text';

import { fetch_Token } from "../../../helpers/fetch";
import { HotelAddModal } from "./HotelAddModal";
import { initBooking } from "../../../helpers/initBooking";

export const Hotels = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { booking } = useSelector(state => state.booking);

    const [hotels, setHotels] = useState(false);
    const [modalShow, setModalShow] = useState(false);
    const [checking, setChecking] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try {
                const resp = await fetch_Token(`hotels?visible=${`{"state": {"$in" : ["true", "false"]}}`}&order=""`);
                const body = await resp.json();
                setHotels(body.hotels);
                setChecking(true);
            } catch (error) {
                console.log(error);
                return Swal.fire('Error', error.message, 'error');
            }
        }
        fetchData();
    }, []);

    const handleLink = (name) => {
        initBooking(booking, dispatch);
        navigate(`/hoteles/${normalizeText(name.replace(/\s+/g, "-"))}`);
    }

    return (
        checking && <div className="animate__animated animate__fadeIn mt-4 mb-5">
            <h3>Gestión de Hoteles</h3>
            <Card className="mt-4">
                <Card.Header>
                    <Row className="align-items-center">
                        <Col xs={5} sm={4} md={4}>
                            Nombre
                        </Col>
                        <Col xs={0} sm={0} md={2} className="disable-card-header">
                            País
                        </Col>
                        <Col xs={3} sm={4} md={2}>
                            Estado
                        </Col>
                        <Col xs={4} sm={4} md={4}>
                        </Col>
                    </Row>
                </Card.Header>
                <ListGroup variant="flush">
                    {
                        hotels.map(hotel =>
                            <ListGroup.Item key={hotel._id}>
                                <Row className="align-items-center">
                                    <Col xs={5} sm={4} md={4}>
                                        <div className="linkHotel" style={{ "cursor": "pointer" }} onClick={() => handleLink(hotel.name)}>{hotel.name}</div>
                                    </Col>
                                    <Col xs={0} sm={0} md={2} className="disable-card-header">
                                        {hotel.country}
                                    </Col>
                                    <Col xs={3} sm={4} md={2}>
                                        {
                                            hotel.state ? <span className="text-success">Activo</span> : <span className="text-danger">Deshabilitado</span>
                                        }
                                    </Col>
                                    <Col xs={4} sm={4} md={4} className="mt-2 mt-sm-0">
                                        <div className="d-grid">
                                            <Button
                                                className="me-1"
                                                variant="outline-primary"
                                                size="sm"
                                                onClick={() => navigate(`/panel/hoteles/${normalizeText(hotel.name.replace(/\s+/g, '-'))}`)}
                                            >
                                                Editar
                                            </Button>
                                        </div>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        )
                    }
                </ListGroup>
            </Card>
            <Button className="mt-4" onClick={() => setModalShow("open")}>
                Agregar Hotel
            </Button>
            <HotelAddModal
                setModalShow={setModalShow}
                show={modalShow === "open"}
                onHide={() => setModalShow("")}
            />
        </div>
    )
}