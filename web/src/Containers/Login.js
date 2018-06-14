import React from 'react';
import commonLogin from '../Common/HOCs/login';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import * as CONSTANTS from '../Common/Constants/Lang';
import TextFieldRounded from '../Components/Forms/TextFieldRounded';
import ButtonRounded from '../Components/Forms/ButtonRounded';
import Grid from 'material-ui/Grid';
import Colors from '../Common/Themes/Colors';

const Login = (props) => {
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
                            <div className={classes.logo}>
                            </div>
                            <h2 className={classes.formTitle}>{CONSTANTS.WELCOME_TO}</h2>
                        </Grid>
                        <Grid item xs={12}>
                            <TextFieldRounded
                                disabled={props.fetching}
                                value={props.data.username}
                                onChange={(event) => props.handleChange('username', event.target.value)}
                                label={CONSTANTS.USERNAME}
                                error={!!props.data.invalidUserName}
                                errorText={props.data.invalidUserName}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextFieldRounded
                                disabled={props.fetching}
                                value={props.data.password}
                                type="password"
                                onChange={(event) => props.handleChange('password', event.target.value)}
                                label={CONSTANTS.PASSWORD}
                                error={!!props.data.invalidPassword}
                                errorText={props.data.invalidPassword}
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
        backgroundColor: Colors.brandBackground,
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
    logo: {
        width: 64,
        height: 64,
        backgroundColor: Colors.brandPrimary,
        borderRadius: 4,
        position: 'absolute',
        top: -32,
        left: '50%',
        marginLeft: -32,
    },
    logoImage: {
        display: 'block',
        width: 48,
        height: 17,
        margin: '24px auto 0',
    },
});

const newLogin = commonLogin(Login);

newLogin.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(newLogin);