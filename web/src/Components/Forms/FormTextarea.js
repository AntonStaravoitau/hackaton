import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import Colors from '../../Common/Themes/Colors';

const FormTextarea = function({classes, error, errorText, value, type='text', onChange, disabled, label, id}) {
    return (
        <TextField
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
            error={error}
            rows={7}
            helperText={errorText}
            disabled={disabled}
            multiline
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
        padding: 0,
        margin: 0,
        borderWidth: 1,
        borderColor: Colors.brandBorder,
        borderRadius: 4,
        borderStyle: 'solid',
    },
    textFieldInput: {
        padding: '6px 12px',
        borderRadius: 4,
        fontSize: 15,
        color: Colors.inputText,
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
});

FormTextarea.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FormTextarea);
