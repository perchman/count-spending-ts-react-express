import React, {useState} from "react";
import {Form} from 'react-final-form';
import {FormWrapper, Field} from '../../types/form';
import {Validator} from "../../types/validator";

import SubmitButton from "./button/SubmitButton";

import ValidatorFactory from "./validators/ValidatorFactory";

import style from "./Form.module.css";

export default function FormWrapper<T>({id, fields, handelSubmit}: FormWrapper) {
    const [responseError, setResponseError] = useState('');

    const onSubmit = (values: T) => {
        const errors: { [key: string]: string } = {};

        for (let field in fields) {
            if (fields.hasOwnProperty(field)) {
                const value: string = (values as { [key: string]: any })[field];
                for (let type of fields[field].params.validators) {
                    const Validator: Validator = ValidatorFactory.factory(type);
                    const error: string | null = Validator.validate(value);
                    console.log(type);
                    // if the value does not pass validation, an error string is returned
                    if (typeof error === "string") {
                        errors[field] = error;
                        break;
                    }
                }
                // fields[field].params.validators.forEach((type) => {
                //     const Validator: Validator = ValidatorFactory.factory(type);
                //     const error: string | null = Validator.validate(value);
                //     console.log(Validator, error, value);
                //     // if the value does not pass validation, an error string is returned
                //     if (typeof error === "string") {
                //         console.log("err");
                //         errors[field] = error;
                //         return;
                //     }
                // })
            }
        }

        if (Object.keys(errors).length > 0) {
            console.log('errors', errors);
            return errors;
        } else {
            onSubmit(values);
        }
    }


    return (
        <Form
            onSubmit={onSubmit}
            render={({handleSubmit}) => {
                return <form id={id} onSubmit={handleSubmit}>
                    <div className={style.error}>{"error"}</div>
                    {
                        Object.values(fields).map((item: Field, index: number) => {
                            return <div className={style.item} key={'field-' + index}>
                                <item.component {...item.params}/>
                               <div id={'error-' + item.params.name} className={style.error}></div>
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

    //
    // const handlerSubmit = (e) => {
    //     e.preventDefault();
    //
    //     const form = document.getElementById(id);
    //     const formData = new FormData(form);
    //
    //     let data = {};
    //     let fieldErrors = {};
    //     const validatorFactory = new ValidatorFactory();
    //
    //     for (let field in fields) {
    //         const value = formData.get(field);
    //         fields[field].params.validators.forEach((type) => {
    //             const validator = validatorFactory.factory(type);
    //             const fieldError = validator.validate(value);
    //
    //             if (fieldError) {
    //                 fieldErrors[field] = fieldError;
    //                 return;
    //             }
    //             data[field] = value;
    //         });
    //     }
    //
    //     if (Object.keys(fieldErrors).length > 0) {
    //         for (let fieldError in fieldErrors) {
    //             const elem = document.getElementById('error-' + fieldError);
    //             elem.textContent = fieldErrors[fieldError];
    //             elem.style.display = 'block';
    //         }
    //     } else {
    //         onSubmit(data, setResponseError);
    //     }
    // }
    //
    // return (
    //     <form id={id} className={style.form} onSubmit={handlerSubmit}>
    //         <div className={style.error}>{responseError}</div>
    //         {
    //             Object.values(fields).map((item, index) => {
    //                 return <div className={style.item} key={'field-' + index}>
    //                     <item.component {...item.params}/>
    //                     <div id={'error-' + item.params.name} className={style.error}></div>
    //                 </div>
    //             })
    //         }
    //         <div className={style.item}>
    //             <SubmitButton
    //                 className={style.button}
    //                 text='Save'
    //             />
    //         </div>
    //     </form>
    // );
}