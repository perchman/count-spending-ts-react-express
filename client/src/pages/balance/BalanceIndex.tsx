import React, {useEffect, useState} from "react";

import LinkButton from "../../components/common/buttons/LinkButton";
import BalanceDisplay from "../../components/balance/display/BalanceDisplay";

import style from "../Section.module.scss";

export default function BalanceIndex() {
    const [balance, setBalance] = useState<string | null>(null);

    useEffect(() => {
        fetch('http://localhost:8080/balance')
            .then((res) => {
                if (res.status === 200) {
                    return res.json();
                }
            })
            .then((data) => {
                if (data) {
                    setBalance(data.balance);
                }
            })
            .catch(err => console.log(err));
    })

    return (
        <div className={style.section}>
            <div className={style.inner}>
                <h1 className={style.title}>Balance</h1>
                <BalanceDisplay balance={balance}/>
                <div className={style.flex}>
                    <LinkButton path="/balance/replenish" text="Replenish"/>
                    <LinkButton path="/balance/history" text="History"/>
                </div>
            </div>
        </div>
    );
}