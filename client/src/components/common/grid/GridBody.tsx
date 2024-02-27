import React from "react";
import {GridBody} from "../../../types/grid";

import style from "./Grid.module.scss";

export default function GridBody<T extends { uuid: string }>({data, fields, buttons}: GridBody<T>) {
    const rows = [];

    for (let item of data) {

        const cells = [];
        for (let field in fields) {
            cells.push(
                <td
                    className={style.cell}
                    key={item.uuid + '-' + field}
                >
                    {fields[field].value(item)}
                </td>
            );
        }

        rows.push(
            <tr key={item.uuid} className={style.row}>
                {cells}
                <td className={`${style['btn-cell']}`}>
                    {buttons.map((button) => {
                        return <button.component
                            url={button.createUrl(item.uuid)}
                            key={`${button.key}-${item.uuid}`}
                        />
                    })}
                </td>
            </tr>
        );
    }

    return (
        <tbody>
        {rows}
        </tbody>
    );
}