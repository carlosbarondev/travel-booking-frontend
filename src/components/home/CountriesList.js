import { Col, Container, Image, Row } from "react-bootstrap"

export const CountriesList = () => {
    return (
        <Container className="mt-4">
            <Row>
                <Col xs={12} sm={6} className="p-0 pe-2">
                    <Image src="https://www.caracteristicas.co/wp-content/uploads/2017/05/espa%C3%B1a-e1570587854254.jpg" fluid />
                </Col>
                <Col xs={12} sm={6} className="p-0 ps-2">
                    <Image src="https://www.caracteristicas.co/wp-content/uploads/2017/05/espa%C3%B1a-e1570587854254.jpg" fluid />
                </Col>
            </Row>
            <Row className="mt-3">
                <Col xs={12} sm={4} className="p-0 pe-3">
                    <Image src="https://www.caracteristicas.co/wp-content/uploads/2017/05/espa%C3%B1a-e1570587854254.jpg" fluid />
                </Col>
                <Col xs={12} sm={4} className="p-0">
                    <Image src="https://www.caracteristicas.co/wp-content/uploads/2017/05/espa%C3%B1a-e1570587854254.jpg" fluid />
                </Col>
                <Col xs={12} sm={4} className="p-0 ps-3">
                    <Image src="https://www.caracteristicas.co/wp-content/uploads/2017/05/espa%C3%B1a-e1570587854254.jpg" fluid />
                </Col>
            </Row>
        </Container>
    )
}