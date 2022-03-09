import { Button, Col, Container, Dropdown, Row } from "react-bootstrap"

import { DatePicker } from "../DatePicker"

export const DateBar = () => {

    return (
        <div className="homeDateBar">
            <Container>
                <Row className="border border-3 border-warning">
                    <Col xs={12} sm={4} className="border border-3 border-warning p-0">
                        <div className="d-grid">
                            <Button
                                className="border border-warning rounded-0 shadow-none"
                                style={{ "backgroundColor": "white", "color": "black", "fontSize": "14px" }}
                                variant="primary"
                                size="lg"
                            >
                                <span className="float-start">
                                    <i className="fa-solid fa-bed fa-lg me-3" style={{ "color": "#BDBDBD" }}></i>
                                    <strong>¿Adónde vas?</strong>
                                </span>
                            </Button>
                        </div>
                    </Col>
                    <Col xs={12} sm={3} className="border border-3 border-warning border-start-1 border-end-1 p-0">
                        <Dropdown>
                            <div className="d-grid">
                                <Dropdown.Toggle
                                    id="dropdown-basic"
                                    className="border border-warning rounded-0 shadow-none"
                                    style={{ "backgroundColor": "white", "color": "black", "fontSize": "14px" }}
                                    variant="primary"
                                    size="lg"
                                >
                                    <span className="float-start">
                                        <i className="fa-solid fa-calendar-days fa-lg me-3" style={{ "color": "#BDBDBD" }}></i>
                                        <strong>Check-in - Check-out</strong>
                                    </span>
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <DatePicker />
                                </Dropdown.Menu>
                            </div>
                        </Dropdown>
                    </Col>
                    <Col xs={12} sm={4} className="border border-3 border-warning p-0">
                        <div className="d-grid">
                            <Button
                                className="border border-warning rounded-0 shadow-none"
                                style={{ "backgroundColor": "white", "color": "black", "fontSize": "14px" }}
                                variant="primary" size="lg"
                            >
                                <span className="float-start">
                                    <i className="fa-solid fa-user-large fa-lg me-3" style={{ "color": "#BDBDBD" }}></i>
                                    <strong>2 adultos - 0 niños - 1 habitación</strong>
                                </span>
                            </Button>
                        </div>
                    </Col>
                    <Col xs={12} sm={1} className="border border-3 border-warning border-start-1 p-0">
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