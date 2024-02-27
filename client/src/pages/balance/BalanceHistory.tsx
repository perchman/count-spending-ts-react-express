import React from "react";
import {HistoryBalanceChange} from "../../types/entities";

import Grid from "../../components/common/grid/Grid";
import GoBackButton from "../../components/common/buttons/GoBackButton";

import style from "../Section.module.scss";

const config = {
    requestEndpoint: 'http://localhost:8080/balance/history',
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