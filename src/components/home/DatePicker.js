import { useEffect, useState } from 'react';
import { DateRangePicker } from 'react-date-range';
import { es } from 'date-fns/locale'

import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

export const DatePicker = () => {

    const [checking, setChecking] = useState(false);
    const [state, setState] = useState();

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
            months={2}
            ranges={state}
            direction="horizontal"
        />
    )
}