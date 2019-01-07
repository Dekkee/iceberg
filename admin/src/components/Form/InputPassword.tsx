import * as React from 'react';
import { FormFieldHoc, withFormContext } from './FormField';
import { FormContext } from './FormContext';
import { FormAction } from './Form';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import ListItem from '@material-ui/core/ListItem';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';

export interface Props<FS extends {}> {
    title: string;
    value?: string;
    name: keyof FS;
    formContext?: FormContext<FS>;
    id: string;
}

interface State {
    error?: string;
    showPassword: boolean;
    confirmation?: string;
}

@withFormContext
export class InputPassword<FS> extends FormFieldHoc<FS, Props<FS>, State> {
    constructor (props: Props<FS>) {
        super(props);

        this.state = {
            showPassword: false,
            confirmation: props.formContext.formState && props.formContext.formState[ props.name as string ] || '',
        };
    }

    protected validate () {
        const { formContext, name } = this.props;
        const value = formContext.formState[ name as string ];
        const { confirmation } = this.state;
        let result = true;
        if (!value || value.length < 1) {
            this.setState({ ...this.state, error: 'field is required' });
            result = false;
        }
        if (confirmation !== value) {
            this.setState({ ...this.state, error: 'password and confirmation are different' });
            result = false;
        }
        if (result) {
            this.setState({ ...this.state, error: undefined });
        }
        return result;
    }

    private handleTextChange (e: React.FormEvent<HTMLInputElement>) {
        const { name, formContext } = this.props;
        formContext.updateField(name, e.currentTarget.value);
    }

    private handleConfirmationTextChange (e: React.FormEvent<HTMLInputElement>) {
        this.setState({ ...this.state, confirmation: e.currentTarget.value });
    }

    private handleClickShowPassword () {
        const { showPassword } = this.state;
        this.setState({ ...this.state, showPassword: !showPassword });
    }

    render (): React.ReactNode {
        const { title, formContext, name, id } = this.props;
        const { showPassword, confirmation } = this.state;
        const { formState: state, action } = formContext;
        const value = action !== FormAction.Read
            ? state && state[ name as string ] || ''
            : 'Stars';
        return (<ListItem>
            <FormControl>
                <InputLabel htmlFor={ id }>{ title }</InputLabel>
                <Input onChange={ this.handleTextChange.bind(this) }
                       id={ id }
                       disabled={ formContext.action === FormAction.Read }
                       value={ value }
                       type={ showPassword ? 'text' : 'password' }
                       fullWidth>
                </Input>
            </FormControl>
            {
                action !== FormAction.Read && <FormControl>
                    <InputLabel htmlFor={ id }>Подтвердить</InputLabel>
                    <Input onChange={ this.handleConfirmationTextChange.bind(this) }
                           id={ `${ id }-confirmation` }
                           disabled={ formContext.action === FormAction.Read }
                           value={ confirmation }
                           type={ showPassword ? 'text' : 'password' }
                           fullWidth
                           endAdornment={
                               <InputAdornment position="end">
                                   <IconButton
                                       aria-label="Toggle password visibility"
                                       onClick={ this.handleClickShowPassword.bind(this) }
                                   >
                                       { showPassword ? <Visibility/> : <VisibilityOff/> }
                                   </IconButton>
                               </InputAdornment>
                           }/>
                </FormControl>
            }
        </ListItem>);
    }
}
