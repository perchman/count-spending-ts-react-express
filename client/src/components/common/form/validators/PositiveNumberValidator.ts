import {Validator} from "../../../../types/validator";

export default class PositiveNumberValidator implements Validator{
    validate(value: string): string | null {
        //data from form comes as a string
        if (parseInt(value) < 0) {
            return "Number cannot be negative";
        }
        return null;
    }
}