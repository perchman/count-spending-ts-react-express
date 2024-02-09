import React from "react";

import {GridHeader} from "../../../types/grid";

import style from "./Grid.module.css";

export default function GridHeader<T>({fields, sort, setSort}: GridHeader<T>) {
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
                <th className={`${style['btn-cell']}`}></th>
            </tr>
        </thead>
    );
}