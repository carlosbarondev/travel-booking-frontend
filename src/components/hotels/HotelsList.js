import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Col, Container, Row } from "react-bootstrap"

import { fetch_No_Token } from "../../helpers/fetch";
import { Hotel } from "./Hotel";
import { FilterHotel } from "./FilterHotel";
import { DateBarHotel } from "./DateBarHotel";

export const HotelsList = () => {

    const { booking } = useSelector(state => state.booking);

    const [hotels, setHotels] = useState();
    const [filtered, setFiltered] = useState();
    const [checking, setChecking] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try {
                let family;
                if ((booking.adults > 2) || (booking.children > 1) || (booking.adults === 2 && booking.children > 0)) {
                    family = true;
                } else {
                    family = false;
                }
                if (booking?.date) {
                    const resp = await fetch_No_Token(`hotels/?country=${booking.country}&from_date=${booking.date.startDate}&to_date=${booking.date.endDate}&family=${family}`);
                    const body = await resp.json();
                    setHotels(body.final);
                    setFiltered(body.final.sort((a, b) => a.doubleRoom.price - b.doubleRoom.price));
                    setChecking(true);
                } else {
                    const resp = await fetch_No_Token(`hotels`);
                    const body = await resp.json();
                    setHotels(body.hotels.filter(hotel => hotel.country === booking.country));
                    setFiltered(body.hotels.filter(hotel => hotel.country === booking.country).sort((a, b) => a.doubleRoom.price - b.doubleRoom.price));
                    setChecking(true);
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [booking?.date, booking?.country, booking?.adults, booking?.children]);

    return (
        checking &&
        <Container>
            <div className="mt-4">TUS RESULTADOS DE BÚSQUEDA</div>
            <h3 className="mt-1 mb-4">{`Nuestros ${hotels.length} Hoteles en "${booking.country}"`}</h3>
            <DateBarHotel />
            <Row className="mt-2">
                <Col xs={12} lg={3} className="mt-4 mb-4">
                    <FilterHotel hotels={hotels} setFiltered={setFiltered} />
                </Col>
                <Col xs={12} lg={9} className="px-4">
                    <div className="animate__animated animate__fadeIn mt-4 mb-5">
                        {
                            filtered.length !== 0
                                ? filtered.map(hotel => (
                                    <Hotel
                                        key={hotel._id}
                                        {...hotel}
                                    />
                                ))
                                : <h5>No hay resultados con las opciones de búsqueda seleccionadas</h5>
                        }
                    </div>
                </Col>
            </Row>
        </Container>
    )
}