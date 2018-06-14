import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import { InputAdornment } from 'material-ui/Input';
import Person from '@material-ui/icons/Person';
import Lock from '@material-ui/icons/Lock';
import Colors from '../../Common/Themes/Colors';

const TextFieldRounded = function ({classes, error, errorText, value, type='text', onChange, disabled, label}) {
    return (
        <TextField
            InputProps={{
                disableUnderline: true,
                classes: {
                    root: classes.roundedInputRoot,
                    input: classes.roundedInput,
                    error: classes.roundedInputError,
                },
                startAdornment: (
                    <InputAdornment className={classes.icon} position='start'>
                        {type === 'text'? <Person /> : <Lock />}
                    </InputAdornment>
                ),
            }}
            disabled={disabled}
            value={value}
            type={type}
            onChange={onChange}
            placeholder={label}
            error={error}
            helperText={errorText}
            fullWidth
        />
    )
};

const styles = theme => ({
    roundedInputRoot: {
        height: 32,
        width: 'calc(100% - 24px)',
        padding: '8px 12px',
        marginTop: 6,
        marginBottom: 18,
        borderWidth: 1,
        borderColor: Colors.brandBorder,
        borderRadius: 24,
        borderStyle: 'solid',
    },
    roundedInputError: {
        marginTop: 6,
        marginBottom: 0,
        borderColor: Colors.brandDanger,
        '& +p': {
            margin: '4px 0 2px 0',
            paddingLeft: 16,
        }
    },
    roundedInput: {
        height: 32,
        margin: 0,
        padding: '0 8px',
        borderLeftWidth: 1,
        borderLeftColor: Colors.brandBorder,
        borderLeftStyle: 'solid',
    },
    icon: {
        color: Colors.brandPrimary,
    },
});

TextFieldRounded.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TextFieldRounded);