import { Button, Col, Container, Dropdown, Row } from "react-bootstrap"

import { DatePicker } from "../DatePicker"

export const DateBar = () => {

    return (
        <div className="homeDateBar">
            <Container>
                <Row className="border border-3 border-warning">
                    <Col xs={12} xl={4} className="border border-3 border-warning p-0">
                        <div className="d-grid">
                            <Button
                                className="border border-warning rounded-0 shadow-none"
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
                    <Col xs={12} xl={3} className="border border-3 border-warning border-start-1 border-end-1 p-0">
                        <Dropdown>
                            <div className="d-grid">
                                <Dropdown.Toggle
                                    id="dropdown-basic"
                                    className="border border-warning rounded-0 shadow-none"
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
                    <Col xs={12} xl={4} className="border border-3 border-warning p-0">
                        <div className="d-grid">
                            <Button
                                className="border border-warning rounded-0 shadow-none"
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
                    <Col xs={12} xl={1} className="border border-3 border-warning border-start-1 p-0">
                        <div className="d-grid">
                            <Button
                                className="border border-warning rounded-0 shadow-none"
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