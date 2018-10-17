import * as React from 'react';
import { Menu } from './layout/Menu';
import { Route, Switch } from 'react-router';
import { Users } from './components/Users';
import { authSelector } from './selectors/auth';
import { actions } from './actions/auth';
import { connect } from '../../common/utils/connect';
import { Action } from 'redux';
import TextField from '@material-ui/core/TextField/TextField';
import { withStyles } from '@material-ui/core/styles';
import { compose } from 'recompose';
import { ChangeEvent } from 'react';
import Button from '@material-ui/core/Button/Button';

import './App.scss';

interface State {
    email: string;
    password: string;
}

type Props = StateProps & DispatchProps & { classes?: any };

interface StateProps {
    isAuthenticated?: boolean;
    user?: string;
}

interface DispatchProps {
    login?: (email: string, password: string) => Action;
}

const mapStateToProps = (state): StateProps => authSelector(state);

const mapDispatchToProps: DispatchProps = {
    login: actions.auth.init,
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
@connect(mapStateToProps, mapDispatchToProps)
export class App extends React.Component<Props, State> {
    constructor (props) {
        super(props);

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

    handleLogin() {
        const { email, password } = this.state;
        this.props.login(email, password);
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
                                <Menu/>
                                <Switch>
                                    <Route path="/admin/users" component={ Users }/>
                                </Switch>
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
