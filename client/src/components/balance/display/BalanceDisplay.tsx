import React from "react";
import { FaCoins } from "react-icons/fa6";
import ContentLoader from 'react-content-loader';

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
                    <div className={style.value}>{10000000}</div>
                </div>
            </div>
        </div>
    );
};