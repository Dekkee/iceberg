import * as React from 'react';
import { connect } from '../../../../../common/utils/connect';
import { actions } from '../actions';
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
import { selector } from '../selectors';
import { StatExtended } from '../../../../../common/contracts/Stat';
import { RouteComponentProps, withRouter } from 'react-router';
import { history } from '../../../../../common/history';
import { compose } from 'recompose';
import { withStyles } from '@material-ui/core';
import { WithStyles } from '../../../../../common/utils/styles/WithStyles';
import { ProgressOverlay } from '../../../components/ProgessOverlay';
import { State as StateProps } from '../reducers';

interface DispatchProps {
    loadUsers?: () => Action;
    deleteUser?: (id: string) => Action;
}

interface State {
    isDeletePrompted: boolean;
    activeStat?: StatExtended;
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
export class ChampList extends React.Component<Props & RouteComponentProps & WithStyles, State> {
    constructor (props) {
        super(props);

        this.state = {
            isDeletePrompted: false,
        };
    }

    componentDidMount () {
        this.props.loadUsers();
    }

    onUserClicked (stat: StatExtended) {
        const { match } = this.props;
        history.push(`${ match.url }/${ stat.id }`);
    }

    onEditUserClicked (stat: StatExtended) {
        const { match } = this.props;
        history.push(`${ match.url }/${ stat.id }/edit`);
    }

    onDeleteUserClicked (user: StatExtended) {
        this.setState({ ...this.state, isDeletePrompted: true, activeStat: user });
    }

    onConfirmDelete () {
        const { deleteUser, loadUsers } = this.props;
        const { activeStat } = this.state;
        deleteUser(activeStat.id);
        loadUsers();
        this.setState({ ...this.state, isDeletePrompted: false, activeStat: undefined });
    }

    onDeclineDelete () {
        this.setState({ ...this.state, isDeletePrompted: false, activeStat: undefined });
    }

    render () {
        const { list, match, classes, isFetching } = this.props;
        const { isDeletePrompted } = this.state;
        return (<>
            <Typography className={ classes.header } variant="h5" component="h3">
                Сатистика
                <Button onClick={ () => history.push(`${ match.url }/create`) }
                        variant="contained"
                        size="small">
                    <AddIcon/>Добавить
                </Button>
            </Typography>

            <ProgressOverlay inProgress={ isFetching }>
                <List>
                    { list && list.map((stat, i) =>
                        <ListItem key={ i } button
                                  onClick={ () => this.onUserClicked(stat) }>
                            { i + 1 } | { stat.rating } | { stat.player.displayName }
                            <ListItemSecondaryAction>
                                <IconButton aria-label="Edit"
                                            onClick={ () => this.onEditUserClicked(stat) }>
                                    <EditIcon/>
                                </IconButton>
                                <IconButton aria-label="Delete"
                                            onClick={ () => this.onDeleteUserClicked(stat) }>
                                    <DeleteIcon/>
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>) }
                </List>
            </ProgressOverlay>

            <Dialog open={ isDeletePrompted }>
                <DialogContent>Вы точно хотите удалить?</DialogContent>
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
