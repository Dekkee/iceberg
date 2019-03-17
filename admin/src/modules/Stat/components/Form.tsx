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
import { StatExtended } from '../../../../../common/contracts/Stat';
import { history } from '../../../../../common/history';
import { InputNumber } from '../../../components/Form/InputNumber';
import { InputUser } from '../../../components/Form/InputUser';

interface DispatchProps {
    getStat?: (id: string) => Action;
    createStat?: (user: StatExtended) => Action;
    updateStat?: (user: StatExtended) => Action;
}

type Props = OwnProps & DispatchProps & Partial<StateProps>;

export interface OwnProps {
    action: FormAction,
    id?: string
}

const mapStateToProps = (state): Partial<StateProps> => selector(state);

const mapDispatchToProps: DispatchProps = {
    getStat: actions.get.init,
    createStat: actions.create.init,
    updateStat: actions.update.init,
};

// todo: remove? Its just for typing
class UserFormWrapper extends FormHoc<StatExtended> {
}

@connect(mapStateToProps, mapDispatchToProps)
export class Form extends React.Component<Props> {
    constructor (props: Props) {
        super(props);
    }

    componentDidMount (): void {
        const { action, getStat, id } = this.props;
        if (action === FormAction.Edit || action === FormAction.Read) {
            getStat(id);
        }
    }

    onCancel () {
        history.goBack();
    }

    onSubmit (action: FormAction, user: StatExtended) {
        const { createStat, updateStat } = this.props;
        switch (action) {
            case FormAction.Edit:
                updateStat(user);
                break;
            case FormAction.Add:
                createStat(user);
                break;
        }
    }

    render () {
        const { action, isFetching, entity } = this.props;

        return (<>
            <Typography variant="h5" component="h3">
                { action === FormAction.Add && 'Добавление статистики' }
                { action === FormAction.Edit && 'Редактирование статистика' }
                { action === FormAction.Read && `Статистика ${ entity && entity.player.displayName }` }
            </Typography>
            <ProgressOverlay inProgress={ isFetching }>
                <UserFormWrapper initial={ entity }
                                 action={ action }
                                 onCancel={ () => this.onCancel() }
                                 onSubmit={ this.onSubmit.bind(this) }>
                    <InputNumber title="Рейтинг" name="rating" id="rating-input"/>
                    <InputUser title="Игрок" name="player" id="player-input"/>
                </UserFormWrapper>
            </ProgressOverlay>
        </>);
    }
}
