import React from "react";

import LinkButton from "../../components/common/buttons/add/LinkButton";

import TextField from "../../components/common/form/fields/TextField";
import NumberField from "../../components/common/form/fields/NumberField";
import DateField from "../../components/common/form/fields/DateField";
import DropdownField from "../../components/common/form/fields/DropdownField";

import style from "../Section.module.css";

export default function CostIndex() {
    return (
        <div className={style.section}>
            <div className={style.inner}>
                <h1 className={style.title}>Costs</h1>
                <LinkButton path="/cost/create" text="Add"/>
            </div>
        </div>
    );
}