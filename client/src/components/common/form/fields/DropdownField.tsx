import React, {useEffect, useState} from "react";
import {Field} from "react-final-form";

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
        <Field
            name={name}
            render={({ input, meta }) => (
                <div>
                    <select {...input} className={style.field}>
                        <option disabled hidden value='selected'>{disabledOption}</option>
                        <option value="gg">gg</option>
                        <option value="hh">hh</option>
                    </select>
                    {meta.touched && meta.submitError && <span className={style.error}>{meta.submitError}</span>}
                </div>
            )}
        />
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