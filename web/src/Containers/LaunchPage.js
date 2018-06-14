import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import * as CONSTANTS from '../Common/Constants/Lang';
import Grid from 'material-ui/Grid';
import IconButton from 'material-ui/IconButton';
import Add from '@material-ui/icons/AddCircle';
import Colors from "../Common/Themes/Colors";

export const MainApp = (props) => {
    const { classes, history } = props;

    return (
        <section className={classes.root}>
            {props.projects &&
                <div className={classes.gridRoot}>
                    <Grid container>
                        <Grid item xs={12}>
                            <header className={classes.pageHeader}>
                                <h1 className={classes.pageTitle}>{'cloud 9'}</h1>
                                <span className={classes.pageSubTitle}>({props.projects.length})</span>
                                {props.userRole < 5 &&
                                <IconButton
                                    className={classes.addButton}
                                    component='span'
                                    onClick={() => {
                                        history.push('/CreateProject')
                                    }}
                                >
                                    <Add className={classes.addButtonIcon}/>
                                </IconButton>
                                }
                            </header>
                        </Grid>
                    </Grid>
                </div>
            }
        </section>
    )
};

const styles = theme => ({
    root: {

    },
    gridRoot: {
        flex: 1,
        maxWidth: 1280,
        margin: 'auto',
    },
    pageHeader: {
        margin: '15px 0',
    },
    pageTitle: {
        fontSize: 17,
        fontWeight: 500,
        color: Colors.brandTitle,
        display: 'inline-block',
    },
    pageSubTitle: {
        marginTop: 2,
        marginBottom: 2,
        marginLeft: 5,
        color: Colors.brandSecondary,
    },
    addButtonIcon: {
        color: Colors.brandSuccess,
    },
    [theme.breakpoints.down('md')]: {
        gridRoot: {
            padding: theme.spacing.unit,
        },
    },
    [theme.breakpoints.down('xs')]: {
        pageHeader: {
            flexDirection: 'column',
            marginTop: 0,
            textAlign: 'center',
        },
    },
});

MainApp.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MainApp);
