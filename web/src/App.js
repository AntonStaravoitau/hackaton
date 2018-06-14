import React, { Component } from 'react';
import { PersistGate } from 'redux-persist/integration/react'
import MainRouter from './Routes/MainRouter';
import createStore from './Redux/';
import { Provider } from 'react-redux';
import ReduxToastr from 'react-redux-toastr';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';
import './App.css';
import { ConnectedRouter } from 'react-router-redux';
import Colors from './Common/Themes/Colors';

const { store, persistor, history } = createStore();

export { history }

const THEME = createMuiTheme({
    typography: {
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            'Roboto',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
    },
    palette: {
        primary: {
            light: Colors.brandPrimaryLight,
            main: Colors.brandPrimary,
            dark: Colors.brandPrimaryDark,
            contrastText: '#fff',
        },
    },
    overrides: {
        MuiInput: {
            focused: {
                boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
                borderRadius: 4,
            },
        }
    }
});

export default class App extends Component {
    render() {
        return (
            <MuiThemeProvider theme={THEME}>
                <Provider store={store}>
                    <ConnectedRouter history={history}>
                        <PersistGate loading={null} persistor={persistor}>
                            <MainRouter history={history}/>
                            <ReduxToastr />
                        </PersistGate>
                    </ConnectedRouter>
                </Provider>
            </MuiThemeProvider>
        );
    }
}


