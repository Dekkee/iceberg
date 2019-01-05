import * as React from 'react';
import { FormContext, FormContextConsumer } from './FormContext';

interface Props {
    formContext?: FormContext;
}

export abstract class FormFieldHoc<P, S> extends React.Component<P & Props, S> {
    protected constructor (props: P & Props) {
        super(props);
        this.props.formContext.validators.push(this.validator);
    }

    protected abstract validator ();
}

export const withFormContext = <C extends React.ComponentClass> (Component: C): C => {
    return ((props) =>
        <FormContextConsumer>
            { (context) => <Component { ...props } formContext={ context }/> }
        </FormContextConsumer>) as any as C;
};
