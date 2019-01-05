import * as React from 'react';
import { Form, FormAction } from '../Form';
import { InputString } from '../Form/InputString';

export interface FormState {
    email: string;
    name: string;
}

class UserForm extends Form<FormState> {
    constructor(props: { match: any }) {
        super(props as any);
    }
}

const initialState: FormState = {
    email: '1',
    name: '1',
};

export const getUserForm = (action: FormAction, id?: string) => {
    console.log(`fetch user with id=${id}`);
    return (<UserForm initial={ initialState } action={ action }>
        <InputString title="E-mail" name="email"/>
        <InputString title="Имя" name="name"/>
    </UserForm>);
};
