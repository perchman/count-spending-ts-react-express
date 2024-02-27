import React from "react";
import {useNavigate} from "react-router-dom";

import style from "./Button.module.scss"

export default function GoBackButton() {
    const navigate = useNavigate();

    const handlerClick = () => navigate(-1);

    return (
        <div className={style.wrapper}>
            <button
                className={style.btn}
                onClick={handlerClick}
            >
                Back
            </button>
        </div>
    );
}