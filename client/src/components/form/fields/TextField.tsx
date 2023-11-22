import React from "react";

import style from "./Field.module.css";

interface TextField {
    name: string;
    placeholder: string;
    value?: string;
}

export default function TextField({name, placeholder, value}: TextField) {
    return (
        <input
            type="text"
            className={style.input}
            name={name}
            placeholder={placeholder}
            defaultValue={value}
        />
    );
}