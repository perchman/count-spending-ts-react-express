import React from "react";
import {Field} from "react-final-form";

import style from "./Field.module.css";

interface DateField {
    name: string;
    value?: string;
}

export default function DateField({name, value}: DateField) {
    return (
        <Field
            name={name}
            // defaultValue={value} ?
            render={({ input, meta }) => (
                <div>
                    <input type="date" className={style.field} {...input}/>
                    {meta.touched && meta.error && <span>{meta.error}</span>}
                </div>
            )}
        />
    );
}