import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Container } from "react-bootstrap"

import { fetch_No_Token } from "../../helpers/fetch";
import { Hotel } from "./Hotel";

export const HotelsList = () => {

    const { booking } = useSelector(state => state.booking);

    const [hotels, setHotels] = useState();
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
                const resp = await fetch_No_Token(`hotels/?country=${booking.country}&from_date=${booking.date.startDate}&to_date=${booking.date.endDate}&family=${family}`);
                const body = await resp.json();
                setHotels(body.final);
                setChecking(true);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [booking.country, booking.date.startDate, booking.date.endDate, booking.adults, booking.children]);

    return (
        checking
            ? <Container>
                <div className="animate__animated animate__fadeIn mb-5">
                    {
                        hotels.map(hotel => (
                            <Hotel
                                key={hotel._id}
                                {...hotel}
                            />
                        ))
                    }
                </div>
            </Container>
            : <div style={{ "height": "5000px" }}></div>
    )
}