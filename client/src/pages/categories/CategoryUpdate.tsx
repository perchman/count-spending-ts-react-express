import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";

import CategoryForm from "../../components/category/CategoryForm";

import {CategoryDataForm} from "../../types/entities";

import style from "../Section.module.scss";

export default function CategoryUpdate() {
    const {uuid} = useParams();
    const [category, setCategory] = useState<CategoryDataForm>({
        name: ''
    });
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:8080/category/uuid=${uuid}`)
            .then((res) => {
                if (res.status === 200) {
                    return res.json();
                }
            })
            .then((data) => {
                if (data) {
                    setCategory(data);
                }
            })
            .catch(err => console.log(err));
    }, []);

    const handlerSubmit = (data: CategoryDataForm) => {
        fetch(`http://localhost:8080/category/uuid=${uuid}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
            .then((res) => {
                if (res.status === 200) {
                    navigate("/category/index");
                }
            })
            .catch(err => console.log(err));
    }

    return (
        <div className={style.section}>
            <div className={style.inner}>
                <h1 className={style.title}>Update category</h1>
                <CategoryForm
                    category={category}
                    handlerSubmit={handlerSubmit}
                />
            </div>
        </div>
    );
}