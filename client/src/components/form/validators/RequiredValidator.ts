import {Validator} from "../../../types/validator";

export default class RequiredValidator implements Validator{
    validate(value: string): string | null {
        if (!value) {
            return "Required field";
        }
        return null;
    }
}