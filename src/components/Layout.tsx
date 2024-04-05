import {FC} from 'react';
import {Button, Col, Container, Nav, Row} from "react-bootstrap";
import {reducer} from "../reducers/reducer.ts";
import User from "../models/data/user.ts";
import {ThunkDispatch} from "redux-thunk";
import {Action} from "../models/components/action.ts";
import {handleLogout} from "../actions/actions.ts";
import {connect} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import {LayoutProps} from "../models/components/props.ts";

const Layout: FC<LayoutProps> = ({children, user, logout}) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        if (logout) {
            logout();
        }
        navigate("/")
    }

    return (
        <Container>
            {user && (
                <>
                    <Row>
                        <Col md={6}>
                            <Nav variant={"underline"} activeKey={window.location.pathname} data-testid="navbar">
                                <Nav.Item>
                                    <Link to={"/"}>Home</Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Link to={"/leaderboard"}>Leaderboard</Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Link to={"/add"}>New</Link>
                                </Nav.Item>
                            </Nav>
                        </Col>
                        <Col md={6} className={"d-flex justify-content-end"}>
                            <Nav>
                                <Nav.Item>
                                    <Nav.Link disabled data-testid="username">{user?.id}</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Button data-testid="logout-btn" variant={"link"}
                                            onClick={() => handleLogout()}>Log out</Button>
                                </Nav.Item>
                            </Nav>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <hr/>
                        </Col>
                    </Row>
                </>
            )}
            <Row>
                <Col md={12}>
                    {children}
                </Col>
            </Row>
        </Container>
    );
};


const mapStateToProps = (state: ReturnType<typeof reducer>, props: LayoutProps) => {
    return {
        ...props,
        user: state.authenticatedUser as User
    }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<ReturnType<typeof reducer>, never, Action>) => {
    return {
        logout: () => {
            dispatch(handleLogout());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);