import React from "react";
import {NavigateFunction, useNavigate} from "react-router-dom";

import BalanceForm from "../../components/balance/form/BalanceForm";

import style from "../Section.module.css";

interface FormData {
    date: string;
    replenish: string;
}

export default function BalanceReplenish() {
    const navigate: NavigateFunction = useNavigate();

    const handelSubmit =  async (data: FormData): Promise<void> => {
        console.log(data);
        fetch('http://localhost:5000/balance', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then((res) => {
                if (res.status === 200) {
                    navigate("/balance/index");
                }
            })
            .catch(err => console.log(err))
    }

    return (
        <div className={style.section}>
            <div className={style.inner}>
                <h1 className={style.title}>Replenishment of balance</h1>
                <BalanceForm handlerSubmit={handelSubmit}/>
            </div>
        </div>
    );
}