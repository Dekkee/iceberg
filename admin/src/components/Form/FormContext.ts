import * as React from 'react';
import { FormAction } from './Form';

export type Validator = () => boolean;
export type Transformer = () => void;

export interface FormContext<S extends {}> {
    validators: Validator[];
    action: FormAction;
    updateField: (key: keyof S, value: any) => void;
    formState: S
}

const { Provider, Consumer } = React.createContext<FormContext<any>>(null);

export const FormContextProvider = Provider;

export const FormContextConsumer = Consumer;
