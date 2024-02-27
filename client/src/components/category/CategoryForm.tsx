import React, {useEffect, useState} from "react";
import {CategoryDataForm} from "../../types/entities";

import TextField from "../common/form/fields/TextField";
import FormWrapper from "../common/form/Form";

interface CategoryForm {
    category: CategoryDataForm;
    handlerSubmit: (data: CategoryDataForm) => void;
}

export default function CategoryForm({category, handlerSubmit}: CategoryForm) {
    const [formData, setFormData] = useState<CategoryDataForm>(category);

    useEffect(() => {
        setFormData({
            name: category.name
        });
    }, [category]);

    const fields = {
        name: {
            component: TextField,
            params: {
                name: 'name',
                placeholder: 'Category name',
                value: formData.name,
                validators: ['required', 'maxLength']
            }
        }
    }


    return (
        <FormWrapper<CategoryDataForm> id="category-form" fields={fields} handlerSubmit={handlerSubmit}/>
    );
}