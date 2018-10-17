import * as React from 'react';
import Button from '@material-ui/core/Button';
import { Route, RouteComponentProps, Switch, withRouter } from 'react-router';
import { UserList } from './List';
import { AddUser } from './Add';
import { history } from '../../history';
import { compose } from 'recompose';

@compose(withRouter)
export class Users extends React.Component<{} & RouteComponentProps> {
    render () {
        const { match } = this.props;

        return (
            <div>
                <Button onClick={ () => history.push(`${match.url}/create`) }>Add</Button>
                    <Switch>
                        <Route path={`${match.url}/create`} component={ AddUser }/>
                        <Route path={`${match.url}/`} component={ UserList }/>
                    </Switch>
            </div>
        );
    }
}
