import { useEffect, useState } from "react";
import { Container } from "react-bootstrap"

import { fetch_No_Token } from "../../helpers/fetch";
import { Hotel } from "./Hotel";

export const HotelsList = () => {

    const [hotels, setHotels] = useState();
    const [checking, setChecking] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try {
                const resp = await fetch_No_Token(`hotels`);
                const body = await resp.json();
                setHotels(body.hotels);
                setChecking(true);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, []);

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