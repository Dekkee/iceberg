import * as React from 'react';
import { Route, RouteComponentProps, Switch, withRouter } from 'react-router';
import { UserList } from './List';
import { compose } from 'recompose';
import { UserForm } from './UserForm';
import { FormAction } from '../Form';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core';
import { WithStyles } from '../../../../common/styles/WithStyles';

const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
    },
});

@compose(withStyles(styles), withRouter)
export class Users extends React.Component<WithStyles & RouteComponentProps> {
    render () {
        const { match, classes } = this.props;

        return (
            <Paper className={ classes.root } elevation={ 1 }>
                <Switch>
                    <Route path={ `${ match.url }/create` }
                           children={ ({ match }) => <UserForm action={ FormAction.Add }/> }/>
                    <Route path={ `${ match.url }/:id/edit` }
                           children={ ({ match }) => <UserForm action={ FormAction.Edit } id={ match.params.id }/> }/>
                    <Route path={ `${ match.url }/:id` }
                           children={ ({ match }) => <UserForm action={ FormAction.Read } id={ match.params.id }/> }/>
                    <Route path={ `${ match.url }/` } component={ UserList }/>
                </Switch>
            </Paper>
        );
    }
}
