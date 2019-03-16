import * as React from 'react';
import { Form as FormHoc, FormAction } from '../../../components/Form';
import { InputString } from '../../../components/Form/InputString';
import Typography from '@material-ui/core/Typography';
import { ProgressOverlay } from '../../../components/ProgessOverlay';
import { State as StateProps } from '../reducers';
import { selector } from '../selectors';
import { actions } from '../actions';
import { Action } from 'redux';
import { connect } from '../../../../../common/utils/connect';
import { ContactsExtended } from '../../../../../common/contracts/Contacts';
import { history } from '../../../history';

interface DispatchProps {
    getContacts?: (id: string) => Action;
    updateContacts?: (user: ContactsExtended) => Action;
}

type Props = OwnProps & DispatchProps & Partial<StateProps>;

export interface OwnProps {
    action: FormAction,
    id?: string
}

const mapStateToProps = (state): Partial<StateProps> => selector(state);

const mapDispatchToProps: DispatchProps = {
    getContacts: actions.get.init,
    updateContacts: actions.update.init,
};

// todo: remove? Its just for typing
class UserFormWrapper extends FormHoc<ContactsExtended> {
}

@connect(mapStateToProps, mapDispatchToProps)
export class Form extends React.Component<Props> {
    constructor (props: Props) {
        super(props);
    }

    componentDidMount (): void {
        const { getContacts, id } = this.props;
        getContacts(id);
    }

    onCancel () {
        history.goBack();
    }

    onSubmit (action: FormAction, contacts: ContactsExtended) {
        const { updateContacts } = this.props;
        updateContacts(contacts);
    }

    render () {
        const { action, isFetching, entity } = this.props;

        return (<>
            <Typography variant="h5" component="h3">
                Контакты
            </Typography>
            <ProgressOverlay inProgress={ isFetching }>
                <UserFormWrapper initial={ entity }
                                 action={ action }
                                 onCancel={ () => this.onCancel() }
                                 onSubmit={ this.onSubmit.bind(this) }>
                    <InputString title="Описание" name="content" id="content-input"/>
                </UserFormWrapper>
            </ProgressOverlay>
        </>);
    }
}
