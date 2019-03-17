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
import { history } from '../../../../../common/history';

interface DispatchProps {
    getAbout?: (id: string) => Action;
    updateAbout?: (user: AboutExtended) => Action;
}

type Props = OwnProps & DispatchProps & Partial<StateProps>;

export interface OwnProps {
    action: FormAction,
    id?: string
}

const mapStateToProps = (state): Partial<StateProps> => selector(state);

const mapDispatchToProps: DispatchProps = {
    getAbout: actions.get.init,
    updateAbout: actions.update.init,
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
        const { getAbout, id } = this.props;
        getAbout(id);
    }

    onCancel () {
        history.goBack();
    }

    onSubmit (action: FormAction, user: AboutExtended) {
        const { updateAbout } = this.props;
        updateAbout(user);
    }

    render () {
        const { action, isFetching, entity } = this.props;

        return (<>
            <Typography variant="h5" component="h3">
                About
            </Typography>
            <ProgressOverlay inProgress={isFetching}>
                <UserFormWrapper initial={entity}
                                 action={action}
                                 onCancel={() => this.onCancel()}
                                 onSubmit={this.onSubmit.bind(this)}>
                    <InputString title="Описание" name="content" id="content-input"/>
                </UserFormWrapper>
            </ProgressOverlay>
        </>);
    }
}
