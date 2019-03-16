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
import { AboutExtended } from '../../../../../common/contracts/About';
import { history } from '../../../history';

interface DispatchProps {
    getChamp?: (id: string) => Action;
    createChamp?: (user: AboutExtended) => Action;
    updateChamp?: (user: AboutExtended) => Action;
}

type Props = OwnProps & DispatchProps & Partial<StateProps>;

export interface OwnProps {
    action: FormAction,
    id?: string
}

const mapStateToProps = (state): Partial<StateProps> => selector(state);

const mapDispatchToProps: DispatchProps = {
    getChamp: actions.get.init,
    updateChamp: actions.update.init,
};

// todo: remove? Its just for typing
class UserFormWrapper extends FormHoc<AboutExtended> {
}

@connect(mapStateToProps, mapDispatchToProps)
export class Form extends React.Component<Props> {
    constructor (props: Props) {
        super(props);
    }

    componentDidMount (): void {
        const { action, getChamp, id } = this.props;
        if (action === FormAction.Edit || action === FormAction.Read) {
            getChamp(id);
        }
    }

    onCancel () {
        history.goBack();
    }

    onSubmit (action: FormAction, user: AboutExtended) {
        const { createChamp, updateChamp } = this.props;
        switch (action) {
            case FormAction.Edit:
                updateChamp(user);
                break;
            case FormAction.Add:
                createChamp(user);
                break;
        }
    }

    render () {
        const { action, isFetching, entity } = this.props;

        return (<>
            <Typography variant="h5" component="h3">
                About
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
