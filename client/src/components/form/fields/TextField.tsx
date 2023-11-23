import React from "react";
import {Field} from "react-final-form";

import style from "./Field.module.css";

interface TextField {
    name: string;
    placeholder: string;
    value?: string;
}

export default function TextField({name, placeholder, value}: TextField) {
    return (
        <Field
            name={name}
            // defaultValue={value} ?
            render={({ input, meta }) => (
                <div>
                    <input type="text" className={style.field} {...input} placeholder={placeholder}/>
                    {meta.touched && meta.error && <span>{meta.error}</span>}
                </div>
            )}
        />
    );
}