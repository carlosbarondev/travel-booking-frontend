import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Card, Col, Container, Row } from "react-bootstrap"
import { Rating } from "react-simple-star-rating";
import { normalizeText } from 'normalize-text';

import { fetch_No_Token } from "../../helpers/fetch";
import { initBooking } from "../../helpers/initBooking";

export const BestHotels = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { booking } = useSelector(state => state.booking);

    const [hotels, setHotels] = useState();
    const [checking, setChecking] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try {
                const resp = await fetch_No_Token(`hotels/?limit=10`);
                const body = await resp.json();
                setHotels(body.hotels);
                setChecking(true);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, []);

    const handleHotel = (name) => {
        initBooking(booking, dispatch);
        navigate(`/hoteles/${normalizeText(name.replace(/\s+/g, "-"))}`);
    }

    return (
        checking && <Container className="mt-4 mb-4 p-0">
            <h4 className="mb-3">Hoteles Mejor Valorados</h4>
            <Row xs={3} sm={4} md={5} className="g-3">
                {
                    hotels.map((hotel) => (
                        <Col key={hotel._id} onClick={() => handleHotel(hotel.name)}>
                            <Card>
                                <Card.Img variant="top" src={hotel.img} />
                                <Card.Body>
                                    <Card.Title>{hotel.name}</Card.Title>
                                    <Rating
                                        className=""
                                        style={{ "pointerEvents": "none", "marginTop": "-15px" }}
                                        size={20}
                                        ratingValue={hotel.stars * 20}
                                        allowHover={false}
                                    />
                                    <Card.Text>
                                        {hotel.city}
                                    </Card.Text>
                                    <Card.Text>
                                        {hotel.country}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                }
            </Row>
        </Container>
    )
}