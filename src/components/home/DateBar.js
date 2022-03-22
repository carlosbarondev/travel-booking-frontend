import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Col, Container, Dropdown, Row } from "react-bootstrap"
import { lightFormat } from 'date-fns';

import { DatePicker } from "../ui/DatePicker";
import { RoomPicker } from "../ui/RoomPicker";
import { CountryPicker } from "../ui/CountryPicker";

export const DateBar = () => {

    const navigate = useNavigate();

    const { booking } = useSelector(state => state.booking);

    const [open1, setOpen1] = useState();
    const [open2, setOpen2] = useState();
    const [open3, setOpen3] = useState();

    return (
        <div className="homeDateBar">
            <Container className="bg-warning">
                <Row>
                    <Col xs={12} lg={3} className="p-1">
                        <Dropdown
                            id="dropDownCountry"
                            onToggle={(isOpen) => {
                                if (isOpen) {
                                    setOpen1(false);
                                } else {
                                    setOpen1(true);
                                }
                            }}
                        >
                            <div className="d-grid">
                                <Dropdown.Toggle
                                    id="dropdown-basic"
                                    className="border-0 rounded-0 shadow-none"
                                    style={{ "backgroundColor": "white", "color": "black", "fontSize": "14px" }}
                                    variant="primary"
                                    size="lg"
                                >
                                    <div className="float-start d-flex">
                                        <div style={{ "width": "45px" }}>
                                            <i className="fa-solid fa-earth-europe fa-xl me-2" style={{ "color": "#BDBDBD" }}></i>
                                        </div>
                                        {
                                            booking?.country
                                                ? <strong>{booking.country}</strong>
                                                : <strong>¿Adónde vas?</strong>
                                        }
                                    </div>
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <CountryPicker open={open1} />
                                </Dropdown.Menu>
                            </div>
                        </Dropdown>
                    </Col>
                    <Col xs={12} lg={4} className="p-1 py-0 py-lg-1 ps-lg-0 pe-lg-0">
                        <Dropdown
                            id="dropDownDate"
                            onToggle={(isOpen) => {
                                if (isOpen) {
                                    setOpen2(false);
                                } else {
                                    setOpen2(true);
                                }
                            }}
                        >
                            <div className="d-grid">
                                <Dropdown.Toggle
                                    id="dropdown-basic"
                                    className="border-0 rounded-0 shadow-none"
                                    style={{ "backgroundColor": "white", "color": "black", "fontSize": "14px" }}
                                    variant="primary"
                                    size="lg"
                                >
                                    <div className="float-start d-flex">
                                        <div style={{ "width": "45px" }}>
                                            <i className="fa-solid fa-calendar-days fa-xl me-2" style={{ "color": "#BDBDBD" }}></i>
                                        </div>
                                        {
                                            booking?.date
                                                ? <strong>{lightFormat(new Date(booking.date.startDate), 'dd/MM/yyyy')} - {lightFormat(new Date(booking.date.endDate), 'dd/MM/yyyy')}</strong>
                                                : <strong>Check-in - Check-out</strong>
                                        }
                                    </div>
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <DatePicker open={open2} />
                                </Dropdown.Menu>
                            </div>
                        </Dropdown>
                    </Col>
                    <Col xs={12} lg={3} className="p-1">
                        <Dropdown
                            id="dropDownRoom"
                            onToggle={(isOpen) => {
                                if (isOpen) {
                                    setOpen3(false);
                                } else {
                                    setOpen3(true);
                                }
                            }}
                        >
                            <div className="d-grid">
                                <Dropdown.Toggle
                                    id="dropdown-basic"
                                    className="border-0 rounded-0 shadow-none"
                                    style={{ "backgroundColor": "white", "color": "black", "fontSize": "14px" }}
                                    variant="primary"
                                    size="lg"
                                >
                                    <div className="float-start d-flex">
                                        <div style={{ "width": "45px" }}>
                                            <i className="fa-solid fa-user-large fa-xl me-2" style={{ "color": "#BDBDBD" }}></i>
                                        </div>
                                        {
                                            booking?.adults
                                                ? <strong>{booking.adults} {booking.adults === 1 ? "adulto" : "adultos"} - {booking.children} {booking.children === 1 ? "niño" : "niños"}</strong>
                                                : <strong>2 adultos - 0 niños</strong>
                                        }
                                    </div>
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <RoomPicker open={open3} />
                                </Dropdown.Menu>
                            </div>
                        </Dropdown>
                    </Col>
                    <Col xs={12} lg={2} className="p-1 pt-0 pt-lg-1 ps-lg-0">
                        <div className="d-grid">
                            <Button
                                className="border-0 rounded-0 shadow-none"
                                style={{ "fontSize": "14px" }}
                                variant="primary"
                                size="lg"
                                onClick={() => navigate("/hoteles")}
                            >
                                <strong>Buscar</strong>
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}