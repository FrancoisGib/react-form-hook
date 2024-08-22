import { ChangeEvent, useState } from "react";
import { ValidationFunction } from "../lib/validators";
import { ChangeEventFunction } from "../types";

interface FormFieldParam {
   name: string;
   initialValue: string | number;
   validationFunctions?: ValidationFunction[];
   strict?: boolean;
}

// simple dictiorary
interface dict<T> {
   [key: string]: T;
}

interface FormField {
   value: string;
   validationFunctions?: ValidationFunction[];
   isValid: boolean;
   strict: boolean;
}

type FormState = [dict<FormField>, ChangeEventFunction, boolean];

// functions to check the validity of different types
const checkValidity = (value: string, validationFunctions?: ValidationFunction[]): boolean => 
    validationFunctions ? validationFunctions.reduce((isValid, func) => isValid && func(value), true): true;

const isFieldValid = (field: FormField): boolean => checkValidity(field.value, field.validationFunctions);

const isParamValid = (param: FormFieldParam): boolean => checkValidity(param.initialValue as string, param.validationFunctions);

// useFormValidator hook
export const useFormValidator = (...formFields: FormFieldParam[]): FormState => {

   // convert formFields to form state dictionary with initial values and validation functions
   const form: dict<FormField> = formFields.reduce((acc, field) => {
       acc[field.name] = {
            value: field.initialValue as string, 
            validationFunctions: field.validationFunctions,
            isValid: isParamValid(field),
            strict: field.strict?? false
        };
       return acc;
   }
   , {} as dict<FormField>);

   const [formState, setForm] = useState(form);

   // computed state for form validity
   const isValid = Object.values(formState).every(field => isFieldValid(field));

   // function to handle form changes, update the state and recalculate validity for the form and the update field
   const setFormState: ChangeEventFunction = (e: ChangeEvent<HTMLInputElement>) => {
        const formField = formState[e.target.name];
        const newValidity = checkValidity(e.target.value, formField.validationFunctions);
        if (!formField.strict || newValidity) {
            formField.value = e.target.value;
            formField.isValid = newValidity;
        }
        
       setForm({...formState, [e.target.name]: formField});
   };

   // return the current form state, the function to handle changes (same for all fields), and the current form validity
   return [formState, setFormState, isValid];
}