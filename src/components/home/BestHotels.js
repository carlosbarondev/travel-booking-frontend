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
            <h3 className="mt-2 mb-4 ms-2 ms-sm-0"><strong>Hoteles Mejor Valorados</strong></h3>
            <Row xs={2} sm={3} md={4} lg={5} className="g-0">
                {
                    hotels.map((hotel) => (
                        <Col className="bestHotel" key={hotel._id} onClick={() => handleHotel(hotel.name)}>
                            <Card>
                                <Card.Img style={{ "height": "124px" }} variant="top" src={hotel.img} />
                                <Card.Body>
                                    <Card.Title style={{ "whiteSpace": "nowrap", "overflow": "hidden" }}>{hotel.name}</Card.Title>
                                    <Rating
                                        style={{ "pointerEvents": "none", "marginTop": "-15px" }}
                                        size={20}
                                        ratingValue={hotel.stars * 20}
                                        allowHover={false}
                                    />
                                    <Card.Text>
                                        {hotel.city}
                                    </Card.Text>
                                    <div className="ratingHome rounded-end">
                                        <strong className="p-2">{hotel.rating ? hotel.rating / 10 : 0}</strong>
                                    </div>
                                    <span className="text-muted ms-2">{hotel.comments.length} {hotel.comments.length === 1 ? "comentario" : "comentarios"}</span>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                }
            </Row>
        </Container>
    )
}