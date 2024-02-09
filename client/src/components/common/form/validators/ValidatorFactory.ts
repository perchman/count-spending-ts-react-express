import RequiredValidator from "./RequiredValidator";
import PositiveNumberValidator from "./PositiveNumberValidator";
import MaxLengthValidator from "./MaxLengthValidator";

import {Validator} from "../../../../types/validator";

export default class ValidatorFactory {
    static factory(type: string): Validator{
        switch (type) {
            case 'required':
                return new RequiredValidator();

            case 'positiveNumber':
                return new PositiveNumberValidator();

            case 'maxLength':
                return new MaxLengthValidator();

            default:
                throw new Error("Validator " + type + " not supported");
        }
    }
}