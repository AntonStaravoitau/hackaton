import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import InputAdornment from 'material-ui/Input/InputAdornment';
import DateRange from '@material-ui/icons/DateRange';
import Colors from '../../Common/Themes/Colors';

const DatePicker = function({classes, error, errorText, defaultValue, type='date', onChange, disabled, label, id}) {
    return (
        <TextField
            className={classes.textFieldContainer}
            InputProps={{
                disableUnderline: true,
                startAdornment: <InputAdornment position="start"><DateRange style={{color: Colors.brandBorder}}/></InputAdornment>,
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
            type={type}
            onChange={onChange}
            label={label}
            defaultValue={defaultValue}
            error={error}
            helperText={errorText}
            disabled={disabled}
            fullWidth
        />
    )
};

const styles = theme => ({
    textFieldContainer: {
        flexDirection: 'row',
        margin: '12px 0 15px',
    },
    textFieldRoot: {
        height: 32,
        padding: '5px 12px',
        borderWidth: 1,
        borderColor: Colors.brandBorder,
        borderRadius: 4,
        borderStyle: 'solid',
    },
    textFieldInputFocused: {
        borderColor: Colors.brandSecondary,
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
    textFieldError: {
        marginTop: 6,
        marginBottom: 0,
        borderColor: Colors.brandDanger,
        '& + p': {
            margin: '4px 0 2px 0',
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

DatePicker.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DatePicker);
