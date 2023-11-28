import React from "react";
import {Category} from "../../types/entities";

import Grid from "../../components/common/grid/Grid";
import GridDeleteButton from "../../components/common/grid/buttons/delete/GridDeleteButton";
import GridUpdateButton from "../../components/common/grid/buttons/update/GridUpdateButton";
import LinkButton from "../../components/common/buttons/add/LinkButton";

import style from "../Section.module.css";

const config = {
    requestEndpoint: 'http://localhost:5000/category',
    fields: {
        name: {
            text: 'Name',
            sort: true,
            value: (category: Category) => {
                return category.name;
            }
        }
    },
    options: {
        sort: {
            default: {key: 'name', direction: 'asc'}
        },
        pageSize: 5
    },
    buttons: [
        {
            key: 'update',
            component: GridUpdateButton,
            createUrl: (uuid: string) => {
                return `/category/update/${uuid}`
            }
        },
        {
            key: 'delete',
            component: GridDeleteButton,
            createUrl: (uuid: string) => {
                return `/category/delete/${uuid}`;
            }
        }
    ]
}

export default function CategoryIndex() {
    return (
        <div className={style.section}>
            <div className={style.inner}>
                <h1 className={style.title}>Categories</h1>
                <LinkButton path="/category/create" text="Add"/>
                <Grid<Category>
                    requestEndpoint={config.requestEndpoint}
                    fields={config.fields}
                    options={config.options}
                    buttons={config.buttons}
                />
            </div>
        </div>
    );
}