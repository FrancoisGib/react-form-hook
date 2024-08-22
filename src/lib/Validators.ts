export type ValidationFunction = (value: string) => boolean;

export class Validator {
    static maxLength = (length: number): ValidationFunction => (value: string): boolean => value.length <= length;

    static minLength = (length: number): ValidationFunction => (value: string): boolean => value.length >= length;

    static nonBlank = (value: string): boolean => value !== ""; 

    static email = (value: string): boolean => new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/).test(value);

    static password = (value: string): boolean => 
        new RegExp(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)
        .test(value);
}

