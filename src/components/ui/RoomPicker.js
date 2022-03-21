import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Button, ButtonGroup } from "react-bootstrap"

import { bookingAddAdults, bookingAddChildren } from "../../actions/booking";

export const RoomPicker = () => {

    const dispatch = useDispatch();

    const [adults, setAdults] = useState(2);
    const [children, setChildren] = useState(0);

    useEffect(() => {
        dispatch(bookingAddAdults(adults));
        dispatch(bookingAddChildren(children));
    }, [adults, children, dispatch]);

    const handleAddAdult = () => {
        if (adults < 4) {
            setAdults(adults + 1);
        }
    }

    const handleSubAdult = () => {
        if (adults >= 2) {
            setAdults(adults - 1);
        }
    }

    const handleAddChildren = () => {
        if (children < 5) {
            setChildren(children + 1);
        }
    }

    const handleSubChildren = () => {
        if (children >= 1) {
            setChildren(children - 1);
        }
    }

    return (
        <div className="roomPicker">
            <div style={{ "position": "relative" }}>
                <div style={{ "position": "absolute", "top": "20px" }}>
                    <strong style={{ "position": "absolute", "top": "7px", "left": "25px" }}>Adultos</strong>
                    <ButtonGroup aria-label="Basic example" style={{ "position": "absolute", "left": "105px" }}>
                        <Button className="buttonRoomPicker" variant="outline-primary rounded-0" style={{ "outline": "none", "boxShadow": "none" }} onClick={handleSubAdult}><strong>-</strong></Button>
                        <Button className="buttonRoomPicker buttonRoomPickerText border-0" variant="outline-primary rounded-0"><strong>{adults}</strong></Button>
                        <Button className="buttonRoomPicker" variant="outline-primary rounded-0" style={{ "outline": "none", "boxShadow": "none" }} onClick={handleAddAdult}><strong>+</strong></Button>
                    </ButtonGroup>
                </div>
            </div>
            <div style={{ "position": "relative" }}>
                <div style={{ "position": "absolute", "top": "85px" }}>
                    <strong style={{ "position": "absolute", "top": "7px", "left": "25px" }}>Niños</strong>
                    <ButtonGroup aria-label="Basic example" style={{ "position": "absolute", "left": "105px" }}>
                        <Button className="buttonRoomPicker" variant="outline-primary rounded-0" style={{ "outline": "none", "boxShadow": "none" }} onClick={handleSubChildren}><strong>-</strong></Button>
                        <Button className="buttonRoomPicker buttonRoomPickerText border-0" variant="outline-primary rounded-0"><strong>{children}</strong></Button>
                        <Button className="buttonRoomPicker" variant="outline-primary rounded-0" style={{ "outline": "none", "boxShadow": "none" }} onClick={handleAddChildren}><strong>+</strong></Button>
                    </ButtonGroup>
                </div>
            </div>
        </div>
    )
}