import * as React from 'react';
import { FormContextProvider, FormContext } from './FormContext';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

export interface Props<FS> {
    action: FormAction;
    initial: FS;
    onCancel: VoidFunction;
    onSubmit: (action: FormAction, state: FS) => void;
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

    render () {
        const { children, action, onCancel, onSubmit } = this.props;
        const { formState } = this.state;
        return (
            <FormContextProvider value={ this.state }>
                <List>
                    { children }
                    <ListItem>
                        {
                            action === FormAction.Add &&
                            <Button variant="contained" color="primary"
                                    onClick={ () => onSubmit(action, formState) }>Добавить</Button>
                        }
                        {
                            action === FormAction.Edit &&
                            <Button variant="contained" color="primary"
                                    onClick={ () => onSubmit(action, formState) }>Сохранить</Button>
                        }
                        {
                            action === FormAction.Read &&
                            <Button variant="contained" color="primary" onClick={ () => onCancel() }>Закрыть</Button>
                        }
                        {
                            (action === FormAction.Add || action === FormAction.Edit) &&
                            <Button color="inherit" onClick={ () => onCancel() }>Отмена</Button>
                        }
                    </ListItem>
                </List>
            </FormContextProvider>
        );
    }
}
