import React from "react";
import {Link} from "react-router-dom";

import style from "./Button.module.scss";

interface LinkButton {
    path: string;
    text: string;
}

export default function LinkButton({path, text}: LinkButton) {
    return (
        <div className={style.wrapper}>
            <Link to={path} className={style.btn}>{text}</Link>
        </div>
    );
}