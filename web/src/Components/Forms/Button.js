import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import * as CONSTANTS from '../../Common/Constants/Lang';
import Button from 'material-ui/Button';
import { CircularProgress } from 'material-ui/Progress';
import Icon from 'material-ui/Icon';
import Colors from '../../Common/Themes/Colors';

function ButtonStyled(props) {
    const {
        classes,
        disabled,
        onPress,
        fetching,
        btnText=`${CONSTANTS.SUBMIT}`,
        className='buttonStyled', //or buttonSuccess
        color='primary',
        iconName,
        iconClass='noIcon', //leftIcon or rightIcon
    } = props;

    return (
        <Button
            disabled={disabled}
            onClick={onPress}
            variant="raised"
            size="large"
            color={color}
            className={classes[`${className}`]}
        >
            {fetching ? (<CircularProgress color='primary' size={24} thickness={8} />) :
                (
                    <span>
                        <Icon className={classes[`${iconClass}`]}>{iconName}</Icon>
                        {btnText}
                    </span>
                )
            }
        </Button>
    )
}

const styles = theme => ({
    buttonStyled: {
        backgroundColor: Colors.brandInfo,
        lineHeight: '24px',
    },
    buttonSuccess: {
        backgroundColor: Colors.brandSuccess,
        lineHeight: '24px',
    },
    buttonDanger: {
        backgroundColor: Colors.brandDanger,
        lineHeight: '24px',
        alignSelf: 'right',
        marginLeft: 10,
    },
    buttonWarning: {
        backgroundColor: Colors.brandWarning,
        lineHeight: '24px',
    },
    leftIcon: {
        marginRight: theme.spacing.unit,
        marginLeft: -(theme.spacing.unit * 2),
        fontSize: 24,
        verticalAlign: 'middle',
        float: 'left',
    },
    rightIcon: {
        marginLeft: theme.spacing.unit,
        marginRight: -(theme.spacing.unit * 2),
        fontSize: 24,
        verticalAlign: 'middle',
        float: 'right',
    },
    noIcon: {
        display: 'none',
    },
});

ButtonStyled.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonStyled);
