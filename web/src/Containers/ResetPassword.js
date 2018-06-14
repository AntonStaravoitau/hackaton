import React from "react";
import commonResetpassword from '../Common/HOCs/resetPassword'
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import * as CONSTANTS from '../Common/Constants/Lang';
import TextFieldRounded from '../Components/Forms/TextFieldRounded';
import ButtonRounded from '../Components/Forms/ButtonRounded';
import Grid from 'material-ui/Grid';
import Colors from '../Common/Themes/Colors';

const ResetPassword = (props) => {
    const { classes } = props;

    return (
        <div className={classes.mainContainer}>
            <Grid
                className={classes.root}
                container
                direction="column"
                justify="center"
                alignItems="center"
                alignContent="center"
                spacing={16}
            >
                <Grid item>
                    <Grid
                        container
                        className={classes.formContainer}
                    >
                        <Grid item xs={12}>
                            <h2 className={classes.formTitle}>{CONSTANTS.CHANGE_PASSWORD}</h2>
                        </Grid>
                        <Grid item xs={12}>
                            <TextFieldRounded
                                disabled={props.fetching}
                                value={props.data.oldPassword}
                                onChange={(event) => props.handleChange('oldPassword', event.target.value)}
                                label={CONSTANTS.OLD_PASSWORD}
                                type="password"
                                error={!!props.data.invalidOldPassword}
                                errorText={props.data.invalidOldPassword}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextFieldRounded
                                disabled={props.fetching}
                                value={props.data.newPassword}
                                type="password"
                                onChange={(event) => props.handleChange('newPassword', event.target.value)}
                                label={CONSTANTS.NEW_PASSWORD}
                                error={!!props.data.invalidNewPassword}
                                errorText={props.data.invalidNewPassword}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextFieldRounded
                                disabled={props.fetching}
                                value={props.data.retypePassword}
                                type="password"
                                onChange={(event) => props.handleChange('retypePassword', event.target.value)}
                                label={CONSTANTS.REPEAT_PASSWORD}
                                error={!!props.data.invalidRetypePassword}
                                errorText={props.data.invalidRetypePassword}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <ButtonRounded
                                disabled={!props.data.enableButton || props.fetching}
                                fetching={props.fetching}
                                onPress={props.submitForm}
                                btnText={CONSTANTS.LOGIN}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
};

const styles = theme => ({
    margin: {
        margin: theme.spacing.unit,
    },
    mainContainer: {
        height: '100vh',
        overflow: 'hidden',
    },
    root: {
        flexGrow: 1,
        minHeight: '100%',
    },
    formContainer: {
        maxWidth: 480,
        minWidth: 320,
        minHeight: 360,
        backgroundColor: 'white',
        marginTop: -150,
        padding: 50,
        borderColor: Colors.brandBorder,
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: 5,
        position: 'relative',
    },
    formTitle: {
        fontSize: 24,
        fontWeight: 400,
        marginTop: 0,
        textAlign: 'center',
    },
});

const newResetPassword = commonResetpassword(ResetPassword);

newResetPassword.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(newResetPassword);
