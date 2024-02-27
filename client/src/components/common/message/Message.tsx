import React from "react";
import {IoIosCheckmarkCircle} from "react-icons/io";
import {MdError} from "react-icons/md";

import style from "./Message.module.scss";

interface Message {
    status: string;
    text: string;
}

export default function Message({status = 'success', text}: Message) {
    return (
        <div className={`${style.message} ${style[status]}`}>
            <div className={style.inner}>
                <div className={style.icon}>
                    {
                        status === "success" ?
                            <IoIosCheckmarkCircle/> :
                            <MdError/>
                    }
                </div>
                <div className={style.text}>
                    <strong>{ status === "success" ? "Success" : "Error" }! </strong>
                    {text}
                </div>
            </div>
        </div>
    );
}