import * as React from 'react';
import { connect } from '../../../../common/utils/connect';
import { actions } from '../../actions/users';
import { Action } from 'redux';
import Button from '@material-ui/core/Button';
import { selector } from '../../selectors/users';
import { User } from '../../../../common/contracts/User';
import { RouteComponentProps, withRouter } from 'react-router';
import { history } from '../../history';
import { compose } from 'recompose';

interface State {
    users: any[];
}

interface DispatchProps {
    loadUsers?: () => Action;
}

interface StateProps {
    users: User[];
    count: number;
}

type Props = StateProps & DispatchProps;

const mapStateToProps = (state): StateProps => selector(state);

const mapDispatchToProps: DispatchProps = {
    loadUsers: actions.fetch.init,
};

@compose(withRouter)
@connect(mapStateToProps, mapDispatchToProps)
export class UserList extends React.Component<Props & RouteComponentProps> {
    constructor (props) {
        super(props);
    }

    componentDidMount() {
        this.props.loadUsers();
    }

    render () {
        const { users, match } = this.props;

        return (
            <div>
                Пользователи
                <Button onClick={ () => history.push(`${ match.url }/create`) }>Добавить</Button>
                { users && users.map((user, i) => <div key={i}>{user.email}</div>) }
            </div>
        );
    }
}
