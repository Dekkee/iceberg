import * as React from 'react';
import { FormFieldHoc, withFormContext } from '../FormField';
import { FormContext } from '../FormContext';
import { FormAction } from '../Form';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
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
export class InputBoolean<FS> extends FormFieldHoc<FS, Props<FS>, State> {
    constructor (props: Props<FS>) {
        super(props);

        this.state = {};
    }

    protected validate () {
        return true;
    }

    private onChange (e: React.FormEvent<HTMLInputElement>) {
        const { name, formContext } = this.props;
        formContext.updateField(name, !e.currentTarget.value);
    }

    render (): React.ReactNode {
        const { title, formContext, name, id } = this.props;
        const { formState: state, action } = formContext;
        const value = state && state[ name as string ] || false;
        return (<ListItem>
            <FormControl>
                <FormControlLabel
                    id={ id }
                    control={
                        <Switch
                            checked={ value }
                            onChange={ this.onChange.bind(this) }
                            color="primary"
                            disabled={ action === FormAction.Read }
                        />
                    }
                    label={ title }
                />
            </FormControl>

        </ListItem>);
    }
}
