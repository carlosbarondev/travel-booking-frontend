import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Col, Container, Image, Row } from "react-bootstrap"

import { bookingAddCountry } from "../../actions/booking";

export const CountriesList = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleCountry = (country) => {
        dispatch(bookingAddCountry(country));
        navigate("/hoteles");
    }

    return (
        <Container className="mt-4">
            <Row>
                <Col xs={12} md={6} className="p-md-0 pe-md-2 head-text" onClick={() => handleCountry("España")}>
                    <Image
                        src="/assets/spain.png"
                        fluid
                    />
                    <div className='text-on-image'>
                        <h2>España</h2>
                        <h5>20 alojamientos</h5>
                    </div>
                </Col>
                <Col xs={12} md={6} className="mt-3 mt-md-0 p-md-0 ps-md-2 head-text">
                    <Image
                        src="/assets/france.jpg"
                        fluid
                    />
                    <div className='text-on-image'>
                        <h2>Francia</h2>
                        <h5>20 alojamientos</h5>
                    </div>
                </Col>
            </Row>
            <Row className="mt-0 mt-md-3">
                <Col xs={12} md={4} className="mt-3 mt-md-0 p-md-0 pe-md-2 head-text">
                    <Image
                        src="/assets/italy.jpg"
                        fluid
                    />
                    <div className='text-on-image'>
                        <h2>Italia</h2>
                        <h5>20 alojamientos</h5>
                    </div>
                </Col>
                <Col xs={12} md={4} className="mt-3 mt-md-0 px-md-1 head-text">
                    <Image

                        src="/assets/england.jpg"
                        fluid
                    />
                    <div className='text-on-image'>
                        <h2>Inglaterra</h2>
                        <h5>20 alojamientos</h5>
                    </div>
                </Col>
                <Col xs={12} md={4} className="mt-3 mt-md-0 p-md-0 ps-md-2 head-text">
                    <Image
                        src="/assets/germany.jpg"
                        fluid
                    />
                    <div className='text-on-image'>
                        <h2 className="ms-md-1">Alemania</h2>
                        <h5>20 alojamientos</h5>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}