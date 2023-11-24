import React, {useEffect, useState} from "react";

// @todo ИСПРАВИТЬ BUTTONS type и FIELDS value any, исправить sort/direction: string на asc|desc
interface Grid {
    requestEndpoint: string;
    fields: Record<string, {
        text: string;
        sort: boolean;
        value: (item: any) => string | number;
    }>;
    options: {
        sort: {
            default: { key: string; direction: string };
        };
        pageSize: number;
    };
    buttons: {
        key: string;
        component: React.ComponentType<any>;
        createUrl: (uuid: string) => string;
    }[];
}

export default function Grid<T>({requestEndpoint, fields, options, buttons}: Grid) {
    const [sort, setSort] = useState(options.sort.default);
    const [pageNum, setPageNum] = useState(1);

    const [data, setData] = useState({
        items: [],
        totalCount: 0
    });

    useEffect(() => {
        fetch(
            requestEndpoint +
            `?sort=${sort.key}_${sort.direction}` +
            `&page=${pageNum}` +
            `&size=${options.pageSize}`
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
            {/*<table className={style.table}>*/}
            {/*    <GridHeader fields={fields} sort={sort} setSort={setSort} />*/}
            {/*    <GridBody*/}
            {/*        data={data.items}*/}
            {/*        fields={fields}*/}
            {/*        buttons={buttons}*/}
            {/*    />*/}
            {/*</table>*/}
            {/*<Pagination*/}
            {/*    data={data}*/}
            {/*    pageNum={pageNum}*/}
            {/*    pageSize={options.pageSize}*/}
            {/*    totalCount={data.totalCount}*/}
            {/*    setPageNum={setPageNum}*/}
            {/*/>*/}
        </>
    );
}