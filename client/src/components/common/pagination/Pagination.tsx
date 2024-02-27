import React, {useEffect, useState} from "react";

import style from "./Pagination.module.scss";

interface Pagination<T> {
    data: {
        items: T[];
        totalCount: number;
    };
    pageNum: number;
    pageSize: number;
    setPageNum: (pageNum: number) => void;
}

const computeParams = (pageNum: number, pageSize: number, totalCount: number) => {
    const start = (pageNum - 1) * pageSize,
        end = Math.min(start + pageSize, totalCount),
        totalPages = Math.ceil(totalCount / pageSize);

    return {
        start: start,
        end: end,
        totalCount: totalCount,
        totalPages: totalPages
    }
}

export default function Pagination<T>({data, pageNum, pageSize, setPageNum}: Pagination<T>) {
    const [params, setParams] = useState({
        start: 0,
        end: 0,
        totalCount: 0,
        totalPages: 0
    });

    useEffect(() => {
        setParams(computeParams(pageNum, pageSize, data.totalCount));
    }, [data, pageNum]);

    const handelPrevClick = () => {
        if (pageNum > 1) {
            setPageNum(pageNum - 1);
        }
    }

    const handelNextClick = () => {
        if (pageNum < params.totalPages ) {
            setPageNum(pageNum + 1);
        }
    }

    const handelClick = (e: React.MouseEvent<HTMLButtonElement>) => {
            setPageNum(
                parseInt(
                    e.currentTarget.getAttribute('data-page') || '0'
                )
            );
    }

    const buttons = [];
    for (let i = 0; i < params.totalPages; i++) {
        const isActive = pageNum === i + 1;

        buttons.push(
            <button
                key={'btn-pagination-' + i}
                className={isActive ? `${style.btn} ${style.active}` : style.btn}
                onClick={handelClick}
                data-page={i + 1}
            >
                {i + 1}
            </button>
        )
    }

    return (
        <div className={style.pagination}>
            <div className={style.info}>
                Showing <b>{params.start + 1}</b> to <b>{params.end}</b> of <b>{params.totalCount}</b> results
            </div>
            <div>
                <button className={`${style.btn} ${style['btn-prev']}`} onClick={handelPrevClick}>Prev</button>
                {buttons}
                <button className={`${style.btn} ${style['btn-next']}`} onClick={handelNextClick}>Next</button>
            </div>
        </div>
    );
}