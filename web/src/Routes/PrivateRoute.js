import React from 'react';
import { connect } from 'react-redux';
import TopAppBar from '../Components/AppBar';
import {
    Route,
    Redirect,
} from "react-router-dom";

const PrivateRoute = ({ component: Component, token, defaultPassword, ...rest }) => {
    const redirectPath = defaultPassword ? "/ResetPassword" : "/Auth";
    return (
        <Route
            {...rest}
            render={props =>
                (token && !defaultPassword) || (redirectPath === props.location.pathname) ? (
                    <div>
                        <TopAppBar {...props} />
                        <Component {...props} />
                    </div>
                ) :  (
                    <Redirect
                        to={{
                            pathname: redirectPath,
                            state: { from: props.location }
                        }}
                    />)
            }
        />
    )
};

const mapStateToProps = (state) => {
    return {
        token: state.auth.token,
        defaultPassword: state.auth.user && state.auth.user.defaultpassword
    }
};
export default connect(mapStateToProps)(PrivateRoute);