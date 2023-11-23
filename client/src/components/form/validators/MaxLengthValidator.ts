import {Validator} from "../../../types/validator";

export default class MaxLengthValidator implements Validator{
    validate(value: string): string | null {
        if (value.length > 1000) {
            return "Max length 1000 symbols";
        }
        return null;
    }
}