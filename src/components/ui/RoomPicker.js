import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, ButtonGroup } from "react-bootstrap"

import { bookingAddAdults, bookingAddChildren, bookingAddRoomId, bookingAddRoomType } from "../../actions/booking";
import { uncheckRadioRoom } from "../../helpers/uncheckRadioRoom";

export const RoomPicker = ({ open }) => {

    const dispatch = useDispatch();

    const { booking } = useSelector(state => state.booking);

    useEffect(() => {
        dispatch(bookingAddRoomId(null));
        dispatch(bookingAddRoomType(null));
        uncheckRadioRoom();
    }, [booking.adults, booking.children, dispatch]);

    const handleAddAdult = () => {
        if (booking.adults < 4) {
            dispatch(bookingAddAdults(booking.adults + 1));
        }
    }

    const handleSubAdult = () => {
        if (booking.adults >= 2) {
            dispatch(bookingAddAdults(booking.adults - 1));
        }
    }

    const handleAddChildren = () => {
        if (booking.children < 5) {
            dispatch(bookingAddChildren(booking.children + 1));
        }
    }

    const handleSubChildren = () => {
        if (booking.children >= 1) {
            dispatch(bookingAddChildren(booking.children - 1));
        }
    }

    return (
        !open && <div className="roomPicker">
            <div style={{ "position": "relative" }}>
                <div style={{ "position": "absolute", "top": "20px" }}>
                    <strong style={{ "position": "absolute", "top": "7px", "left": "25px" }}>Adultos</strong>
                    <ButtonGroup aria-label="Basic example" style={{ "position": "absolute", "left": "105px" }}>
                        <Button className="buttonRoomPicker" variant="outline-primary rounded-0" style={{ "outline": "none", "boxShadow": "none" }} onClick={handleSubAdult}><strong>-</strong></Button>
                        <Button className="buttonRoomPicker buttonRoomPickerText border-0" variant="outline-primary rounded-0"><strong>{booking.adults}</strong></Button>
                        <Button className="buttonRoomPicker" variant="outline-primary rounded-0" style={{ "outline": "none", "boxShadow": "none" }} onClick={handleAddAdult}><strong>+</strong></Button>
                    </ButtonGroup>
                </div>
            </div>
            <div style={{ "position": "relative" }}>
                <div style={{ "position": "absolute", "top": "85px" }}>
                    <strong style={{ "position": "absolute", "top": "7px", "left": "25px" }}>Niños</strong>
                    <ButtonGroup aria-label="Basic example" style={{ "position": "absolute", "left": "105px" }}>
                        <Button className="buttonRoomPicker" variant="outline-primary rounded-0" style={{ "outline": "none", "boxShadow": "none" }} onClick={handleSubChildren}><strong>-</strong></Button>
                        <Button className="buttonRoomPicker buttonRoomPickerText border-0" variant="outline-primary rounded-0"><strong>{booking.children}</strong></Button>
                        <Button className="buttonRoomPicker" variant="outline-primary rounded-0" style={{ "outline": "none", "boxShadow": "none" }} onClick={handleAddChildren}><strong>+</strong></Button>
                    </ButtonGroup>
                </div>
            </div>
        </div>
    )
}