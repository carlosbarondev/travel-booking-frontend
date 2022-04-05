import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Col, Container, Image, Row } from "react-bootstrap"

import { bookingAddCountry } from "../../actions/booking";
import { fetch_No_Token } from "../../helpers/fetch";

export const CountriesList = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [countries, setCountries] = useState();
    const [checking, setChecking] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try {
                const resp = await fetch_No_Token(`hotels/countries`);
                const body = await resp.json();
                setCountries(body);
                setChecking(true);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, []);

    const handleCountry = (country) => {
        dispatch(bookingAddCountry(country));
        navigate("/hoteles");
    }

    return (
        checking && <Container className="mt-4">
            <Row>
                <Col xs={12} md={6} className="p-md-0 pe-md-2 head-text" onClick={() => handleCountry("España")}>
                    <Image
                        src="/assets/spain.png"
                        fluid
                    />
                    <div className='text-on-image'>
                        <h3>España</h3>
                        <h5>{countries.esp} alojamientos</h5>
                    </div>
                </Col>
                <Col xs={12} md={6} className="mt-3 mt-md-0 p-md-0 ps-md-2 head-text" onClick={() => handleCountry("Francia")}>
                    <Image
                        src="/assets/france.jpg"
                        fluid
                    />
                    <div className='text-on-image'>
                        <h3>Francia</h3>
                        <h5>{countries.fr} alojamientos</h5>
                    </div>
                </Col>
            </Row>
            <Row className="mt-0 mt-md-3">
                <Col xs={12} md={4} className="mt-3 mt-md-0 p-md-0 pe-md-2 head-text" onClick={() => handleCountry("Italia")}>
                    <Image
                        src="/assets/italy.jpg"
                        fluid
                    />
                    <div className='text-on-image'>
                        <h4>Italia</h4>
                        <h5>{countries.it} alojamientos</h5>
                    </div>
                </Col>
                <Col xs={12} md={4} className="mt-3 mt-md-0 px-md-1 head-text" onClick={() => handleCountry("Inglaterra")}>
                    <Image

                        src="/assets/england.jpg"
                        fluid
                    />
                    <div className='text-on-image'>
                        <h4>Inglaterra</h4>
                        <h5>{countries.en} alojamientos</h5>
                    </div>
                </Col>
                <Col xs={12} md={4} className="mt-3 mt-md-0 p-md-0 ps-md-2 head-text" onClick={() => handleCountry("Alemania")}>
                    <Image
                        src="/assets/germany.jpg"
                        fluid
                    />
                    <div className='text-on-image'>
                        <h4 className="ms-md-1">Alemania</h4>
                        <h5>{countries.al} alojamientos</h5>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}