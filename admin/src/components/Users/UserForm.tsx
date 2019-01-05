import * as React from 'react';
import { Form, FormAction } from '../Form';
import { InputString } from '../Form/InputString';
import Typography from '@material-ui/core/Typography';
import { ProgressOverlay } from '../ProgessOverlay/ProgressOverlay';

export interface FormState {
    email: string;
    name: string;
}

// todo: remove? Its just for typing
class UserFormWrapper extends Form<FormState> {}

const initialState: FormState = {
    email: '',
    name: '',
};

export interface Props {
    action: FormAction,
    id?: string
}

export class UserForm extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    componentDidMount (): void {
    }

    render () {
        const { action } = this.props;

        return (<>
            <Typography variant="h5" component="h3">
                { action === FormAction.Add && 'Добавление пользователя' }
                { action === FormAction.Edit && 'Редактирование пользователя' }
                { action === FormAction.Read && `Пользователь ${ initialState.name }` }
            </Typography>
            <ProgressOverlay inProgress={ false }>
                <UserFormWrapper initial={ initialState } action={ action }>
                    <InputString title="E-mail" name="email" id="email-input"/>
                    <InputString title="Имя" name="name" id="name-input"/>
                </UserFormWrapper>
            </ProgressOverlay>
        </>);
    }
}
