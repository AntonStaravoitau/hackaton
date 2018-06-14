import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import * as CONSTANTS from '../../Common/Constants/Lang';
import Button from 'material-ui/Button';
import { CircularProgress } from 'material-ui/Progress';
import Colors from '../../Common/Themes/Colors';

function ButtonRounded(props) {
    const {classes, disabled, onPress, fetching, btnText=`${CONSTANTS.SUBMIT}`} = props;

    return (
        <Button
            disabled={disabled}
            onClick={onPress}
            variant="raised"
            size="large"
            color="primary"
            className={classes.buttonRounded}
            fullWidth
        >
            {fetching ? <CircularProgress color="primary" size={24} thickness={8} /> : <span>{btnText}</span>}
        </Button>
    )
}

const styles = theme => ({
    buttonRounded: {
        height: 48,
        marginTop: 15,
        borderRadius: 24,
        backgroundColor: Colors.brandPrimary,
        '&:hover, &:active': {
            backgroundColor: Colors.brandPrimary,
        },
    },
});

ButtonRounded.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonRounded);