import React, {useEffect, useState} from "react";

import style from "./Field.module.css";

//@todo переписать getData: any, переписать item(возвожно функцию на джинерик)
interface DropdownField {
    name: string;
    selected: string;
    disabledOption: string;
    getData: () => any;
}

export default function DropdownField({name, selected, disabledOption, getData}: DropdownField) {
    const [data, setData] = useState([]);
    const [selectedOption, setSelectedOption] = useState(selected);

    // useEffect(() => {
    //     getData().then((data: any) => {
    //         setData(data);
    //         setSelectedOption(selected);
    //     });
    // }, []);

    return (
        <select
            className={style.select}
            name={name}
            defaultValue={selectedOption}
        >
            <option disabled hidden value='selected'>{disabledOption}</option>
            <option>gg</option>
            <option>hh</option>
        </select>
    );
}

// data.map((item) => (
//     <option
//         key={item.uuid}
//         value={item.uuid}
//     >
//         {item.name}
//     </option>
// ))