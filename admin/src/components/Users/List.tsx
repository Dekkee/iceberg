import * as React from 'react';
import { connect } from '../../../../common/utils/connect';
import { actions } from '../../actions/user';
import { Action } from 'redux';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import Divider from '@material-ui/core/Divider';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import { selector } from '../../selectors/user';
import { UserExtended } from '../../../../common/contracts/User';
import { RouteComponentProps, withRouter } from 'react-router';
import { history } from '../../history';
import { compose } from 'recompose';
import { withStyles } from '@material-ui/core';
import { WithStyles } from '../../../../common/utils/styles/WithStyles';
import { ProgressOverlay } from '../ProgessOverlay/ProgressOverlay';
import { State as StateProps } from '../../reducers/user';

interface DispatchProps {
    loadUsers?: () => Action;
    deleteUser?: (id: string) => Action;
}

interface State {
    isDeletePrompted: boolean;
    activeUser?: UserExtended;
}

type Props = StateProps & DispatchProps;

const mapStateToProps = (state): StateProps => selector(state);

const mapDispatchToProps: DispatchProps = {
    loadUsers: actions.list.init,
    deleteUser: actions.remove.init,
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
export class UserList extends React.Component<Props & RouteComponentProps & WithStyles, State> {
    constructor (props) {
        super(props);

        this.state = {
            isDeletePrompted: false,
        };
    }

    componentDidMount () {
        this.props.loadUsers();
    }

    onUserClicked (user: UserExtended) {
        history.push(`/admin/users/${ user.id }`);
    }

    onEditUserClicked (user: UserExtended) {
        history.push(`/admin/users/${ user.id }/edit`);
    }

    onDeleteUserClicked (user: UserExtended) {
        this.setState({ ...this.state, isDeletePrompted: true, activeUser: user });
    }

    onConfirmDelete () {
        const { deleteUser, loadUsers } = this.props;
        const { activeUser } = this.state;
        deleteUser(activeUser.id);
        loadUsers();
        this.setState({ ...this.state, isDeletePrompted: false, activeUser: undefined });
    }

    onDeclineDelete () {
        this.setState({ ...this.state, isDeletePrompted: false, activeUser: undefined });
    }

    render () {
        const { users, match, classes, isFetching } = this.props;
        const { isDeletePrompted } = this.state;

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
                                <IconButton aria-label="Edit"
                                            onClick={ () => this.onEditUserClicked(user) }>
                                    <EditIcon/>
                                </IconButton>
                                <IconButton aria-label="Delete"
                                            onClick={ () => this.onDeleteUserClicked(user) }>
                                    <DeleteIcon/>
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>) }
                </List>
            </ProgressOverlay>

            <Dialog open={ isDeletePrompted }>
                <DialogContent>Вы точно хотите удалить пользователя?</DialogContent>
                <Divider/>
                <DialogActions>
                    <Button onClick={ this.onDeclineDelete.bind(this) } color="default">
                        Отмена
                    </Button>
                    <Button onClick={ this.onConfirmDelete.bind(this) } color="primary">
                        Удалить
                    </Button>
                </DialogActions>
            </Dialog>
        </>);
    }
}
