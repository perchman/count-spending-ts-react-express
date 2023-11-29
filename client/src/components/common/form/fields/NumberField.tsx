import React from "react";
import {Field} from "react-final-form";

import style from "./Field.module.css";

interface NumberField {
    name: string;
    placeholder: string;
    value?: string;
}

export default function NumberField({name, placeholder, value}: NumberField) {
    return (
        <Field
            name={name}
            initialValue={value}
            render={({ input, meta }) => (
                <div>
                    <input type="number" className={style.field} {...input} placeholder={placeholder}/>
                    {meta.touched && meta.submitError && <span className={style.error}>{meta.submitError}</span>}
                </div>
            )}
        />
    );
}