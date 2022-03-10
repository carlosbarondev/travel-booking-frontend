import { Card, Col, Container, Row } from "react-bootstrap"

export const DiscoverList = () => {
    return (
        <Container className="mt-4 mb-5 p-0">
            <h4 className="mb-3">Descubre España</h4>
            <Row xs={3} sm={4} md={6} className="g-0">
                {Array.from({ length: 6 }).map((_, idx) => (
                    <Col key={idx}>
                        <Card>
                            <Card.Img variant="top" src="holder.js/100px160" />
                            <Card.Body>
                                <Card.Title>Card title</Card.Title>
                                <Card.Text>
                                    This is a longer card with supporting text below as a natural
                                    lead-in to additional content. This content is a little bit longer.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    )
}