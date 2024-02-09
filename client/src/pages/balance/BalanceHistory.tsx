import React from "react";

import Grid from "../../components/common/grid/Grid";

import {HistoryBalanceChange} from "../../types/entities";

import style from "../Section.module.css";
import GoBackButton from "../../components/common/buttons/goBack/GoBackButton";

const config = {
    requestEndpoint: 'http://localhost:5000/balance/history',
    fields: {
        date: {
            text: 'Date',
            sort: true,
            value: (historyBalanceChange: HistoryBalanceChange) => {
                return new Date(historyBalanceChange.date).toLocaleDateString();
            }
        },
        type: {
            text: 'Type',
            sort: true,
            value: (historyBalanceChange: HistoryBalanceChange) => {
                return historyBalanceChange.type;
            }
        },
        amount: {
            text: 'Amount',
            sort: true,
            value: (historyBalanceChange: HistoryBalanceChange) => {
                return historyBalanceChange.amount;
            }
        }
    },
    options: {
        sort: {
            default: {key: 'date', direction: 'desc'}
        },
        pageSize: 5
    },
    buttons: []
}

export default function BalanceHistory() {
    return (
        <div className={style.section}>
            <div className={style.inner}>
                <h1 className={style.title}>History</h1>
                <GoBackButton />
                <Grid
                    requestEndpoint={config.requestEndpoint}
                    fields={config.fields}
                    options={config.options}
                    buttons={config.buttons}
                />
            </div>
        </div>
    );
}