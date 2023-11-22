import React from "react";
import {Link} from "react-router-dom";

import style from "./LinkButton.module.css";

interface LinkButton {
    path: string;
    text: string;
}

export default function AddButton({path, text}: LinkButton) {
    return (
        <div>
            <Link to={path} className={style.btn}>{text}</Link>
        </div>
    );
}