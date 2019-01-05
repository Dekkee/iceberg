import * as React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { compose } from "recompose";
import { WithStyles } from '../../../../common/styles/WithStyles';

interface Props {
}

const styles = {
    root: {
        display: 'flex',
        padding: 24,
        paddingTop: 48,
    },
    card: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
};

@compose(withStyles(styles))
export class Content extends React.Component<Props & WithStyles> {
    render () {
        const { classes } = this.props;

        return (
            <div className={ classes.root }>
                <Card className={ classes.card }>
                    <CardContent>
                        <Typography color="textSecondary" className={ classes.title } gutterBottom>
                            Чет важное
                        </Typography>
                        <Typography className={ classes.pos } component="p">
                            Прям пипец важное
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small">Узнать что же такое важное</Button>
                    </CardActions>
                </Card>
            </div>
        )
    }
}
