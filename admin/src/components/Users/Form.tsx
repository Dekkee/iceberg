import * as React from 'react';
import { Form, FormAction } from '../Form';
import { InputString } from '../Form/InputString';
import Typography from '@material-ui/core/Typography';

export interface FormState {
    email: string;
    name: string;
}

class UserForm extends Form<FormState> {
    constructor (props: { match: any }) {
        super(props as any);
    }
}

const initialState: FormState = {
    email: '1',
    name: '1',
};

export const getUserForm = (action: FormAction, id?: string) => {
    console.log(`fetch user with id=${ id }`);
    return (<>
        <Typography variant="h5" component="h3">
            { action === FormAction.Add && 'Добавление пользователя' }
            { action === FormAction.Edit && 'Редактирование пользователя' }
            { action === FormAction.Read && `Пользователь ${ initialState.name }` }
        </Typography>
        <UserForm initial={ initialState } action={ action }>
            <InputString title="E-mail" name="email" id="email-input"/>
            <InputString title="Имя" name="name" id="name-input"/>
        </UserForm>
    </>);
};
