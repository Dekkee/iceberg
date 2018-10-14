import * as React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { compose } from "recompose";

interface Props {
    classes?: any;
}

@compose(withStyles({
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    },
}))
export class Menu extends React.Component<Props> {
    render() {
        const { classes } = this.props;

        return (
            <div className={ classes.root }>
                <AppBar position="sticky">
                    <Toolbar>
                        <Button color="inherit" aria-label="News">Новости</Button>
                        <Button color="inherit" aria-label="Crew">Состав</Button>
                        <Button color="inherit" aria-label="Champs">Турниры</Button>
                        <Button color="inherit" aria-label="Stats">Статистика</Button>
                        <Button color="inherit" aria-label="About">О команде</Button>
                        <Button color="inherit" aria-label="Contacts">Контакты</Button>
                        <Typography variant="h6" color="inherit" className={ classes.grow }/>
                        <Button color="inherit">Вступить в комманду</Button>
                        <Button color="inherit">Вход</Button>
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}
