import React from 'react';
import { connect } from 'react-redux';
import { compose, withHandlers, withStateHandlers } from 'recompose';
import AuthActions from '../Redux/AuthRedux';
import * as CONSTANTS from '../Constants/Lang';

const initialState = {
    enableButton: false,
    username: '',
    invalidUserName: null,
    password: '',
    invalidPassword: null,
};

const commonLogin = WrappedComponent => props => {
    const {
        submitForm, handleChange, enableButton,
        username, invalidUserName, password,
        invalidPassword, ...otherProps,        
    } = props;
    const data = {
        enableButton, username, invalidUserName,
        password, invalidPassword,
    };
    return (<WrappedComponent
        data={data}
        submitForm={submitForm}
        handleChange={handleChange}
        {...otherProps}
    />);
};

const passwordValid = ({ password, setInvalidPassword }) => () => {
    if (password && password.length > 6) {
        return true;
    }
    setInvalidPassword(CONSTANTS.PASSWORD_IS_NOT_CORRECT);
    return false;
};

const nameValid = ({ username, setInvalidUserName }) => () => {
    if (username && username.length > 5 && /^[a-zA-Z]+$/.test(username)) {
        return true;
    }
    setInvalidUserName(CONSTANTS.NAME_IS_NOT_CORRECT);
    return false;
};

const enableButtonWrapper = ({ username, password, enableButton, setEnableButton }) => () => {
    if (username && password) {
        !enableButton && setEnableButton(true);
    } else {
        enableButton && setEnableButton(false);
    }
};

const handleChange = ({ setStateValue, enableButtonWrapper }) => async (key, value) => {
    await setStateValue(key, value);
    enableButtonWrapper();
};

const submitForm = ({ clearErrors, passwordValid, nameValid, login, username, password }) => () => {
    clearErrors();
    if (passwordValid() && nameValid()) {
        login({
            username,
            password,
        });
    }
};

const mapStateToProps = state => {
    return {
        fetching: state.auth.fetching,
        error: state.auth.error
    }
};

const mapDispatchToProps = dispatch => ({
    login: (data) => dispatch(AuthActions.authRequest(data))
});

const enhance = compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStateHandlers(
      initialState,
      {
        clearErrors: () => () => ({
            invalidPassword: null,
            invalidUserName: null,
        }),
        setInvalidPassword: () => (value) => ({ invalidPassword: value }),
        setInvalidUserName: () => (value) => ({ invalidUserName: value }),
        setEnableButton: () => (value) => ({ enableButton: value }),
        setStateValue: () => (key, value) => ({ [key]: value }),
      },
    ),
    withHandlers({
        enableButtonWrapper,
    }),
    withHandlers({
        passwordValid,
        nameValid,
        handleChange,
    }),   
    withHandlers({ submitForm }),
    commonLogin,
);
  


export default enhance;
