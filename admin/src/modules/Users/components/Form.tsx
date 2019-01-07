import * as React from 'react';
import { Form as FormHoc, FormAction } from '../../../components/Form';
import { InputString } from '../../../components/Form/InputString';
import { InputPassword } from '../../../components/Form/InputPassword';
import { InputBoolean } from '../../../components/Form/InputBoolean';
import Typography from '@material-ui/core/Typography';
import { ProgressOverlay } from '../../../components/ProgessOverlay';
import { State as StateProps } from '../reducers';
import { selector } from '../selectors';
import { actions } from '../actions';
import { Action } from 'redux';
import { connect } from '../../../../../common/utils/connect';
import { UserExtended } from '../../../../../common/contracts/User';
import { history } from '../../../history';

interface DispatchProps {
    getUser?: (id: string) => Action;
    createUser?: (user: UserExtended) => Action;
    updateUser?: (user: UserExtended) => Action;
}

type Props = OwnProps & DispatchProps & Partial<StateProps>;

export interface OwnProps {
    action: FormAction,
    id?: string
}

const mapStateToProps = (state): Partial<StateProps> => selector(state);

const mapDispatchToProps: DispatchProps = {
    getUser: actions.get.init,
    createUser: actions.create.init,
    updateUser: actions.update.init,
};

// todo: remove? Its just for typing
class UserFormWrapper extends FormHoc<UserExtended> {
}

@connect(mapStateToProps, mapDispatchToProps)
export class Form extends React.Component<Props> {
    constructor (props: Props) {
        super(props);
    }

    componentDidMount (): void {
        const { action, getUser, id } = this.props;
        if (action === FormAction.Edit || action === FormAction.Read) {
            getUser(id);
        }
    }

    onCancel () {
        history.goBack();
    }

    onSubmit (action: FormAction, user: UserExtended) {
        const { createUser, updateUser } = this.props;
        switch (action) {
            case FormAction.Edit:
                updateUser(user);
                history.push('/admin/users');
                break;
            case FormAction.Add:
                createUser(user);
                history.push('/admin/users');
                break;
        }
    }

    render () {
        const { action, isFetching, entity } = this.props;

        return (<>
            <Typography variant="h5" component="h3">
                { action === FormAction.Add && 'Добавление пользователя' }
                { action === FormAction.Edit && 'Редактирование пользователя' }
                { action === FormAction.Read && `Пользователь ${ entity && entity.email }` }
            </Typography>
            <ProgressOverlay inProgress={ isFetching }>
                <UserFormWrapper initial={ entity }
                                 action={ action }
                                 onCancel={ () => this.onCancel() }
                                 onSubmit={ this.onSubmit.bind(this) }>
                    <InputString title="E-mail" name="email" id="email-input"/>
                    <InputString title="Имя" name="displayName" id="name-input"/>
                    <InputPassword title="Пароль" name="password" id="password-input"/>
                    <InputBoolean title="Админ" name="isAdmin" id="is-admin-input"/>
                </UserFormWrapper>
            </ProgressOverlay>
        </>);
    }
}
