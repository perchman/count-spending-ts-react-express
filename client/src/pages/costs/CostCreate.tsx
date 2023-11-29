import React, {useState} from "react";
import {NavigateFunction, useNavigate} from "react-router-dom";
import {CostDataForm} from "../../types/entities";

import CostForm from "../../components/cost/CostForm";

import style from "../Section.module.css";

export default function CostCreate() {
    const navigate: NavigateFunction = useNavigate();

    const handlerSubmit = (data: CostDataForm, setResponseErr: (err: string) => void): void => {
        fetch('http://localhost:5000/cost', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then((res) => {
                if (res.status === 200) {
                    navigate("/");
                }
                if (res.status === 500) {
                    return res.json();
                }
            })
            .then((data) => {
                if (data) {
                    if (data.err) {
                        // setResponseError(data.err);
                    }
                }
            })
            .catch(err => console.log(err))
    }

    return (
        <div className={style.section}>
            <div className={style.inner}>
                <h1 className={style.title}>Create cost</h1>
                <CostForm
                    cost={{
                        date: '',
                        category: '',
                        price: '',
                        description: ''
                    }}
                    handlerSubmit={handlerSubmit}
                />
            </div>
        </div>
    );
}