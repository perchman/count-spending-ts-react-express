import React, {useEffect, useState} from "react";

import GridHeader from "./GridHeader";
import GridBody from "./GridBody";
import Pagination from "../pagination/Pagination";

import {Grid} from '../../../types/grid';

import style from "./Grid.module.css";

export default function Grid<T extends { uuid: string }>({requestEndpoint, fields, options, buttons}: Grid<T>) {
    const [sort, setSort] = useState(options.sort.default);
    const [pageNum, setPageNum] = useState(1);

    const [data, setData] = useState({
        items: [],
        totalCount: 0
    });

    useEffect(() => {
        fetch(
            requestEndpoint +
            `/page=${pageNum}` +
            `/sort=${sort.key}_${sort.direction}` +
            `/page_size=${options.pageSize}`
        )
            .then((res) => {
                if (res.status === 200) {
                    return res.json();
                }
            })
            .then((data) => {
                if (data) {
                    setData(data);
                }
            })
            .catch(err => console.log(err));
    }, [sort, pageNum]);

    return (
        <>
            <table className={style.grid}>
                <GridHeader<T> fields={fields} sort={sort} setSort={setSort} />
                <GridBody<T>
                    data={data.items}
                    fields={fields}
                    buttons={buttons}
                />
            </table>
            <Pagination<T>
                data={data}
                pageNum={pageNum}
                pageSize={options.pageSize}
                setPageNum={setPageNum}
            />
        </>
    );
}