import React from "react";
import {NavigateFunction, useNavigate} from "react-router-dom";

import CategoryForm from "../../components/category/CategoryForm";

import style from "../Section.module.css";

interface FormData {
    name: string;
}

export default function CategoryCreate() {
    const navigate: NavigateFunction = useNavigate();

    const handlerSubmit = async (data: FormData) => {
        fetch('http://localhost:5000/category', {
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