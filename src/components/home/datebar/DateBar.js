import { Button, Col, Container, Dropdown, Row } from "react-bootstrap"

import { DatePicker } from "../DatePicker"

export const DateBar = () => {

    return (
        <div className="homeDateBar">
            <Container className="bg-warning">
                <Row>
                    <Col xs={12} xl={4} className="p-2">
                        <div className="d-grid">
                            <Button
                                className="border-0 rounded-0 shadow-none"
                                style={{ "backgroundColor": "white", "color": "black", "fontSize": "14px" }}
                                variant="primary"
                                size="lg"
                            >
                                <div className="float-start d-flex">
                                    <div style={{ "width": "45px" }}>
                                        <i className="fa-solid fa-bed fa-xl me-2" style={{ "color": "#BDBDBD" }}></i>
                                    </div>
                                    <strong>¿Adónde vas?</strong>
                                </div>
                            </Button>
                        </div>
                    </Col>
                    <Col xs={12} xl={3} className="p-2 py-0 py-xl-2 ps-xl-0 pe-xl-0">
                        <Dropdown>
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
                                        <strong>Check-in - Check-out</strong>
                                    </div>
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <DatePicker />
                                </Dropdown.Menu>
                            </div>
                        </Dropdown>
                    </Col>
                    <Col xs={12} xl={4} className="p-2">
                        <div className="d-grid">
                            <Button
                                className="border-0 rounded-0 shadow-none"
                                style={{ "backgroundColor": "white", "color": "black", "fontSize": "14px" }}
                                variant="primary" size="lg"
                            >
                                <div className="float-start d-flex">
                                    <div style={{ "width": "45px" }}>
                                        <i className="fa-solid fa-user-large fa-xl me-2" style={{ "color": "#BDBDBD" }}></i>
                                    </div>
                                    <strong>2 adultos - 0 niños - 1 habitación</strong>
                                </div>
                            </Button>
                        </div>
                    </Col>
                    <Col xs={12} xl={1} className="p-2 pt-0 pt-xl-2 ps-xl-0">
                        <div className="d-grid">
                            <Button
                                className="border-0 rounded-0 shadow-none"
                                style={{ "fontSize": "14px" }}
                                variant="primary"
                                size="lg"
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