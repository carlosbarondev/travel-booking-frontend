import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { DateRangePicker } from 'react-date-range';
import { es } from 'date-fns/locale'

import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { bookingAddDate } from '../../actions/booking';

export const DatePicker = () => {

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
        setState(date);
        if (date[0].endDate !== date[0].startDate) {
            dispatch(bookingAddDate({
                startDate: date[0].startDate.toISOString(),
                endDate: date[0].endDate.toISOString()
            }));
            const ele1 = document.getElementById("dropDownDate");
            ele1.click('open');
        }
    }

    return (
        checking && <DateRangePicker
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