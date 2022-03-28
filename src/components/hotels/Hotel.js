import { useNavigate } from "react-router-dom";
import { Button, Col, Image, Row } from "react-bootstrap";
import { normalizeText } from 'normalize-text';
import { Rating } from "react-simple-star-rating";

export const Hotel = (props) => {

    const navigate = useNavigate();

    const { name, country, city, img, stars, doubleRoom } = props;

    return (
        <Row className="border mb-4" onClick={() => navigate(`/hoteles/${normalizeText(name.replace(/\s+/g, "-"))}`)}>
            <Col xs={4} className="p-0">
                <Image className="h-100" src={img} fluid />
            </Col>
            <Col xs={8}>
                <h5>{name}</h5>
                <Rating
                    className="ms-1"
                    style={{ "pointerEvents": "none" }}
                    size={25}
                    ratingValue={stars * 20}
                    allowHover={false}
                />
                <div>{country}</div>
                <div>{city}</div>
                <Button>{`Disfrútalo desde ${doubleRoom.price} €`}</Button>
            </Col>
        </Row>
    )
}