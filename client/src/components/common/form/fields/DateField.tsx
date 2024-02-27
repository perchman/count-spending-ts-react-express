import React from "react";
import {Field} from "react-final-form";

import style from "./Field.module.scss";

interface DateField {
    name: string;
    value?: string;
}

export default function DateField({name, value}: DateField) {
    return (
        <Field
            name={name}
            initialValue={value}
            render={({ input, meta }) => (
                <div>
                    <input type="date" className={style.field} {...input}/>
                    {meta.touched && meta.submitError && <span className={style.error}>{meta.submitError}</span>}
                </div>
            )}
        />
    );
}