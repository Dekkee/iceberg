import * as React from 'react';
import { compose } from 'recompose';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core';
import { WithStyles } from '../../../../../common/utils/styles/WithStyles';
import { State as StateProps } from '../reducers';
import { selector } from '../selectors';
import { actions } from '../actions';
import { Action } from 'redux';
import { connect } from '../../../../../common/utils/connect';
import Typography from '@material-ui/core/Typography';
import { ProgressOverlay } from '../../../components/ProgessOverlay';

type Props = DispatchProps & Partial<StateProps>;

interface DispatchProps {
    getAbout?: () => Action;
}

const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
    },
});

const mapStateToProps = (state): Partial<StateProps> => selector(state);

const mapDispatchToProps: DispatchProps = {
    getAbout: actions.get.init,
};


@connect(mapStateToProps, mapDispatchToProps)
@compose(withStyles(styles))
export class Contacts extends React.Component<Props & WithStyles> {
    componentDidMount (): void {
        this.props.getAbout();
    }

    render () {
        const { classes, isFetching } = this.props;

        return (
            <Paper className={classes.root} elevation={1}>
                <Typography variant="h5" component="h3">
                    Контакты
                </Typography>
                <ProgressOverlay inProgress={isFetching}>
                    {this.props.entity ? this.props.entity.content : ''}
                </ProgressOverlay>
            </Paper>
        );
    }
}
