import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import * as CONSTANTS from '../../Common/Constants/Lang';
import TextField from 'material-ui/TextField';
import Colors from '../../Common/Themes/Colors';

const FormControlInput = function({
    classes,
    error,
    errorText=`${CONSTANTS.FIELD_REQUIRED}`,
    value,
    type='text',
    onChange,
    disabled,
    required,
    label,
    id,
    ...otherProps,
}) {
    return (
        <TextField
            {...otherProps}
            className={classes.textFieldContainer}
            InputProps={{
                disableUnderline: true,
                classes: {
                    root: classes.textFieldRoot,
                    input: classes.textFieldInput,
                    focused: classes.textFieldInputFocused,
                    error: classes.textFieldError,
                },
            }}
            InputLabelProps={{
                shrink: true,
                FormLabelClasses: {
                    root: classes.textFieldLabel,
                    focused: classes.textFieldLabelFocused,
                }
            }}
            id={id}
            value={value}
            type={type}
            onChange={onChange}
            label={label}
            placeholder={label}
            required={required}
            error={error}
            helperText={error && errorText}
            disabled={disabled}
            fullWidth
        />
    )
};

const styles = theme => ({
    textFieldContainer: {
        margin: '12px 0 15px',
        flexDirection: 'row',
    },
    textFieldRoot: {
        height: 32,
        padding: '5px 12px',
        borderWidth: 1,
        borderColor: Colors.brandBorder,
        borderRadius: 4,
        borderStyle: 'solid',
        '& + p': {
            display: 'none',
        }
    },
    textFieldInputFocused: {
        borderColor: Colors.brandSecondary,
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
    textFieldError: {
        borderColor: Colors.brandDanger,
        '& + p': {
            display: 'block',
            height: 16,
            margin: 0,
            position: 'absolute',
            bottom: -18,
            left: 2,
            fontSize: 13,
        }
    },
    textFieldLabel: {
        color: Colors.labelTitle,
        fontSize: 13,
    },
    textFieldLabelFocused: {
        color: '#3F536E', //@TODO: MUI theme have priority, need to change
    },
    textFieldInput: {
        height: 32,
        margin: 0,
        padding: 0,
        fontSize: 15,
        color: Colors.inputText,
    },
});

FormControlInput.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FormControlInput);
