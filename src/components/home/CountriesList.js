import { Col, Container, Image, Row } from "react-bootstrap"

export const CountriesList = () => {
    return (
        <Container className="mt-4">
            <Row>
                <Col xs={12} md={6} className="p-md-0 pe-md-2 head-text">
                    <Image src="https://img.freepik.com/foto-gratis/espana-sevilla-plaza-espana-ejemplo-emblematico-estilo-renacentista-arquitectura-espanola_521059-6001.jpg?w=1380" fluid />
                    <div className='text-on-image'>
                        <h2>España</h2>
                        <h5>20 alojamientos</h5>
                    </div>
                </Col>
                <Col xs={12} md={6} className="mt-3 mt-md-0 p-md-0 ps-md-2">
                    <Image src="https://www.civitatis.com/blog/wp-content/uploads/2020/05/blo-star-wars.jpg" fluid />
                </Col>
            </Row>
            <Row className="mt-0 mt-md-3">
                <Col xs={12} md={4} className="mt-3 mt-md-0 p-md-0 pe-md-3">
                    <Image src="https://www.civitatis.com/blog/wp-content/uploads/2020/05/blo-star-wars.jpg" fluid />
                </Col>
                <Col xs={12} md={4} className="mt-3 mt-md-0 p-md-0">
                    <Image src="https://www.civitatis.com/blog/wp-content/uploads/2020/05/blo-star-wars.jpg" fluid />
                </Col>
                <Col xs={12} md={4} className="mt-3 mt-md-0 p-md-0 ps-md-3">
                    <Image src="https://www.civitatis.com/blog/wp-content/uploads/2020/05/blo-star-wars.jpg" fluid />
                </Col>
            </Row>
        </Container>
    )
}