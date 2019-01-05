import * as React from 'react';
import { connect } from '../../../../common/utils/connect';
import { actions } from '../../actions/users';
import { Action } from 'redux';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { selector } from '../../selectors/users';
import { User } from '../../../../common/contracts/User';
import { RouteComponentProps, withRouter } from 'react-router';
import { history } from '../../history';
import { compose } from 'recompose';
import { withStyles } from '@material-ui/core';
import { WithStyles } from '../../../../common/styles/WithStyles';
import { ProgressOverlay } from '../ProgessOverlay/ProgressOverlay';
import { State as StateProps } from '../../reducers/users';

interface DispatchProps {
    loadUsers?: () => Action;
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
export class UserList extends React.Component<Props & RouteComponentProps & WithStyles> {
    constructor (props) {
        super(props);
    }

    componentDidMount () {
        this.props.loadUsers();
    }

    onUserClicked (user: User) {
        history.push(`/admin/users/${ user.email }`);
    }

    onDeleteUserClicked (user: User) {
        history.push(`/admin/users/${ user.email }`);
    }

    render () {
        const { users, match, classes, isFetching } = this.props;

        return (<>
            <Typography className={ classes.header } variant="h5" component="h3">
                Пользователи
                <Button onClick={ () => history.push(`${ match.url }/create`) }
                        variant="contained"
                        size="small">
                    <AddIcon/>Добавить
                </Button>
            </Typography>

            <ProgressOverlay inProgress={ isFetching }>
                <List>
                    { users && users.map((user, i) =>
                        <ListItem key={ i } button
                                  onClick={ () => this.onUserClicked(user) }>
                            { user.email }
                            <ListItemSecondaryAction>
                                <IconButton aria-label="Delete"
                                            onClick={ () => this.onDeleteUserClicked(user) }>
                                    <DeleteIcon/>
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>) }
                </List>
            </ProgressOverlay>
        </>);
    }
}
