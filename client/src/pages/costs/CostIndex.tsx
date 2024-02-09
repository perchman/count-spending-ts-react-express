import React from "react";

import LinkButton from "../../components/common/buttons/add/LinkButton";
import GridUpdateButton from "../../components/common/grid/buttons/update/GridUpdateButton";
import GridDeleteButton from "../../components/common/grid/buttons/delete/GridDeleteButton";
import Grid from "../../components/common/grid/Grid";

import {Cost} from "../../types/entities";

import style from "../Section.module.css";

const config = {
    requestEndpoint: 'http://localhost:5000/cost',
    fields: {
        date: {
            text: 'Date',
            sort: true,
            value: (cost: Cost) => {
                return new Date(cost.date).toLocaleDateString();
            }
        },
        category: {
            text: 'Category',
            sort: false,
            value: (cost: Cost) => {
                return cost.category.name;
            }
        },
        price: {
            text: 'Price',
            sort: true,
            value: (cost: Cost) => {
                return cost.price;
            }
        },
        description: {
            text: 'Description',
            sort: false,
            value: (cost: Cost) => {
                return cost.description;
            }
        }
    },
    options: {
        sort: {
            default: {key: 'date', direction: 'desc'}
        },
        pageSize: 5
    },
    buttons: [
        {
            key: 'update',
            component: GridUpdateButton,
            createUrl: (uuid: string) => {
                return `/cost/update/${uuid}`
            }
        },
        {
            key: 'delete',
            component: GridDeleteButton,
            createUrl: (uuid: string) => {
                return `/cost/delete/${uuid}`
            }
        }
    ]
}

export default function CostIndex() {
    return (
        <div className={style.section}>
            <div className={style.inner}>
                <h1 className={style.title}>Costs</h1>
                <LinkButton path="/cost/create" text="Add"/>
                <Grid<Cost>
                    requestEndpoint={config.requestEndpoint}
                    fields={config.fields}
                    options={config.options}
                    buttons={config.buttons}
                />
            </div>
        </div>
    );
}