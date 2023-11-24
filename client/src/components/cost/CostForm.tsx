import React, {useEffect, useState} from "react";
import {Cost} from "../../types/entities";

import Form from "../common/form/Form";
import DateField from "../common/form/fields/DateField";
import DropdownField from "../common/form/fields/DropdownField";
import NumberField from "../common/form/fields/NumberField";
import TextField from "../common/form/fields/TextField";

interface CostForm {
    cost: Cost;
    handlerSubmit: (data: any) => void;
}

export default function CostForm({cost, handlerSubmit}: CostForm) {
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
        <Form<Cost> id="cost-form" fields={fields} handlerSubmit={handlerSubmit}/>
    );
}