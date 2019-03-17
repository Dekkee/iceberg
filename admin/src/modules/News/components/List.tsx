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
import { RouteComponentProps, withRouter } from 'react-router';
import { history } from '../../../../../common/history';
import { compose } from 'recompose';
import { withStyles } from '@material-ui/core';
import { WithStyles } from '../../../../../common/utils/styles/WithStyles';
import { ProgressOverlay } from '../../../components/ProgessOverlay';
import { State as StateProps } from '../reducers';
import { NewsExtended } from '../../../../../common/contracts/News';

interface DispatchProps {
    loadNews?: () => Action;
    deleteNews?: (id: string) => Action;
}

interface State {
    isDeletePrompted: boolean;
    activeArticle?: NewsExtended;
}

type Props = StateProps & DispatchProps;

const mapStateToProps = (state): StateProps => selector(state);

const mapDispatchToProps: DispatchProps = {
    loadNews: actions.list.init,
    deleteNews: actions.remove.init,
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
        this.props.loadNews();
    }

    onArticleClicked (user: NewsExtended) {
        const { match } = this.props;
        history.push(`${ match.url }/${ user.id }`);
    }

    onEditArticleClicked (user: NewsExtended) {
        const { match } = this.props;
        history.push(`${ match.url }/${ user.id }/edit`);
    }

    onDeleteArticleClicked (user: NewsExtended) {
        this.setState({ ...this.state, isDeletePrompted: true, activeArticle: user });
    }

    onConfirmDelete () {
        const { deleteNews, loadNews } = this.props;
        const { activeArticle } = this.state;
        deleteNews(activeArticle.id);
        loadNews();
        this.setState({ ...this.state, isDeletePrompted: false, activeArticle: undefined });
    }

    onDeclineDelete () {
        this.setState({ ...this.state, isDeletePrompted: false, activeArticle: undefined });
    }

    render () {
        const { list, match, classes, isFetching } = this.props;
        const { isDeletePrompted } = this.state;

        return (<>
            <Typography className={ classes.header } variant="h5" component="h3">
                Новости
                <Button onClick={ () => history.push(`${ match.url }/create`) }
                        variant="contained"
                        size="small">
                    <AddIcon/>Добавить
                </Button>
            </Typography>

            <ProgressOverlay inProgress={ isFetching }>
                <List>
                    { list && list.map((article, i) =>
                        <ListItem key={ i } button
                                  onClick={ () => this.onArticleClicked(article) }>
                            { article.title }
                            <ListItemSecondaryAction>
                                <IconButton aria-label="Edit"
                                            onClick={ () => this.onEditArticleClicked(article) }>
                                    <EditIcon/>
                                </IconButton>
                                <IconButton aria-label="Delete"
                                            onClick={ () => this.onDeleteArticleClicked(article) }>
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
