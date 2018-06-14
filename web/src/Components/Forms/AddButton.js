import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Icon from 'material-ui/Icon';
import Colors from '../../Common/Themes/Colors';

function AddButton(props) {
    const {classes, onPress} = props;

    return (
        <Button
            className={classes.addButton}
            onClick={onPress}
        >
            <Icon className={classes.addButtonIcon}>
                add_circle
            </Icon>
        </Button>
    )
}

const styles = theme => ({
    addButton: {
        minWidth: 44,
        padding: 8,
        borderWidth: 1,
        borderColor: Colors.brandSecondary,
        borderStyle: 'solid',
        borderRadius: 8,
        backgroundColor: Colors.brandSecondaryLight,
        '&:hover': {
            backgroundColor: Colors.brandBgContent,
        },
    },
    addButtonIcon: {
        color: Colors.brandSuccess,
    },
});

AddButton.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddButton);
