import * as React from 'react';
import * as cn from 'classnames';
import ReactSelect from 'react-select';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import MenuItem from '@material-ui/core/MenuItem';
import CancelIcon from '@material-ui/icons/Cancel';
import { emphasize } from '@material-ui/core/styles/colorManipulator';
import { WithStyles, WithTheme } from '../../../../common/utils/styles/WithStyles';
import { compose } from 'recompose';
import { AlignItemsProperty, DisplayProperty, FlexWrapProperty, OverflowProperty, PositionProperty } from 'csstype';
import { ValueType } from 'react-select/lib/types';

const styles = theme => ({
    root: {
        flexGrow: 1,
        height: 250,
    },
    input: {
        display: 'flex' as DisplayProperty,
        padding: 0,
    },
    valueContainer: {
        display: 'flex' as DisplayProperty,
        flexWrap: 'wrap' as FlexWrapProperty,
        flex: 1,
        alignItems: 'center' as AlignItemsProperty,
        overflow: 'hidden' as OverflowProperty,
    },
    chip: {
        margin: `${ theme.spacing.unit / 2 }px ${ theme.spacing.unit / 4 }px`,
    },
    chipFocused: {
        backgroundColor: emphasize(
            theme.palette.type === 'light' ? theme.palette.grey[ 300 ] : theme.palette.grey[ 700 ],
            0.08,
        ),
    },
    noOptionsMessage: {
        padding: `${ theme.spacing.unit }px ${ theme.spacing.unit * 2 }px`,
    },
    singleValue: {
        fontSize: 16,
    },
    placeholder: {
        position: 'absolute' as PositionProperty,
        left: 2,
        fontSize: 16,
    },
    paper: {
        position: 'absolute' as PositionProperty,
        zIndex: 1,
        marginTop: theme.spacing.unit,
        left: 0,
        right: 0,
    },
    divider: {
        height: theme.spacing.unit * 2,
    },
});

function NoOptionsMessage (props) {
    return (
        <Typography
            color="textSecondary"
            className={ props.selectProps.classes.noOptionsMessage }
            { ...props.innerProps }
        >
            { props.children }
        </Typography>
    );
}

function inputComponent ({ inputRef, ...props }) {
    return <div ref={ inputRef } { ...props } />;
}

function Control (props) {
    return (
        <TextField
            fullWidth
            InputProps={ {
                inputComponent,
                inputProps: {
                    className: props.selectProps.classes.input,
                    inputRef: props.innerRef,
                    children: props.children,
                    ...props.innerProps,
                },
            } }
            { ...props.selectProps.textFieldProps }
        />
    );
}

function Option (props) {
    return (
        <MenuItem
            buttonRef={ props.innerRef }
            selected={ props.isFocused }
            component="div"
            style={ {
                fontWeight: props.isSelected ? 500 : 400,
            } }
            { ...props.innerProps }
        >
            { props.children }
        </MenuItem>
    );
}

function Placeholder (props) {
    return (
        <Typography
            color="textSecondary"
            className={ props.selectProps.classes.placeholder }
            { ...props.innerProps }
        >
            { props.children }
        </Typography>
    );
}

function SingleValue (props) {
    return (
        <Typography className={ props.selectProps.classes.singleValue } { ...props.innerProps }>
            { props.children }
        </Typography>
    );
}

function ValueContainer (props) {
    return <div className={ props.selectProps.classes.valueContainer }>{ props.children }</div>;
}

function MultiValue (props) {
    return (
        <Chip
            tabIndex={ -1 }
            label={ props.children }
            className={ cn(props.selectProps.classes.chip, {
                [ props.selectProps.classes.chipFocused ]: props.isFocused,
            }) }
            onDelete={ props.removeProps.onClick }
            deleteIcon={ <CancelIcon { ...props.removeProps } /> }
        />
    );
}

function Menu (props) {
    return (
        <Paper square className={ props.selectProps.classes.paper } { ...props.innerProps }>
            { props.children }
        </Paper>
    );
}

const components = {
    Control,
    Menu,
    MultiValue,
    NoOptionsMessage,
    Option,
    Placeholder,
    SingleValue,
    ValueContainer,
};

export type Option<T> = { label: string; value: T };
export type SelectOption<T> = ValueType<Option<T>>;

export interface Props<T> {
    label?: string;
    multi?: boolean;
    disabled?: boolean;
    clearable?: boolean;
    placeholder?: string;
    loadOptions?: (input: string) => Option<T>[];
    options?: Option<T>[];
    onChange?: (value: SelectOption<T>) => void;
    value?: SelectOption<T>;
}

@compose(withStyles(styles, { withTheme: true }))
export class Select<T> extends React.Component<Props<T> & WithStyles & WithTheme> {
    constructor (props) {
        super(props);
    }


    handleChange (value: SelectOption<T>) {
        this.props.onChange(value);
    };

    render () {
        const { classes, theme, multi = false, placeholder = '', options, label, value, disabled = false, clearable = false } = this.props;

        // HACK
        const props: any = {
            classes,
            textFieldProps: {
                label,
                InputLabelProps: {
                    shrink: true,
                },
            }
        };

        const selectStyles = {
            input: base => ({
                ...base,
                color: theme.palette.text.primary,
                '& input': {
                    font: 'inherit',
                },
            }),
        };

        return (
            <ReactSelect
                styles={ selectStyles }
                options={ options }
                cacheOptions
                defaultOptions
                components={ components }
                value={ value }
                onChange={ this.handleChange.bind(this) }
                placeholder={ placeholder }
                isClearable={ clearable }
                isMulti={ multi }
                isDisabled={ disabled }
                { ...props }
            />
        );
    }
}
