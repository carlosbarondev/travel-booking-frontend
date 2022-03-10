import { useEffect, useState } from 'react';
import { DateRangePicker } from 'react-date-range';
import { es } from 'date-fns/locale'

import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

export const DatePicker = () => {

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

    return (
        checking && <DateRangePicker
            locale={es}
            onChange={item => setState([item.selection])}
            showSelectionPreview={true}
            moveRangeOnFirstSelection={false}
            months={isDesktop ? 2 : 1}
            ranges={state}
            direction="horizontal"
        />
    )
}