import { ChangeEvent, useState } from "react";
import { ValidationFunction } from "../lib/Validators";
import { ChangeEventFunction } from "../types";

type FieldState = [string, ChangeEventFunction, boolean];

// validate a single field with validation functions
export const useFieldValidator = (initialValue: string, ...validationFunctions: ValidationFunction[]): FieldState => {
    const [value, setValue] = useState<string>(initialValue);
    const isValid: boolean = validationFunctions.reduce((isValid, func) => isValid && func(value), true);

    const setFormState = (e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value);

    return [value, setFormState, isValid];
}
