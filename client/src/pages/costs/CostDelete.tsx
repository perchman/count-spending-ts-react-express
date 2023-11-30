import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

import Message from "../../components/common/message/Message";
import GoBackButton from "../../components/common/buttons/goBack/GoBackButton";

import style from "../Section.module.css";

export default function CostDelete() {
    const {uuid} = useParams();
    const [isDeleting, setIsDeleting] = useState(false);
    const [isSuccess, setIsSuccess] = useState({
        status: 'success',
        text: 'Cost removed.'
    });

    useEffect(() => {
        fetch(`http://localhost:5000/cost/uuid=${uuid}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then((res) => {
                if (res.status === 200 || res.status === 500) {
                    return res.json();
                }
            })
            .then((data) => {
                if (data) {
                    if (data.err) {
                        setIsSuccess({
                            status: 'error',
                            text: data.err
                        });
                    }
                }

                setIsDeleting(true);
            })
            .catch(err => console.log(err))
    }, []);

    if (!isDeleting) {
        return (
            <>
                <h1>Deleting...</h1>
            </>
        );
    } else {
        return (
            <div className={style.section}>
                <div className={style.inner}>
                    <h1 className={style.title}>Delete cost</h1>
                    {
                        isDeleting ?
                            <Message status={isSuccess.status} text={isSuccess.text} /> :
                            <div>Deleting...</div>
                    }
                    <GoBackButton />
                </div>
            </div>
        );
    }
}