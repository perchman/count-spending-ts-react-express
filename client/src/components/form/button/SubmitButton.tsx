import React from "react";

import style from "./SubmitButton.module.css";

export default function SubmitButton() {
    return (
        <button type="submit" className={style.btn}>
            Save
        </button>
    );
}