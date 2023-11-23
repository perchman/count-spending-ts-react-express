import React, {useEffect, useState} from "react";
import {Cost} from "../../types/entities";

import Form from "./Form";
import DateField from "./fields/DateField";
import DropdownField from "./fields/DropdownField";
import NumberField from "./fields/NumberField";
import TextField from "./fields/TextField";

interface CostForm {
    cost: Cost;
    onSubmit: (data: any) => void;
}

export default function CostForm({cost, onSubmit}: CostForm) {
    const [formData, setFormData] = useState<Cost>(cost);

    useEffect(() => {
            setFormData({
                date: cost.date,
                category: cost.category,
                price: cost.price,
                description: cost.description
            });
    }, [cost]);

    const getDataForDropdown = async () => {
        return fetch('http://localhost:5000/categories?sort=name_asc')
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
        <Form<Cost> id="cost-form" fields={fields} handelSubmit={onSubmit}/>
    );
}