import React, {useEffect, useState} from "react";

import LinkButton from "../../components/common/buttons/add/LinkButton";

import style from "../Section.module.css";
import BalanceDisplay from "../../components/balance/display/BalanceDisplay";

export default function BalanceIndex() {
    const [balance, setBalance] = useState();

    useEffect(() => {
        fetch('http://localhost:5000/balance')
            .then((res) => {
                if (res.status === 200) {
                    return res.json();
                }
            })
            .then((data) => {
                if (data) {
                    setBalance(data);
                }
            })
            .catch(err => console.log(err));
    })

    return (
        <div className={style.section}>
            <div className={style.inner}>
                <h1 className={style.title}>Balance</h1>
                <BalanceDisplay balance={''}/>
                <div className={style.flex}>
                    <LinkButton path="/balance/replenish" text="Replenish"/>
                    <LinkButton path="/balance/history" text="History"/>
                </div>
            </div>
        </div>
    );
}