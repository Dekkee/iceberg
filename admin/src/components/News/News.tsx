import * as React from 'react';
import { Route, RouteComponentProps, Switch, withRouter } from 'react-router';
import { UserList } from './List';
import { compose } from 'recompose';
import { Form } from './Form';
import { FormAction } from '../Form';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core';
import { WithStyles } from '../../../../common/utils/styles/WithStyles';

const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
    },
});

@compose(withStyles(styles), withRouter)
export class News extends React.Component<WithStyles & RouteComponentProps> {
    render () {
        const { match, classes } = this.props;

        return (
            <Paper className={ classes.root } elevation={ 1 }>
                <Switch>
                    <Route path={ `${ match.url }/create` }
                           children={ ({ match }) => <Form action={ FormAction.Add }/> }/>
                    <Route path={ `${ match.url }/:id/edit` }
                           children={ ({ match }) => <Form action={ FormAction.Edit } id={ match.params.id }/> }/>
                    <Route path={ `${ match.url }/:id` }
                           children={ ({ match }) => <Form action={ FormAction.Read } id={ match.params.id }/> }/>
                    <Route path={ `${ match.url }/` } component={ UserList }/>
                </Switch>
            </Paper>
        );
    }
}
