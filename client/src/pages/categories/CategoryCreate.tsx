import React from "react";
import {NavigateFunction, useNavigate} from "react-router-dom";
import {CategoryDataForm} from "../../types/entities";

import CategoryForm from "../../components/category/CategoryForm";

import style from "../Section.module.scss";

export default function CategoryCreate() {
    const navigate: NavigateFunction = useNavigate();

    const handlerSubmit = async (data: CategoryDataForm): Promise<void> => {
        fetch('http://localhost:8080/category', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then((res) => {
                if (res.status === 200) {
                    navigate("/category/index");
                }
            })
            .catch(err => console.log(err))
    }

    return (
        <div className={style.section}>
            <div className={style.inner}>
                <h1 className={style.title}>Create category</h1>
                <CategoryForm
                    category={{name: ''}}
                    handlerSubmit={handlerSubmit}
                />
            </div>
        </div>
    );
}