import {FC} from 'react';
import {PrivateRouteProps} from "../models/components/props.ts";
import {reducer} from "../reducers/reducer.ts";
import {connect} from "react-redux";
import {Navigate} from "react-router-dom";

const AuthenticatedRoute: FC<PrivateRouteProps> = ({authenticated, children}) => {
    const url = new URL(window.location.href);
    const redirectUrl = url.pathname + url.search;
    return authenticated ? children : (
        <Navigate to={`/login?redirectTo=${redirectUrl}`}/>
    );
};

const mapStateToProps = (state: ReturnType<typeof reducer>) => {
    return {authenticated: !!state.authenticatedUser}
}

export default connect(mapStateToProps)(AuthenticatedRoute);