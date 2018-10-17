import * as React from 'react';
import { connect } from '../../../../common/utils/connect';
import { actions } from '../../actions/users';
import { Action } from 'redux';
import { selector } from '../../selectors/users';
import { User } from '../../api/contracts';

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

@connect(mapStateToProps, mapDispatchToProps)
export class UserList extends React.Component<Props> {
    constructor (props) {
        super(props);
    }

    componentDidMount() {
        this.props.loadUsers();
    }

    render () {
        const { users } = this.props;
        console.log(users);
        return (
            <div>
                Юзиры
                { users && users.map((user) => <div>{user.email}</div>) }
            </div>
        );
    }
}
