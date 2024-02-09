export interface Validator {
    validate: (value: string) => string | null;
}