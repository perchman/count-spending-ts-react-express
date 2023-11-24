import React, {useEffect, useState} from "react";

import TextField from "../common/form/fields/TextField";
import FormWrapper from "../common/form/Form";

import style from "../common/form/Form.module.css";
import {Category} from "../../types/entities";

interface CategoryForm {
    category: Category;
    handlerSubmit: (data: any) => void;
}

export default function CategoryForm({category, handlerSubmit}: CategoryForm) {
    const [formData, setFormData] = useState<Category>(category);

    useEffect(() => {
        setFormData({
            name: category.name
        });
    }, [category]);

    const fields = {
        name: {
            component: TextField,
            params: {
                className: style.input,
                name: 'name',
                placeholder: 'Category name',
                value: formData.name,
                validators: ['required', 'maxLength']
            }
        }
    }


    return (
        <FormWrapper id="category-form" fields={fields} handlerSubmit={handlerSubmit}/>
    );
}