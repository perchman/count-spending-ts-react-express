import React, {useState} from "react";

import DateField from "../../common/form/fields/DateField";
import NumberField from "../../common/form/fields/NumberField";
import FormWrapper from "../../common/form/Form";

interface BalanceForm {
    handlerSubmit: (data: any) => void;
}

export default function BalanceForm({handlerSubmit}: BalanceForm) {
    const [formData, setFormData] = useState({
        date: '',
        replenish: ''
    });

    const fields = {
        date: {
            component: DateField,
            params: {
                name: 'date',
                validators: ['required']
            }
        },
        replenish: {
            component: NumberField,
            params: {
                name: 'replenish',
                placeholder: 'Amount',
                validators: ['required', 'positiveNumber']
            }
        }
    }

    return (
        <FormWrapper id="replenish" fields={fields} handlerSubmit={handlerSubmit}/>
    );
}