import React from 'react';
import { connect } from 'react-redux';
import Login from '../Containers/Login';
import ResetPassword from '../Containers/ResetPassword';
import MainApp from '../Containers/LaunchPage';
import AuthActions from '../Common/Redux/AuthRedux';
import  { lifecycle } from  'recompose';

import PrivateRoute from '../Routes/PrivateRoute';

import {
    Router,
    Route,
    Switch,
} from "react-router-dom";

const MainRouter = ({history}) => {
    return (
        <Router history={history}>
            <Switch>
                <Route path="/Auth" component={Login}/>
                <PrivateRoute exact path="/" component={MainApp}/>
                <PrivateRoute path="/App" component={MainApp}/>
            </Switch>
        </Router>
    )
};

const MainRouterWithLifecycle = lifecycle({
    componentWillMount() {
        this.props.setHeader(this.props.token);
    }
})(MainRouter);

const mapDispatchToProps = (dispatch) => ({
    setHeader: (token) => dispatch(AuthActions.setHeader(token))

});

const mapStateToProps = (state) => {
    return { token: state.auth.token }
};

export default connect(mapStateToProps, mapDispatchToProps)(MainRouterWithLifecycle);
