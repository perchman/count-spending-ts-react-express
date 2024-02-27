import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

import Message from "../../components/common/message/Message";
import GoBackButton from "../../components/common/buttons/GoBackButton";

import style from "../Section.module.scss";

export default function CategoryDelete() {
    const {uuid} = useParams();
    const [isDeleting, setIsDeleting] = useState(false);
    const [isSuccess, setIsSuccess] = useState({
        status: 'success',
        text: 'Category removed.'
    });

    useEffect(() => {
        fetch(`http://localhost:8080/category/uuid=${uuid}`, {
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

    return (
        <div className={style.section}>
            <div className={style.inner}>
                <h1 className={style.title}>Delete category</h1>
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