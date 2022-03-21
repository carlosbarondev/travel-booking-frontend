import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ListGroup } from "react-bootstrap";

import { fetch_No_Token } from "../../helpers/fetch";
import { bookingAddCountry } from "../../actions/booking";

export const CountryPicker = () => {

    const dispatch = useDispatch();

    const [countries, setCountries] = useState();
    const [checking, setChecking] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try {
                const resp = await fetch_No_Token(`hotels`);
                const body = await resp.json();
                setCountries(body.availableCountries);
                setChecking(true);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, []);

    const handleClick = (country) => {
        dispatch(bookingAddCountry(country));
        const ele1 = document.getElementById("dropDownCountry");
        ele1.click('open');
    }

    return (
        checking && <ListGroup>
            {
                countries.map(country =>
                    <ListGroup.Item key={country} action onClick={() => handleClick(country)}>
                        {country}
                    </ListGroup.Item>
                )
            }
        </ListGroup>
    )
}