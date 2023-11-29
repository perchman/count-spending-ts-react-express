import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";

import CostForm from "../../components/cost/CostForm";

import {CostDataForm} from "../../types/entities";

import style from "../Section.module.css";

export default function CostUpdate() {
    const {uuid} = useParams();
    const [cost, setCost] = useState({
        date: '',
        category: '',
        price: '',
        description: ''
    });
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:5000/cost/uuid=${uuid}`)
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
            })
            .then((data) => {
                if (data) {
                    setCost(data);
                }
            })
            .catch(err => console.log(err));
    }, []);

    const handlerSubmit = async (data: CostDataForm, setResponseError: (err: string) => void) => {
        fetch(`http://localhost:5000/cost/uuid=${uuid}`, {
            method: 'PUT',
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
                        setResponseError(data.err);
                    }
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }

    return (
        <div className={style.section}>
            <div className={style.inner}>
                <h1 className={style.title}>Update cost</h1>
                <CostForm cost={cost} handlerSubmit={handlerSubmit}/>
            </div>
        </div>
    );
}