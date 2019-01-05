import * as React from 'react';
import { Menu } from './layout/Menu';
import { Route, Switch, withRouter } from 'react-router';
import { Users } from './components/Users';
import { authSelector, tokenSelector } from './selectors/auth';
import { actions } from './actions/auth';
import { connect } from '../../common/utils/connect';
import { Action } from 'redux';
import TextField from '@material-ui/core/TextField/TextField';
import { withStyles } from '@material-ui/core/styles';
import { compose } from 'recompose';
import { ChangeEvent } from 'react';
import Button from '@material-ui/core/Button/Button';

import './App.scss';
import { AuthState, TokenState } from './reducers/auth';

interface State {
    email: string;
    password: string;
}

type StateProps = Partial<AuthState> & TokenState;

type Props = StateProps & DispatchProps & { classes?: any };

interface DispatchProps {
    login?: (email: string, password: string) => Action;
    refresh?: (token: string) => Action;
    logout?: () => Action;
}

const mapStateToProps = (state): StateProps => ({ ...authSelector(state), ...tokenSelector(state) });

const mapDispatchToProps: DispatchProps = {
    login: actions.auth.init,
    refresh: actions.refresh.init,
    logout: actions.logout,
};

@compose(withStyles(theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
    dense: {
        marginTop: 19,
    },
    menu: {
        width: 200,
    },
    button: {
        margin: theme.spacing.unit,
    },
})))
@compose(withRouter)
@connect(mapStateToProps, mapDispatchToProps)
export class App extends React.Component<Props, State> {
    constructor (props: Props) {
        super(props);

        const { isAuthenticated, token, refresh } = props;
        if (!isAuthenticated && !!token) {
            refresh(token);
        }

        this.state = {
            email: '',
            password: '',
        };
    }

    handleChange = (key: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            ...this.state,
            [ key ]: event.target.value
        });
    };

    handleLogin () {
        const { email, password } = this.state;
        this.props.login(email, password);
    };

    handleLogout () {
        this.props.logout();
    };

    render () {
        const { isAuthenticated, classes } = this.props;
        const { email, password } = this.state;

        return (
            <div>
                {
                    isAuthenticated
                        ? (
                            <div>
                                <Menu onLogout={ this.handleLogout.bind(this) }/>
                                <div className="content">
                                    <Switch>
                                        <Route path="/admin/users" component={ Users }/>
                                    </Switch>
                                </div>
                            </div>
                        )
                        : <form action="/api/admin/login" method="POST">
                            <TextField id="standard-name"
                                       label="Email"
                                       className={ classes.textField }
                                       value={ email }
                                       onChange={ this.handleChange('email') }
                                       margin="normal"
                                       name="email"/>
                            <TextField id="password-input"
                                       label="Password"
                                       className={ classes.textField }
                                       value={ password }
                                       onChange={ this.handleChange('password') }
                                       type="password"
                                       autoComplete="current-password"
                                       margin="normal"
                                       name="password"/>
                            <Button variant="contained"
                                    className={ classes.button }
                                    type="button"
                                    onClick={ this.handleLogin.bind(this) }>
                                Login
                            </Button>
                        </form>
                }
            </div>
        );
    }
}
