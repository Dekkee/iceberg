import * as React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { compose } from 'recompose';
import { Link } from 'react-router-dom';
import { WithStyles } from '../../../../common/utils/styles/WithStyles';
import { modules } from '../../modules';

interface Props {
    onLogout: Function;
}

const MenuLink = (linkTo: string) => (props) => (<Link to={ linkTo } { ...props } />);

@compose(withStyles({
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    },
}))
export class Menu extends React.Component<Props & WithStyles> {
    onLogout() {
        this.props.onLogout();
    }

    render () {
        const { classes } = this.props;

        return (
            <div className={ classes.root }>
                <AppBar position="sticky">
                    <Toolbar>
                        {
                            modules.map((m, i) => <Button color="inherit" aria-label={m.label} key={i}
                                                          component={ MenuLink(`/${m.name}`) }>{m.label}</Button>)
                        }
                        <Button color="inherit" aria-label="News">Новости</Button>
                        <Button color="inherit" aria-label="Crew">Состав</Button>
                        <Button color="inherit" aria-label="Champs">Турниры</Button>
                        <Button color="inherit" aria-label="Stats">Статистика</Button>
                        <Typography variant="h6" color="inherit" className={ classes.grow }/>
                        <Button color="inherit">Вступить в комманду</Button>
                        <Button color="inherit" aria-label="Users"
                                onClick={this.onLogout.bind(this)}> Logout </Button>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}
