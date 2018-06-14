import React from 'react';
import {withStateHandlers, compose, lifecycle } from 'recompose';
import moment from 'moment';
import CircularProgress from 'material-ui/Progress/CircularProgress';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import partlyCloudyDay from './weather-icons/partly-cloudy-day.png';
import partlyCloudyNight from './weather-icons/partly-cloudy-night.png';
import clearDay from './weather-icons/clear-day.png';
import clearNight from './weather-icons/clear-night.png';
import rain from './weather-icons/rain.png';
import snow from './weather-icons/snow.png';
import sleet from './weather-icons/sleet.png';
import wind from './weather-icons/wind.png';
import fog from './weather-icons/fog.png';
import cloudy from './weather-icons/cloudy.png';
import hail from './weather-icons/hail.png';
import thunderstorm from './weather-icons/thunderstorm.png';
import tornado from './weather-icons/tornado.png';
import defaultWeather from './weather-icons/default.png';
import meteorShower from './weather-icons/meteor-shower.png';
import Colors from '../../Common/Themes/Colors';

const icons = {
    'partly-cloudy-day': partlyCloudyDay,
    'partly-cloudy-night': partlyCloudyNight,
    'clear-day': clearDay,
    'clear-night': clearNight,
    'meteor-shower': meteorShower,
    rain,
    snow,
    sleet,
    wind,
    fog,
    cloudy,
    hail,
    thunderstorm,
    tornado,
    default: defaultWeather,
};

const initialState = {
    isLoading: true,
    icon: 'default',
    temp: '',
    summary: 'Weather is Offline',
    showDetails: false,
    time: null,
    locationName: 'Current weather',
    windSpeed: null,
};

function componentWillMount() {
    document.addEventListener('click', (e) => handleClick(this.props, e), false);
}

function componentWillUnmount() {
    document.removeEventListener('click', (e) => handleClick(this.props, e), false);
}

let node = null;

const handleClick = ({ onSetState }, e) => {
    if(node && node.contains(e.target)) {
        return;
    }

    onSetState({ showDetails: false });
};

function componentDidMount() {
    const { onSetState, api, setIsLoading } = this.props;

    navigator.geolocation.getCurrentPosition( async position => {
        try {
            const response = await fetch(
                `https://api.darksky.net/forecast/${api}/${position.coords.latitude},${position.coords.longitude}?units=si`
            );
            const responseJSON = await response.json();
            const {currently, timezone} = responseJSON;
            onSetState({
                summary: currently.summary,
                temp: (Math.round(10 * currently.temperature) / 10),
                icon: currently.icon,
                isLoading: false,
                time: currently.time,
                windSpeed: currently.windSpeed,
                locationName: timezone.split('/')[1],
            });
        } catch(error) {
            console.error(error);
            setIsLoading(false);
        }
    })

}

const enhance = compose(
    withStateHandlers(
        initialState,
        {
            setIsLoading: () => isLoading => ({isLoading}),
            setIcon: () => icon => ({icon}),
            setTemp: () => temp => ({temp}),
            setSummary: () => summary => ({summary}),
            setLocationName: () => locationName => ({locationName}),
            onSetState: () => state => ({...state}),
            onToggleDetails: ({showDetails}) => () => ({showDetails: !showDetails}),
        }
    ),
    lifecycle({componentDidMount, componentWillMount, componentWillUnmount}),
);

const WeatherWidget = props => {
    const {
        isLoading, temp, icon, onToggleDetails,
        locationName, summary, showDetails, time,
        windSpeed, setRef,
    } = props;

    if (isLoading) {
        return (
            <CircularProgress style={styles.spinner} />
        )
    }

    const weatherDate = Date(time);
    const options = {weekday: 'long'};

    return (<div style={styles.container} ref={refNode => node = refNode}>
        <div onClick={onToggleDetails} style={styles.titleContainer}>
            <img src={icons[icon]} style={styles.icon} alt={summary}/>
            <div style={styles.temp}>{temp} <sup>&#8451;</sup></div>
        </div>
        { showDetails && <Paper style={styles.detailsContainer} elevation={3}>
            <div style={styles.arrowTop}/>
            <div style={styles.detailsHeader}>
                <Typography style={styles.detailsTitle} variant="headline" component="h3">
                    {locationName}
                </Typography>
                <Typography component="p" style={styles.detailsDate}>{moment(weatherDate).format('dddd HH:MM')}</Typography>
            </div>
            <div style={styles.detailsBody}>
                <div>
                    <div style={styles.detailsIconWrapper}>
                        <img src={icons[icon]} style={styles.detailsIcon} alt={summary}/>
                    </div>
                    <Typography component="p" style={styles.detailsTemp}><strong>{temp}</strong> <sup>&#8451;</sup></Typography>
                    <Typography component="p" style={styles.detailsSummary}>{summary}</Typography>
                </div>
                <div>
                    <Typography component="p" style={styles.detailsWind}>
                        <strong>Wind</strong> <br/> {windSpeed && `${windSpeed} m/sec`}
                    </Typography>
                </div>
            </div>
        </Paper> }
    </div>
    )
};

const styles = {
    container: {
        position: 'relative',
        zIndex: 10,
    },
    titleContainer: {
        height: 64,
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
    },
    icon: {
        width: 32,
        height: 32,
        marginRight: 10,
    },
    temp: {
        fontSize: 14,
        fontWeight: '300',
    },
    detailsContainer: {
        width: 380,
        position: 'absolute',
        top: 60,
        left: 0,
        backgroundColor: Colors.brandBgContent,
        borderColor: Colors.brandBorder,
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: 4,
        color: Colors.brandPrimary,
    },
    arrowTop: {
        width: 0,
        height: 0,
        borderStyle: 'solid',
        borderWidth: '0 10px 10px 10px',
        borderColor: 'transparent transparent #fff transparent',
        position: 'absolute',
        top: -10,
        left: 25,
    },
    detailsHeader: {
        borderBottomColor: Colors.brandBorderLight,
        borderBottomWidth: 1,
        borderBottomStyle: 'solid',
        padding: '15px 25px',
    },
    detailsTitle: {
        color: Colors.brandPrimary,
    },
    detailsDate: {
        color: Colors.brandPrimary,
    },
    detailsBody: {
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        padding: '15px 25px',
    },
    detailsTemp: {
        color: Colors.brandPrimary,
        marginLeft: 63,
        fontSize: 22,
    },
    detailsSummary: {
        color: Colors.brandPrimary,
        marginLeft: 63,
        whiteSpace: 'nowrap',
    },
    detailsWind: {
        color: Colors.brandPrimary,
    },
    detailsIconWrapper: {
        width: 48,
        height: 48,
        backgroundColor: Colors.brandPrimary,
        padding: 5,
        borderRadius: 5,
        float: 'left',
        marginRight: 10,
    },
    detailsIcon: {
        display: 'block',
        width: '100%',
        height: '100%',
    },
    spinner: {
        color : '#fff',
    },
};

export default enhance(WeatherWidget);
