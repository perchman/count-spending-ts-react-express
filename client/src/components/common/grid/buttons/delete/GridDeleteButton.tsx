import React from "react";
import {Link} from "react-router-dom";
import {AiFillDelete} from "react-icons/ai";

import style from "./GridDeleteButton.module.scss";

export default function GridDeleteButton({ url }: { url:string }) {
    return (
        <Link
            to={url}
            className={style.btn}
        >
            <AiFillDelete className={style.icon}/>
        </Link>
    );
}