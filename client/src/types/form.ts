import React from "react";

export interface Input {
    name: string;
    placeholder?: string;
    value?: string;
    validators: string[];
}

export interface Select {
    name: string;
    disabledOption: string;
    selected: string;
    getData: () => any;
    validators: string[];
}
//@todo переписать React.ComponentType<any>
export interface Field {
    component: React.ComponentType<any>;
    params: Input | Select;
}

export interface FormWrapper {
    id: string;
    fields: {
        [key: string]: Field
    };
    handlerSubmit: (data: any) => void
}