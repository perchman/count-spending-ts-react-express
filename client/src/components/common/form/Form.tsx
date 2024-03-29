import React, {useState} from "react";
import {Form} from 'react-final-form';
import {FormWrapper, Field} from '../../../types/form';
import {Validator} from "../../../types/validator";

import Message from "../message/Message";
import SubmitButton from "./button/SubmitButton";

import ValidatorFactory from "./validators/ValidatorFactory";

import style from "./Form.module.scss";

export default function FormWrapper<T>({id, fields, handlerSubmit}: FormWrapper<T>) {
    const [responseError, setResponseError] = useState<string | null>(null);

    const onSubmit = (values: T) => {
        const errors: { [key: string]: string } = {};

        for (let field in fields) {
                const value: string = (values as { [key: string]: any })[field];

            for (let type of fields[field].params.validators) {
                const Validator: Validator = ValidatorFactory.factory(type);
                const error: string | null = Validator.validate(value);

                // if the value does not pass validation, an error string is returned
                if (typeof error === "string") {
                    errors[field] = error;
                    break;
                }
            }
        }

        if (Object.keys(errors).length > 0) {
            return errors;
        } else {
            handlerSubmit(values, setResponseError);
        }
    }


    return (
        <Form
            onSubmit={onSubmit}
            render={({handleSubmit}) => {
                return <form id={id} onSubmit={handleSubmit}>
                    { responseError === null ? null : <Message status="error" text={responseError}/> }
                    {
                        Object.values(fields).map((item: Field, index: number) => {
                            return <div className={style.item} key={'field-' + index}>
                                <item.component {...item.params}/>
                            </div>
                        })
                    }
                    <div className={style.item}>
                        <SubmitButton/>
                    </div>
                </form>
            }}
        />
    );
}