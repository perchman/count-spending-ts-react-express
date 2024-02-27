import React, {useEffect, useState} from "react";
import {Field} from "react-final-form";

import style from "./Field.module.scss";

//@todo переписать getData: any, переписать item(возвожно функцию на джинерик)
interface DropdownField {
    name: string;
    selected: string;
    disabledOption: string;
    getData: () => any;
}

type Data = Array<{ uuid: string; [key: string]: any }>;

export default function DropdownField({name, selected, disabledOption, getData}: DropdownField) {
    const [data, setData] = useState<Data>([]);
    const [selectedOption, setSelectedOption] = useState(selected);

    useEffect(() => {
        getData().then((data: Data) => {
            setData(data);
            setSelectedOption(selected);
        });
    }, []);

    return (
        <Field
            name={name}
            initialValue={selected}
            render={({ input, meta }) => (
                <div>
                    <select {...input} className={style.field}>
                        <option disabled hidden value='selected'>{disabledOption}</option>
                        {
                            data.map((item) => (
                                <option
                                    key={item.uuid}
                                    value={item.uuid}
                                >
                                    {item.name}
                                </option>
                            ))
                        }
                    </select>
                    {meta.touched && meta.submitError && <span className={style.error}>{meta.submitError}</span>}
                </div>
            )}
        />
    );
}

