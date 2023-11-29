import React from "react";
import {Link} from "react-router-dom";
import {FaPen} from "react-icons/fa";

import style from "./GridUpdateButton.module.css";

export default function GridUpdateButton({ url }: { url:string }) {
    return (
        <Link
            to={url}
            className={style.btn}
        >
            <FaPen className={style.icon}/>
        </Link>
    );
}

