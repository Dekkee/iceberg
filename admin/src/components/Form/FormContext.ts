import * as React from 'react';
import { Validator } from './validator';

export interface FormContext {
    validators: Validator[];
}

const { Provider, Consumer } = React.createContext<FormContext>({ validators: [] });

export const FormContextProvider = Provider;

export const FormContextConsumer = Consumer;
