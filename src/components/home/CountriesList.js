import { Col, Container, Image, Row } from "react-bootstrap"

export const CountriesList = () => {
    return (
        <Container className="mt-4">
            <Row>
                <Col xs={12} md={6} className="p-md-0 pe-md-2">
                    <Image src="https://www.caracteristicas.co/wp-content/uploads/2017/05/espa%C3%B1a-e1570587854254.jpg" fluid />
                </Col>
                <Col xs={12} md={6} className="mt-3 mt-md-0 p-md-0 ps-md-2">
                    <Image src="https://www.caracteristicas.co/wp-content/uploads/2017/05/espa%C3%B1a-e1570587854254.jpg" fluid />
                </Col>
            </Row>
            <Row className="mt-0 mt-md-3">
                <Col xs={12} md={4} className="mt-3 mt-md-0 p-md-0 pe-md-3">
                    <Image src="https://www.caracteristicas.co/wp-content/uploads/2017/05/espa%C3%B1a-e1570587854254.jpg" fluid />
                </Col>
                <Col xs={12} md={4} className="mt-3 mt-md-0 p-md-0">
                    <Image src="https://www.caracteristicas.co/wp-content/uploads/2017/05/espa%C3%B1a-e1570587854254.jpg" fluid />
                </Col>
                <Col xs={12} md={4} className="mt-3 mt-md-0 p-md-0 ps-md-3">
                    <Image src="https://www.caracteristicas.co/wp-content/uploads/2017/05/espa%C3%B1a-e1570587854254.jpg" fluid />
                </Col>
            </Row>
        </Container>
    )
}