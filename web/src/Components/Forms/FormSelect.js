import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import InputLabel from 'material-ui/Input/InputLabel';
import MenuItem from 'material-ui/Menu/MenuItem';
import FormControl from 'material-ui/Form/FormControl';
import Select from 'material-ui/Select';
import Colors from '../../Common/Themes/Colors';

const FormControlSelect = ({
    classes,
    name,
    id,
    selectOptions,
    placeholder,
    value,
    onChange,
    multiple,
    required,
    ...otherProps,
}) => {
    return (
        <FormControl className={classes.formControl}>
            <InputLabel
                shrink
                FormLabelClasses = {{
                    root: classes.formSelectLabel,
                    focused: classes.formSelectLabelFocused,
                    error: classes.formSelectLabelError,
                }}
                htmlFor={id}
                required={required}
            >
                {name}
            </InputLabel>
            <Select
                value={value}
                onChange={onChange}
                name={name}
                id={id}
                multiple={multiple}
                disableUnderline
                fullWidth
                classes= {{
                    root: classes.formSelect,
                    select: classes.formSelectInput,
                    selectMenu: classes.formSelectMenu,
                }}
                {...otherProps}
            >
                {selectOptions.map(item => (
                    <MenuItem
                        key={item.id}
                        value={item.id}
                        className={classes.formSelectOption}
                    >
                        {item.name}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    )
};

const styles = theme => ({
    formControl: {
        width: '100%',
        flexDirection: 'row',
        margin: '12px 0 15px',
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
    formSelect: {
        height: 42,
        borderWidth: 1,
        borderColor: Colors.brandBorder,
        borderRadius: 4,
        borderStyle: 'solid',
        '&: focus': {
            borderColor: Colors.brandSecondary,
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
        }
    },
    formSelectInput: {
        height: 32,
        padding: '5px 12px',
    },
    formSelectFocused: {
        backgroundColor: 'transparent', //!TODO: need to find how implement this style
    },
    formSelectMenu: {
        backgroundColor: 'transparent!important',
        lineHeight: '32px',
    },
    formSelectOption: {},
});

FormControlSelect.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FormControlSelect);
