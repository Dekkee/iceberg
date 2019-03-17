import * as React from 'react';
import { compose } from 'recompose';
import { Route, Switch, withRouter } from 'react-router-dom';
import { Menu } from './layout/Menu';

import { modules } from './modules';
import './App.scss';

@compose(withRouter)
export class App extends React.Component<{}> {
    render () {
        return (
            <div>
                <div className="title">
                    <h1>Любительская хоккейная команда</h1>
                    <h1>АЙСБЕРГ</h1>
                </div>
                <Menu onLogout={() => {}}/>
                <Switch>
                    {
                        modules.map((m, i) => <Route key={ i } path={ `/${ m.name }` }
                                                     component={ m.component }/>)
                    }
                </Switch>
            </div>
        );
    }
}
