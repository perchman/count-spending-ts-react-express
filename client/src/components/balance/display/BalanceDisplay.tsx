import React from "react";
import { FaCoins } from "react-icons/fa6";

import style from "./BalanceDisplay.module.css";

interface BalanceDisplay {
    balance: string | null;
}

export default function BalanceDisplay({balance}: BalanceDisplay) {
    return (
        <div className={style.display}>
            <div className={style.inner}>
                <div className={style.icon}>
                    <FaCoins/>
                </div>
                <div className={style.content}>
                    <div className={style.name}>Balance</div>
                    <div className={style.value}>{balance}</div>
                </div>
            </div>
        </div>
    );
};