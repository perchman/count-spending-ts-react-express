import React, {useEffect, useState} from "react";
import {CostDataForm} from "../../types/entities";

import Form from "../common/form/Form";
import DateField from "../common/form/fields/DateField";
import DropdownField from "../common/form/fields/DropdownField";
import NumberField from "../common/form/fields/NumberField";
import TextField from "../common/form/fields/TextField";
import FormWrapper from "../common/form/Form";

interface CostForm {
    cost: CostDataForm;
    handlerSubmit: (data: CostDataForm, setResponseErr: (err: string) => void) => void;
}

export default function CostForm({cost, handlerSubmit}: CostForm) {
    const [formData, setFormData] = useState<CostDataForm>(cost);

    useEffect(() => {
            setFormData({
                date: cost.date ? new Date(cost.date).toISOString().split('T')[0] : cost.date,
                category: cost.category,
                price: cost.price,
                description: cost.description
            });
    }, [cost]);

    const getDataForDropdown = async () => {
        return fetch('http://localhost:5000/category/sort=name_asc')
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
            })
            .then((data) => {
                if (data) {
                    return data;
                }
            })
            .catch(err => console.log(err));
    }

    const fields = {
        date: {
            component: DateField,
            params: {
                name: 'date',
                value: formData.date,
                validators: ['required']
            }
        },
        category: {
            component: DropdownField,
            params: {
                name: 'category',
                disabledOption: 'Select a category',
                selected: formData.category || 'selected',
                getData: getDataForDropdown,
                validators: ['required']
            }
        },
        price: {
            component: NumberField,
            params: {
                name: 'price',
                placeholder: 'Price',
                value: formData.price,
                validators: ['required', 'positiveNumber']
            }
        },
        description: {
            component: TextField,
            params: {
                name: 'description',
                placeholder: 'Description',
                value: formData.description,
                validators: ['required', 'maxLength']
            }
        }
    };

    return (
        <FormWrapper<CostDataForm> id="cost-form" fields={fields} handlerSubmit={handlerSubmit}/>
    );
}