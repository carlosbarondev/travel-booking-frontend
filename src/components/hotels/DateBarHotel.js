import { useState } from "react";
import { useSelector } from "react-redux";
import { Col, Container, Dropdown, Row } from "react-bootstrap"
import { lightFormat } from 'date-fns';

import { DatePicker } from "../ui/DatePicker";
import { RoomPicker } from "../ui/RoomPicker";

export const DateBarHotel = () => {

    const { booking } = useSelector(state => state.booking);

    const [open1, setOpen1] = useState();
    const [open2, setOpen2] = useState();

    return (
        <Container className="bg-warning">
            <Row>
                <Col xs={12} sm={6} className="p-1">
                    <Dropdown
                        id="dropDownDate"
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
                                <DatePicker open={open1} />
                            </Dropdown.Menu>
                        </div>
                    </Dropdown>
                </Col>
                <Col xs={12} sm={6} className="p-0 p-sm-1 py-lg-1 ps-1 pe-1 pb-1 ps-sm-0">
                    <Dropdown
                        id="dropDownRoom"
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
                                        <i className="fa-solid fa-user-large fa-xl me-2" style={{ "color": "#BDBDBD" }}></i>
                                    </div>
                                    <strong>
                                        {booking.adults} {booking.adults === 1 ? "adulto" : "adultos"} - {booking.children} {booking.children === 1 ? "niño" : "niños"}
                                    </strong>
                                </div>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <RoomPicker open={open2} />
                            </Dropdown.Menu>
                        </div>
                    </Dropdown>
                </Col>
            </Row>
        </Container>
    )
}