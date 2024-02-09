import React from "react";

export interface Field<T> {
    text: string;
    sort: boolean;
    value: (item: T) => string | number;
}

export type Fields<T> = Record<string, Field<T>>;

export interface Button {
    key: string;
    component: React.ComponentType<any>;
    createUrl: (uuid: string) => string;
}

export type Buttons = Button[];

export interface GridHeader<T> {
    fields: Fields<T>;
    sort: { key: string; direction: string };
    setSort: ({ key, direction }: { key: string, direction: string }) => void;
}

export interface GridBody<T> {
    data: T[];
    fields: Fields<T>;
    buttons: Buttons;
}

export interface Grid<T> {
    requestEndpoint: string;
    fields: Fields<T>;
    options: {
        sort: {
            default: { key: string; direction: string };
        };
        pageSize: number;
    };
    buttons: Buttons;
}
