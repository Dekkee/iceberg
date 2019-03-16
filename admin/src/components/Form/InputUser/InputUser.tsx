import * as React from 'react';
import { FormFieldHoc, withFormContext } from '../FormField';
import { FormContext } from '../FormContext';
import ListItem from '@material-ui/core/ListItem';
import { Option, Select } from '../../Select';
import { UserExtended } from '../../../../../common/contracts/User';
import { FormAction } from '../Form';
import { FormControl } from '@material-ui/core';
import { selector as usersSelector } from '../../../modules/Users/selectors';
import { connect } from '../../../../../common/utils/connect';
import { State as UsersState } from '../../../modules/Users/reducers';
import { actions as usersActions } from '../../../modules/Users/actions';
import { Action } from 'redux';

type OwnProps<FS> = {
    title: string;
    value?: string;
    name: keyof FS;
    formContext?: FormContext<FS>;
    id: string;
}

type StateProps = { users?: UsersState };

type DispatchProps = { fetch?: () => Action };

export type Props<FS extends {}> = OwnProps<FS> & StateProps & DispatchProps;

interface State {
    error?: string;
}

const mapStateToProps = (state): StateProps => ({ users: { ...usersSelector(state) } });

const mapDispatchToProps: DispatchProps = {
    fetch: usersActions.list.init,
};

@withFormContext
@connect(mapStateToProps, mapDispatchToProps)
export class InputUser<FS> extends FormFieldHoc<FS, Props<FS>, State> {
    constructor (props: Props<FS>) {
        super(props);

        this.state = {};
    }

    protected validate () {
        const { formContext, name } = this.props;
        const value = formContext.formState[name as string];
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

    public componentDidMount (): void {
        this.props.fetch();
    }

    private onChange (e: Option<string>) {
        const { name, formContext } = this.props;
        formContext.updateField(name, (e as Option<string>).value);
    }

    render (): React.ReactNode {
        const { title, formContext, name, id, users } = this.props;
        const map = users.list
            ? users.list.map((user) => ({ label: user.displayName || user.email, value: user.id }))
            : [];
        const state = formContext.formState;
        const user: UserExtended = state && state[name as string] || null;
        const value: Option<string> = user && { label: user.displayName || user.email, value: user.id } || undefined;
        return (<ListItem>
            <FormControl>
                <Select options={map}
                        label={title}
                        value={value}
                        disabled={formContext.action === FormAction.Read}
                        onChange={this.onChange.bind(this)}/>
            </FormControl>
        </ListItem>);
    }
}
