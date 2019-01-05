import * as React from 'react';
import { FormContextProvider, FormContext } from './FormContext';
import Button from '@material-ui/core/Button';
import { history } from '../../history';

export interface Props<FS> {
    action: FormAction;
    initial: FS;
}

interface State<FS> extends FormContext<FS> {
}

export enum FormAction {
    Read,
    Edit,
    Add
}

export class Form<FS extends {}> extends React.Component<Props<FS>, State<FS>> {
    constructor (props: Props<FS>) {
        super(props);

        this.state = {
            validators: [],
            action: props.action,
            formState: props.initial,
            updateField: (key, value) => {
                this.setState({
                    ...this.state,
                    formState: { ...(this.state.formState as object), [ key ]: value } as FS
                });
            }
        };
    }

    private static onCancel () {
        history.goBack();
    }

    render () {
        const { children, action } = this.props;
        return (
            <FormContextProvider value={ this.state }>
                { children }
                {
                    action === FormAction.Add &&
                    <Button color="inherit">Добавить</Button>
                }
                {
                    action === FormAction.Edit &&
                    <Button color="inherit">Сохранить</Button>
                }
                {
                    action === FormAction.Read &&
                    <Button color="inherit" onClick={ () => Form.onCancel() }>Закрыть</Button>
                }
                {
                    (action === FormAction.Add || action === FormAction.Edit) &&
                    <Button color="inherit" onClick={ () => Form.onCancel() }>Отмена</Button>
                }
            </FormContextProvider>
        );
    }
}
