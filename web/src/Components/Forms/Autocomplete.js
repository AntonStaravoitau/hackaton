import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import * as CONSTANTS from '../../Common/Constants/Lang';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/Menu/MenuItem';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import CancelIcon from '@material-ui/icons/Cancel';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ClearIcon from '@material-ui/icons/Clear';
import Chip from 'material-ui/Chip';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import Colors from '../../Common/Themes/Colors';

class Option extends React.Component {
    handleClick = event => {
        this.props.onSelect(this.props.option, event);
    };

    render() {
        const { children, isFocused, isSelected, onFocus } = this.props;

        return (
            <MenuItem
                onFocus={onFocus}
                selected={isFocused}
                onClick={this.handleClick}
                component="div"
                style={{
                    fontWeight: isSelected ? 500 : 400,
                }}
            >
                {children}
            </MenuItem>
        );
    }
}

function SelectWrapped(props) {
    const { classes, ...other } = props;

    return (
        <Select
            optionComponent={Option}
            noResultsText={<Typography>{CONSTANTS.NO_RESULTS_FOUND}</Typography>}
            arrowRenderer={arrowProps => {
                return arrowProps.isOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />;
            }}
            clearRenderer={() => <ClearIcon />}
            valueComponent={valueProps => {
                const { value, children, onRemove } = valueProps;

                const onDelete = event => {
                    event.preventDefault();
                    event.stopPropagation();
                    onRemove(value);
                };

                if (onRemove) {
                    return (
                        <Chip
                            tabIndex={-1}
                            label={children}
                            className={classes.chip}
                            deleteIcon={<CancelIcon onTouchEnd={onDelete} />}
                            onDelete={onDelete}
                        />
                    );
                }

                return <div className="Select-value">{children}</div>;
            }}
            {...other}
        />
    );
}

class Autocomplete extends React.Component {

    render() {
        const { classes,
            name,
            id,
            selectOptions,
            placeholder,
            value,
            onChange,
            multiple,
            required,
            ...otherProps,
        } = this.props;

        const suggestions = selectOptions.map(suggestion => ({
            value: suggestion.id,
            label: suggestion.name,
        }));

        return (
            <div className={classes.root}>
                <TextField
                    {...otherProps}
                    value={value}
                    onChange={onChange}
                    name={name}
                    id={id}
                    placeholder={placeholder}
                    label={name}
                    InputLabelProps={{
                        shrink: true,
                        required: required,
                        FormLabelClasses: {
                            root: classes.formSelectLabel,
                            focused: classes.formSelectLabelFocused,
                            error: classes.formSelectLabelError,
                        }
                    }}
                    InputProps={{
                        disableUnderline: true,
                        inputComponent: SelectWrapped,
                        inputProps: {
                            classes,
                            multi: multiple,
                            backspaceRemoves: multiple,
                            instanceId: 'react-select-chip-label',
                            id: 'react-select-chip-label',
                            simpleValue: true,
                            options: suggestions,
                        },
                    }}
                    fullWidth
                />
            </div>
        );
    }
}

const ITEM_HEIGHT = 48;

const styles = theme => ({
    root: {
        flexGrow: 1,
        margin: '12px 0 15px',
        maxHeight: 280,
    },
    chip: {
        margin: theme.spacing.unit / 4,
    },
    formSelectLabel: {
        color: Colors.labelTitle,
        fontSize: 13,
    },
    formSelectLabelFocused: {
        color: Colors.brandPrimary,
    },
    formSelectLabelError: {
        color: Colors.brandDanger,
    },
    // We had to use a lot of global selectors in order to style react-select.
    // We are waiting on https://github.com/JedWatson/react-select/issues/1679
    // to provide a much better implementation.
    // Also, we had to reset the default style injected by the library.
    '@global': {
        '.Select-control': {
            display: 'flex',
            alignItems: 'center',
            border: 0,
            height: 'auto',
            background: 'transparent',
            '&:hover': {
                boxShadow: 'none',
            },
        },
        '.Select-multi-value-wrapper': {
            flexGrow: 1,
            display: 'flex',
            flexWrap: 'wrap',
        },
        '.Select--multi, .Select': {
            minHeight: 42,
            padding: 0,
            margin: 0,
            backgroundColor: '#fff',
            borderWidth: 1,
            borderColor: Colors.brandBorder,
            borderRadius: 4,
            borderStyle: 'solid',
        },
        '.Select--multi .Select-input, .Select .Select-input': {
            margin: 0,
            padding: 0,
            minHeight: 34,
        },
        '.Select--multi .Select-control, .Select .Select-control': {
            padding: '3px 12px 3px 12px',
        },
        '.Select.has-value.is-clearable.Select--single > .Select-control .Select-value': {
            padding: '3px 12px 3px 12px',
            color: theme.palette.common.black,
        },
        '.Select-noresults': {
            padding: theme.spacing.unit * 2,
        },
        '.Select-input': {
            display: 'inline-flex!important',
            padding: 0,
            margin: 0,
            height: 'auto',
        },
        '.Select-input input': {
            background: 'transparent',
            border: 0,
            padding: 0,
            cursor: 'default',
            display: 'inline-block',
            fontFamily: 'inherit',
            fontSize: 'inherit',
            margin: 0,
            outline: 0,
        },
        '.Select .Select-placeholder, .Select .Select-value': {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            fontFamily: theme.typography.fontFamily,
            fontSize: theme.typography.pxToRem(15),
            padding: '3px 0 3px 12px',
            minHeight: 34,
        },
        '.Select-placeholder': {
            opacity: 0.42,
            color: Colors.inputText,
        },
        '.Select-menu-outer': {
            backgroundColor: theme.palette.background.paper,
            boxShadow: theme.shadows[2],
            position: 'absolute',
            left: 0,
            top: `calc(100% + 2px)`,
            width: '100%',
            zIndex: 2,
            maxHeight: ITEM_HEIGHT * 4.5,
        },
        '.Select.is-focused:not(.is-open) > .Select-control': {
            boxShadow: 'none',
        },
        '.Select-menu': {
            maxHeight: ITEM_HEIGHT * 4.5,
            overflowY: 'auto',
        },
        '.Select-menu div': {
            boxSizing: 'content-box',
        },
        '.Select-arrow-zone, .Select-clear-zone': {
            color: theme.palette.action.active,
            cursor: 'pointer',
            height: 21,
            width: 21,
            zIndex: 1,
        },
        '.Select .Select-clear-zone': {
            display: 'none',
        },
        // Only for screen readers. We can't use display none.
        '.Select-aria-only': {
            position: 'absolute',
            overflow: 'hidden',
            clip: 'rect(0 0 0 0)',
            height: 1,
            width: 1,
            margin: -1,
        },
    },
});

Autocomplete.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Autocomplete);
