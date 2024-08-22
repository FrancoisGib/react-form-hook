import { useState } from "react";
import { ValidationFunction } from "../lib/Validators";

type FieldState = [value: string, isValid: boolean, setValue: React.Dispatch<React.SetStateAction<string>>];

// validate a single field with validation functions
export const useFieldValidator = (initialValue: string, ...validationFunctions: ValidationFunction[]): FieldState => {
    const [value, setValue] = useState<string>(initialValue);
    const isValid: boolean = validationFunctions.reduce((isValid, func) => isValid && func(value), true)
    return [value, isValid, setValue];
}
