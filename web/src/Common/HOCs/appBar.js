import { connect } from 'react-redux';
import { MOVE_TO, GO_BACK } from '../Constants/Index';
import { compose, withProps } from 'recompose';

const mapStateToProps = (state, props) => {
    return {
        appNav: state.nav && state.nav.index === 1 && state.nav.routes[1]
    }
};

const withPropsAppBar = withProps((props) => {
    const routes = props.appNav && props.appNav.index &&  props.appNav.routes;
    const routeName = routes &&  routes[props.appNav.index] && routes[props.appNav.index].routeName;
    return {
        renderGoToProjects: !!(routeName === 'Missions' || routeName === 'MissionEdit'),
        renderGoToMissions: !!(routeName === 'MissionEdit'),
        routes: routes
    }

});

const mapDispatchToProps = (dispatch) => ({
    goToProjects: (routes) => dispatch({
        type: MOVE_TO,
        route: 'LaunchScreen'
    }),
    goToMissions: (projectId) => dispatch({
        type: GO_BACK
    }),
});

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withPropsAppBar
);