import * as React from 'react';
import { WithStyles } from '../../../../common/utils/styles/WithStyles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { compose } from 'recompose';
import { withStyles } from '@material-ui/core';

interface Props {
    inProgress: boolean;
}

const styles = theme => ({
    progress: {
        margin: theme.spacing.unit * 2,
    },
});

@compose(withStyles(styles))
export class ProgressOverlay extends React.Component<Props & WithStyles> {
    constructor (props) {
        super(props);
    }

    render () {
        const { classes, inProgress, children } = this.props;
        return (
            inProgress
                ? <CircularProgress className={ classes.progress }/>
                : <>{ children }</>
        );
    }
}
