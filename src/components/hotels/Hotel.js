import { useNavigate } from "react-router-dom";
import { Col, Image, Row } from "react-bootstrap";
import { normalizeText } from 'normalize-text';

export const Hotel = (props) => {

    const navigate = useNavigate();

    const { name, country, city, img } = props;

    return (
        <Row className="border mb-4" onClick={() => navigate(`/hoteles/${normalizeText(name.replace(/\s+/g, "-"))}`)}>
            <Col xs={4} className="d-flex justify-content-center align-items-center">
                <Image src={img} fluid style={{ "maxHeight": "200px" }} />
            </Col>
            <Col xs={8}>
                <h5>{name}</h5>
                <div>{country}</div>
                <div>{city}</div>
            </Col>
        </Row>
    )
}