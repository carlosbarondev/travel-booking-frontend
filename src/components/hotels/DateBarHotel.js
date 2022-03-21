import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Col, Container, Dropdown, Row } from "react-bootstrap"
import { lightFormat } from 'date-fns';
import Swal from "sweetalert2";

import { DatePicker } from "../ui/DatePicker";
import { stepChange } from "../../actions/ui";

export const DateBarHotel = () => {

    const { role } = useSelector(state => state.auth);
    const { booking } = useSelector(state => state.booking);

    const dispatch = useDispatch();
    const navigate = useNavigate();

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
        <div className="sticky">
            <Container className="bg-warning">
                <Row>
                    <Col xs={6} lg={4} className="p-1">
                        <Dropdown id="dropDownDate">
                            <div className="d-grid">
                                <Dropdown.Toggle
                                    id="dropdown-basic"
                                    className="border-0 rounded-0 shadow-none"
                                    style={{ "backgroundColor": "white", "color": "black", "fontSize": "14px" }}
                                    variant="primary"
                                    size="lg"
                                >
                                    <div className="float-start d-flex">
                                        <div className="disableIcon" style={{ "width": "45px" }}>
                                            <i className="fa-solid fa-calendar-days fa-xl me-2" style={{ "color": "#BDBDBD" }}></i>
                                        </div>
                                        {
                                            booking?.date
                                                ? <strong className="fontSM">{lightFormat(new Date(booking.date.startDate), 'dd/MM/yyyy')} - {lightFormat(new Date(booking.date.endDate), 'dd/MM/yyyy')}</strong>
                                                : <strong className="fontSM">Check-in - Check-out</strong>
                                        }
                                    </div>
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <DatePicker />
                                </Dropdown.Menu>
                            </div>
                        </Dropdown>
                    </Col>
                    <Col xs={6} lg={4} className="p-1 py-lg-1 ps-0 pe-lg-0">
                        <div className="d-grid">
                            <Button
                                className="border-0 rounded-0 shadow-none"
                                style={{ "backgroundColor": "white", "color": "black", "fontSize": "14px" }}
                                variant="primary" size="lg"
                            >
                                <div className="float-start d-flex">
                                    <div className="disableIcon" style={{ "width": "45px" }}>
                                        <i className="fa-solid fa-user-large fa-xl me-2" style={{ "color": "#BDBDBD" }}></i>
                                    </div>
                                    <strong className="fontSM">2 adultos - 0 niños</strong>
                                </div>
                            </Button>
                        </div>
                    </Col>
                    <Col xs={12} lg={4} className="p-1 pt-0 pt-lg-1">
                        <div className="d-grid">
                            <Button
                                className="border-0 rounded-0 shadow-none"
                                style={{ "fontSize": "14px" }}
                                variant="primary"
                                size="lg"
                                onClick={handleStart}
                            >
                                <strong>Reservar {booking.total ? `${booking.total}€` : null}</strong>
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}