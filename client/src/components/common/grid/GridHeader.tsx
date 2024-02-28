import React from "react";

import {GridHeader} from "../../../types/grid";

import style from "./Grid.module.scss";

export default function GridHeader<T>({fields, sort, setSort, isButtons}: GridHeader<T>) {
    const elems = [];

    const requestSort = (key: string): void => {
        const direction = sort.direction === 'asc' ? 'desc' : 'asc';

        setSort({ key, direction });
    };

    for (let header in fields) {
        let content;

        if (fields[header].sort) {
            content =
                <button
                    type="button"
                    className={style.sort}
                    onClick={() => requestSort(header)}
                >
                    {fields[header].text}
                </button>
        } else {
            content = fields[header].text;
        }

        elems.push(<th className={style.cell} key={header}>{content}</th>);
    }

    return (
        <thead className={style.header}>
            <tr className={style.row}>
                {elems}
                {
                    isButtons ?
                        <th className={`${style['btn-cell']}`}></th> :
                        null
                }
            </tr>
        </thead>
    );
}