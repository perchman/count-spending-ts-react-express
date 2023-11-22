import React from "react";

import LinkButton from "../../components/buttons/add/LinkButton";

import TextField from "../../components/form/fields/TextField";
import NumberField from "../../components/form/fields/NumberField";
import DateField from "../../components/form/fields/DateField";
import DropdownField from "../../components/form/fields/DropdownField";

import style from "../Section.module.css";

export default function CostIndex() {
    return (
        <div className={style.section}>
            <div className={style.inner}>
                <h2 className={style.title}>Costs</h2>
                <LinkButton path="/cost/create" text="Add"/>

                <form>
                    <div>
                        <TextField name="text" placeholder="text" />
                    </div>
                    <div>
                        <NumberField name="number" placeholder="number" />
                    </div>
                    <div>
                        <DateField name="date" />
                    </div>
                    <div>
                        <DropdownField name="dropdown" selected="gg" disabledOption="gg" getData={() => 'gg'} />
                    </div>
                </form>
            </div>
        </div>
    );
}