import {FC, useEffect} from 'react'
import {AppProps} from "./models/components/props.ts";
import Login from "./components/Login.tsx";
import {Route, Routes} from "react-router-dom";
import LeaderBoard from "./components/LeaderBoard.tsx";
import Home from "./components/Home.tsx";
import NewPoll from "./components/NewPoll.tsx";
import {connect} from "react-redux";
import {getAppData} from "./actions/actions.ts";
import {reducer} from "./reducers/reducer.ts";
import {ThunkDispatch} from "redux-thunk";
import {Action} from "./models/components/action.ts";
import User from "./models/data/user.ts";
import Layout from "./components/Layout.tsx";
import PollPage from "./components/PollPage.tsx";
import AuthenticatedRoute from "./components/AuthenticatedRoute.tsx";
import PageNotFound from "./components/PageNotFound.tsx";
import 'bootstrap/dist/css/bootstrap.min.css';

const App: FC<AppProps> = ({getAppData}) => {
    useEffect(() => {
        getAppData().then();
    })

    return (
        <Layout>
            <Routes>
                <Route path={"login"} index={true} element={<Login/>}/>
                <Route path={"/"} element={<AuthenticatedRoute><Home/></AuthenticatedRoute>}/>
                <Route path={"leaderboard"} element={<AuthenticatedRoute><LeaderBoard/></AuthenticatedRoute>}/>
                <Route path={"add"} element={<AuthenticatedRoute><NewPoll/></AuthenticatedRoute>}/>
                <Route path={"question/:id"} element={<AuthenticatedRoute><PollPage/></AuthenticatedRoute>}/>
                <Route path={"notfound"} element={<PageNotFound/>}/>
            </Routes>
        </Layout>
    )
}

const mapStateToProps = (state: ReturnType<typeof reducer>) => {
    return {user: state.authenticatedUser as User};
}

const mapDispatchToProps = (dispatch: ThunkDispatch<ReturnType<typeof reducer>, never, Action>) => {
    return {
        getAppData: () => {
            return dispatch(getAppData())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
