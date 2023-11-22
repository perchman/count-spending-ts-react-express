import React from "react";

import style from "./Field.module.css";

interface DateField {
    name: string;
    value?: string;
}

export default function DateField({name, value}: DateField) {
    return (
        <input
            type="date"
            className={style.input}
            name={name}
            defaultValue={value}
        />
    );
}