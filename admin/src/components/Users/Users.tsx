import * as React from 'react';
import { Route, RouteComponentProps, Switch, withRouter } from 'react-router';
import { UserList } from './List';
import { compose } from 'recompose';
import { getUserForm } from './Form';
import { FormAction } from '../Form';

@compose(withRouter)
export class Users extends React.Component<{} & RouteComponentProps> {
    render () {
        const { match } = this.props;

        return (
            <div>
                <Switch>
                    <Route path={ `${ match.url }/create` }
                           children={ ({ match }) => (getUserForm(FormAction.Add)) }/>
                    <Route path={ `${ match.url }/edit/:id` }
                           children={ ({ match }) => (getUserForm(FormAction.Edit, match.params.id)) }/>
                    <Route path={ `${ match.url }/:id` }
                           children={ ({ match }) => (getUserForm(FormAction.Read, match.params.id)) }/>
                    <Route path={ `${ match.url }/` } component={ UserList }/>
                </Switch>
            </div>
        );
    }
}
