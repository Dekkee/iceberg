import * as React from 'react';
import { FormFieldHoc, withFormContext } from './FormField';

export interface Props {
    title: string;
}

interface State {
    value: string;
    error?: string;
}

@withFormContext
export class InputString extends FormFieldHoc<Props, State> {
    constructor (props: Props) {
        super(props);

        this.state = {
            value: ''
        };
    }

    protected validator () {
        const { error } = this.state;
        const result = this.state.value && this.state.value.length > 0;
        if (Boolean(error) === !result) {
            if (!result) {
                this.setState({ ...this.state, error: 'field is required' });
            } else {
                this.setState({ ...this.state, error: undefined });
            }
        }
        return result;
    }

    private onChange(e: React.FormEvent<HTMLInputElement>) {
        this.setState({...this.state, value: e.currentTarget.value});
    }

    render (): React.ReactNode {
        const { title } = this.props;
        return (<label>
            { title }
            <input onChange={this.onChange.bind(this)}/>
        </label>);
    }
}
