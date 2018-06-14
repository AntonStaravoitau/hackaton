import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import WeatherWidget from './WeatherWidget/WeatherWidget';
import * as CONSTANTS from '../Common/Constants/Lang';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Account from '@material-ui/icons/AccountCircle';
import Msg from '@material-ui/icons/Message';
import File from '@material-ui/icons/Description';
import Chart from '@material-ui/icons/InsertChart';
import { NavLink } from 'react-router-dom';

function TopAppBar(props) {
    const { classes } = props;

    return (
        <header className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <NavLink className={classes.logo} to="/App">
                    </NavLink>
                    <div className={classes.divider}/>
                    <WeatherWidget api="1327916c5e354bb0f0340bfdffdb8985" />
                    <div className={classes.divider}/>
                    <Typography variant="title" color="inherit" className={classes.flex}/>
                    <div className={classes.divider}/>
                    <IconButton className={classes.iconButton} color="inherit" aria-label={'1'}>
                        <Chart />
                    </IconButton>
                    <IconButton className={classes.iconButton} color="inherit" aria-label={'2'}>
                        <File />
                    </IconButton>
                    <IconButton className={classes.iconButton} color="inherit" aria-label={'3'}>
                        <Msg />
                    </IconButton>
                    <div className={classes.divider}/>
                    <IconButton className={classes.iconButton} color="inherit" aria-label={CONSTANTS.ACCOUNT} onClick={() => {
                        localStorage.clear();
                        props.history.push('/Auth')
                    }}>
                        <Account />
                    </IconButton>
                    <div className={classes.divider}/>
                    <IconButton className={classes.menuButton} color="inherit" aria-label={CONSTANTS.MENU}>
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
        </header>
    );
}

const styles = {
    root: {
        flexGrow: 1,
    },
    flex: {
        flex: 1,
    },
    logo: {
        height: 64,
        width: 120,
        marginRight: 24,
    },
    logoImage: {
        width: 120,
        height: 16,
        marginTop: 24,
    },
    menuButton: {
        marginRight: -12,
    },
    iconButton: {
    },
    divider: {
        width: 1,
        height: 64,
        marginRight: 10,
        marginLeft: 10,
        backgroundColor: "#376eaf",
    }
};

TopAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TopAppBar);