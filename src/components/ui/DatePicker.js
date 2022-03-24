import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { DateRangePicker } from 'react-date-range';
import { es } from 'date-fns/locale'
import Swal from "sweetalert2";

import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { bookingAddDate, bookingAddDays, bookingAddRoomId, bookingAddRoomType } from '../../actions/booking';
import { uncheckRadioRoom } from '../../helpers/uncheckRadioRoom';

export const DatePicker = ({ open }) => {

    const dispatch = useDispatch();

    const [checking, setChecking] = useState(false);
    const [state, setState] = useState();

    const [isDesktop, setDesktop] = useState(window.innerWidth > 768);

    const updateMedia = () => {
        setDesktop(window.innerWidth > 768);
    };

    useEffect(() => {
        window.addEventListener("resize", updateMedia);
        return () => window.removeEventListener("resize", updateMedia);
    });

    useEffect(() => {
        setState([{
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        }]);
        setChecking(true);
    }, []);

    const handleClick = (date) => {
        const d = new Date();
        d.setDate(d.getDate() - 1);
        if (date[0].startDate.getTime() < d || date[0].endDate.getTime() < d) {
            return Swal.fire('La fecha ya ha pasado', ``, 'info');
        } else {
            setState(date);
            if (date[0].startDate.getTime() !== date[0].endDate.getTime()) {
                dispatch(bookingAddDate({
                    startDate: date[0].startDate.toISOString(),
                    endDate: date[0].endDate.toISOString()
                }));
                const oned = 24 * 60 * 60 * 1000;
                const days = Math.ceil((date[0].endDate - date[0].startDate) / oned);
                dispatch(bookingAddDays(days));
                dispatch(bookingAddRoomId(null));
                dispatch(bookingAddRoomType(null));
                uncheckRadioRoom();
                const ele1 = document.getElementById("dropDownDate");
                ele1.click('open');
            }
        }
    }

    return (
        !open && checking && <DateRangePicker
            locale={es}
            onChange={item => handleClick([item.selection])}
            showSelectionPreview={true}
            moveRangeOnFirstSelection={false}
            months={isDesktop ? 2 : 1}
            ranges={state}
            preventSnapRefocus={true}
            direction="horizontal"
            showDateDisplay={false}
        />
    )
}