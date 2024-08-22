import { ChangeEvent, useState } from "react";
import { ValidationFunction } from "../lib/Validators";

interface FormFieldParam {
   name: string;
   initialValue: string;
   validationFunctions?: ValidationFunction[];
}

// simple dictiorary
interface dict<T> {
   [key: string]: T;
}

interface FormField {
   value: string;
   validationFunctions?: ValidationFunction[];
}

type SetFormStateFunction = (e: ChangeEvent<HTMLInputElement>) => void;

type FormState = [dict<FormField>, SetFormStateFunction, boolean];

export const useFormValidator = (...formFields: FormFieldParam[]): FormState => {
   // convert formFields to form state dictionary with initial values and validation functions
   const form: dict<FormField> = formFields.reduce((acc, field) => {
       acc[field.name] = {value: field.initialValue, validationFunctions: field.validationFunctions};
       return acc;
   }
   , {} as dict<FormField>);

   const [formState, setForm] = useState(form);

   // computed state for form validity
   const isValid = Object.values(formState).every(field => 
       field.validationFunctions ? 
           field.validationFunctions.reduce((isValid, func) => isValid && func(field.value), true) 
           : true
   );

   // function to handle form changes
   const setFormState = (e: ChangeEvent<HTMLInputElement>) => {
       setForm(
           {
               ...formState, 
               [e.target.name]: {value: e.target.value, validationFunctions: formState[e.target.name].validationFunctions}
           });
   };

   // return the current form state, the function to handle changes (same for all fields), and the current form validity
   return [formState, setFormState, isValid];
}