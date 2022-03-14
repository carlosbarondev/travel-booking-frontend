import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Col, Container, Image, Row } from "react-bootstrap";

import { fetch_No_Token } from "../../helpers/fetch";

export const HotelScreen = () => {

    const { HotelName } = useParams();

    const navigate = useNavigate();

    const [hotel, setHotel] = useState();
    const [checking, setChecking] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try {
                const resp = await fetch_No_Token(`hotels/${HotelName}`);
                const body = await resp.json();
                if (body.msg) {
                    console.log(body.msg);
                    navigate("/");
                } else {
                    setHotel(body.hotel);
                    setChecking(true);
                }
            } catch (error) {
                console.log(error);
                navigate("/");
            }
        }
        fetchData();
    }, [HotelName, navigate]);

    return (
        checking &&
        <>
            <div className="hotel-head-text">
                <Image className="w-100" src={hotel.img} fluid />
                <div className='hotel-text-on-image'>
                    <h1>{hotel.name}</h1>
                    <h5>stars</h5>
                </div>
            </div>
            <Container>
                <div className="mt-5" style={{ "whiteSpace": "pre-wrap" }}>{hotel.description}</div>
                <h3 className="mt-5">Elige tu habitación</h3>
                <Row className="mb-5">
                    <Col xs={4} className="p-4">
                        <div className="border">
                            <Image className="w-100" src={hotel.doubleRoom.img} fluid />
                            <Container className="mt-3">
                                <h4>Doble</h4>
                                <div className="text-muted"><i class="fa-solid fa-bed"></i> Capacidad: 2 adultos</div>
                                <h5 className="mt-2 text-muted">Amplitud y todas las facilidades</h5>
                                <h3 className="text-end mt-5">Desde {hotel.doubleRoom.price} €</h3>
                                <div className="text-muted text-end mb-2" style={{ "fontSize": "12px", "marginTop": "-7px" }}>habitación/noche - Impuestos incluidos</div>
                            </Container>
                        </div>
                    </Col>
                    <Col xs={4} className="p-4">
                        <div className="border">
                            <Image className="w-100" src={hotel.familyRoom.img} fluid />
                            <Container className="mt-3">
                                <h4>Familiar</h4>
                                <div className="text-muted"><i class="fa-solid fa-bed"></i> Capacidad: 2 adultos</div>
                                <h5 className="mt-2 text-muted">Espacio para toda la familia</h5>
                                <h3 className="text-end mt-5">Desde {hotel.familyRoom.price} €</h3>
                                <div className="text-muted text-end mb-2" style={{ "fontSize": "12px", "marginTop": "-7px" }}>habitación/noche - Impuestos incluidos</div>
                            </Container>
                        </div>
                    </Col>
                    <Col xs={4} className="p-4">
                        <div className="border">
                            <Image className="w-100" src={hotel.suiteRoom.img} fluid />
                            <Container className="mt-3">
                                <h4>Suite</h4>
                                <div className="text-muted"><i class="fa-solid fa-bed"></i> Capacidad: 2 adultos</div>
                                <h5 className="mt-2 text-muted">Dos pisos para ti y tu acompañante</h5>
                                <h3 className="text-end mt-5">Desde {hotel.suiteRoom.price} €</h3>
                                <div className="text-muted text-end mb-2" style={{ "fontSize": "12px", "marginTop": "-7px" }}>habitación/noche - Impuestos incluidos</div>
                            </Container>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    )
}