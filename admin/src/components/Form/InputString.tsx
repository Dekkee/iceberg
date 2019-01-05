import * as React from 'react';
import { FormFieldHoc, withFormContext } from './FormField';
import { FormContext } from './FormContext';
import { FormAction } from './Form';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import ListItem from '@material-ui/core/ListItem';

export interface Props<FS extends {}> {
    title: string;
    value?: string;
    name: keyof FS;
    formContext?: FormContext<FS>;
    id: string;
}

interface State {
    error?: string;
}

@withFormContext
export class InputString<FS> extends FormFieldHoc<FS, Props<FS>, State> {
    constructor (props: Props<FS>) {
        super(props);

        this.state = {};
    }

    protected validate () {
        const { formContext, name } = this.props;
        const value = formContext.formState[ name as string ];
        const { error } = this.state;
        const result = value && value.length > 0;
        if (Boolean(error) === !result) {
            if (!result) {
                this.setState({ ...this.state, error: 'field is required' });
            } else {
                this.setState({ ...this.state, error: undefined });
            }
        }
        return result;
    }

    private onChange (e: React.FormEvent<HTMLInputElement>) {
        const { name, formContext } = this.props;
        formContext.updateField(name, e.currentTarget.value);
    }

    render (): React.ReactNode {
        const { title, formContext, name, id } = this.props;
        const state = formContext.formState;
        const value = state && state[ name as string ] || '';
        return (<ListItem>
            <FormControl>
                <InputLabel htmlFor={ id }>{ title }</InputLabel>
                <Input onChange={ this.onChange.bind(this) }
                       id={ id }
                       disabled={ formContext.action === FormAction.Read }
                       value={ value }
                       fullWidth/>
            </FormControl>
        </ListItem>);
    }
}
