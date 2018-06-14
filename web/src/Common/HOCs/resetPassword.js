import React from 'react';
import { connect } from 'react-redux';
import { compose, withHandlers, withStateHandlers } from 'recompose';
import * as CONSTANTS from '../Constants/Lang';
import AuthActions from '../Redux/AuthRedux';

const initialState = {
    enableButton: false,
    oldPassword: '',
    invalidOldPassword: null,
    newPassword: '',
    invalidNewPassword: null,
    retypePassword: '',
    invalidRetypePassword: null,
};

const commonResetpassword = WrappedComponent => props => {
    const {
        submitForm, handleChange, enableButton,
        oldPassword, invalidOldPassword, newPassword,
        invalidNewPassword, retypePassword,
        invalidRetypePassword, ...otherProps,        
    } = props;
    const data = {
        enableButton, oldPassword, invalidOldPassword,
        newPassword, invalidNewPassword, retypePassword,
        invalidRetypePassword,
    };
    return (<WrappedComponent
        data={data}
        submitForm={submitForm}
        handleChange={handleChange}
        {...otherProps}
    />);
};

const oldPasswordsValid = ({ oldPassword, setInvalidOldPassword }) => () => {
    if (oldPassword && oldPassword.length > 6) {
        return true;
    }
    setInvalidOldPassword(CONSTANTS.PASSWORD_IS_NOT_CORRECT);
    return false;
};

const newPasswordsValid = ({ newPassword, oldPassword, setInvalidNewPassword }) => () =>{
    if (!newPassword || newPassword.length < 6) {
        setInvalidNewPassword(CONSTANTS.PASSWORD_IS_NOT_CORRECT);
        return false;
    }
    if (oldPassword && newPassword && newPassword === oldPassword) {
        setInvalidNewPassword(CONSTANTS.NEW_PASSWORD_SAME_AS_OLD);
        return false;

    }
    return true;
};

const retypePasswordsValid = ({ retypePassword, newPassword, setInvalidRetypePassword}) => () => {
    if (retypePassword && retypePassword === newPassword) {
        return true;
    }
    setInvalidRetypePassword(CONSTANTS.PASSWORD_NOT_MATCH);
    return false;
};

const passwordsValid = ({ oldPasswordsValid, newPasswordsValid, retypePasswordsValid }) => () => {
    if (oldPasswordsValid() & newPasswordsValid() && retypePasswordsValid()) {
        return true;
    }
    return false;
};

const enableButtonWrapper = props => () => {
    const {
        oldPassword, newPassword, retypePassword,
        enableButton, setEnableButton
    } = props;
    if (oldPassword && newPassword && retypePassword) {
        !enableButton && setEnableButton(true);
    } else {
        enableButton && setEnableButton(false);
    }
};

const handleChange = ({ setStateValue, enableButtonWrapper })=> async (key, value) => {
    await setStateValue(key, value);
    enableButtonWrapper();
};

const submitForm = props => () => {
    const {
        clearErrors, passwordsValid, resetPassword, 
        oldPassword, newPassword
    } = props;
    clearErrors();
    if (passwordsValid()) {
        resetPassword({
            oldPassword,
            newPassword,
        });
    }
};

const mapStateToProps = (state) => {
    return {
        fetching: state.auth.fetching,
        error: state.auth.error
    }
};

const mapDispatchToProps = (dispatch) => ({
    resetPassword: (data) => dispatch(AuthActions.resetPasswordRequest(data))
});

const enhance = compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStateHandlers(
      initialState,
      {
        clearErrors: () => () => ({
            invalidOldPassword: null,
            invalidNewPassword: null,
            invalidRetypePassword: null
        }),
        setInvalidOldPassword: () => (value) => ({ invalidOldPassword: value }),
        setInvalidNewPassword: () => (value) => ({ invalidNewPassword: value }),
        setInvalidRetypePassword: () => (value) => ({ invalidRetypePassword: value }),
        setEnableButton: () => (value) => ({ enableButton: value }),
        setStateValue: () => (key, value) => ({ [key]: value }),
      },
    ),
    withHandlers({ enableButtonWrapper }),
    withHandlers({
        oldPasswordsValid,
        newPasswordsValid,
        retypePasswordsValid,
        handleChange,
    }),
    withHandlers({ passwordsValid }),
    withHandlers({ submitForm }),
    commonResetpassword,
);

export default enhance;
