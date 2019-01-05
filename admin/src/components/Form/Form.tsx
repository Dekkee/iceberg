import * as React from 'react';
import { FormContextProvider, FormContext } from './FormContext';

export interface Props {

}

interface State {
    formContext: FormContext;
}

export class Form extends React.Component<Props, State> {
    constructor(props) {
        super(props);

        this.state = {
            formContext: { validators: [] }
        };
    }

    render() {
        const { formContext } = this.state;
        const { children } = this.props;
        return (
            <FormContextProvider value={formContext}>
                { children }
            </FormContextProvider>
        );
    }
}
