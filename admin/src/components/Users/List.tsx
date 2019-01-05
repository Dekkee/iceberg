import * as React from 'react';
import { connect } from '../../../../common/utils/connect';
import { actions } from '../../actions/users';
import { Action } from 'redux';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import { selector } from '../../selectors/users';
import { User } from '../../../../common/contracts/User';
import { RouteComponentProps, withRouter } from 'react-router';
import { history } from '../../history';
import { compose } from 'recompose';
import { withStyles } from '@material-ui/core';

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

const styles = theme => ({
    header: {
        ...theme.mixins.gutters(),
        display: 'flex',
        alignItems: 'baseline',
        justifyContent: 'space-between'
    },
});

@compose(withStyles(styles), withRouter)
@connect(mapStateToProps, mapDispatchToProps)
export class UserList extends React.Component<Props & RouteComponentProps & { classes?: any }> {
    constructor (props) {
        super(props);
    }

    componentDidMount () {
        this.props.loadUsers();
    }

    render () {
        const { users, match, classes } = this.props;

        return (<>
            <Typography className={classes.header} variant="h5" component="h3">
                Пользователи
                <Button onClick={ () => history.push(`${ match.url }/create`) }
                        variant="contained"><AddIcon/>Добавить</Button>
            </Typography>
            <List>
            { users && users.map((user, i) => <ListItem key={ i }>{ user.email }</ListItem>) }
            </List>
        </>);
    }
}
