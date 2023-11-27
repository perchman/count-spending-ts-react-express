import React from "react";
import {Link} from "react-router-dom";
import {AiFillDelete} from "react-icons/ai";

import style from "./GridDeleteButton.module.css";

export default function GridDeleteButton(url: string) {
    return (
        <Link
            to={url}
            className={style.btn}
        >
            <AiFillDelete className={style.icon}/>
        </Link>
    );
}