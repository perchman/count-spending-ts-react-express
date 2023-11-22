import style from "./Field.module.css";
import React from "react";

interface NumberField {
    name: string;
    placeholder: string;
    value?: string;
}

export default function NumberField({name, placeholder, value}: NumberField) {
    return (
        <input
            type="number"
            className={style.input}
            name={name}
            placeholder={placeholder}
            defaultValue={value}
        />
    );
}