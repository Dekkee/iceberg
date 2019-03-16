import * as React from 'react';
import { FormContext, FormContextConsumer } from './FormContext';

interface Props<FS> {
    formContext?: FormContext<FS>;
}

export abstract class FormFieldHoc<FS, P, S> extends React.Component<P & Props<FS>, S> {
    protected constructor (props: P & Props<FS>) {
        super(props);
        this.props.formContext.validators.push(this.validate.bind(this));
    }

    protected abstract validate ();
}

export const withFormContext = <C extends React.ComponentClass> (Component: C): C => {
    return ((props) =>
        <FormContextConsumer>
            { (context) => <Component { ...props } formContext={ context }/> }
        </FormContextConsumer>) as any as C;
};
