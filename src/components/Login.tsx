import {ChangeEvent, FC, FormEvent, useState} from 'react';
import {LoginProps} from "../models/components/props.ts";
import {Button, Card, CardBody, CardTitle, Col, Container, Form, Row} from "react-bootstrap";
import {Navigate} from "react-router-dom";
import {connect} from "react-redux";
import {handleLogin} from "../actions/actions.ts";
import {ThunkDispatch} from "redux-thunk";
import {reducer} from "../reducers/reducer.ts";
import {Action} from "../models/components/action.ts";

const Login: FC<LoginProps> = ({login, authenticated}) => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    if (authenticated) {
        const urlParams = new URLSearchParams(window.location.search);
        const redirectUrl = urlParams.get('redirectTo');
        return <Navigate to={redirectUrl ? redirectUrl : "/"}/>;
    }

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        login(username, password)
        setUsername("");
        setPassword("");
    }

    return (
        <Container>
            <Row>
                <Col sm={12} className={"d-flex justify-content-center mb-3 mt-5"}>
                    <h3>Employee Polls</h3>
                </Col>
            </Row>
            <Row>
                <Col sm={12} className={"d-flex justify-content-center"}>
                    <Card style={{width: '540px'}}>
                        <CardBody>
                            <CardTitle className={"d-flex justify-content-center"} data-testid="login-heading">Login</CardTitle>
                            <Form onSubmit={(event: FormEvent<HTMLFormElement>) => handleSubmit(event)}>
                                <Form.Group className="mb-3" controlId="username">
                                    <Form.Label>User name: </Form.Label>
                                    <Form.Control data-testid="username" type="text" value={username}
                                                  onChange={(event: ChangeEvent<HTMLInputElement>) => setUsername(event.target.value)}/>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="password">
                                    <Form.Label>Password: </Form.Label>
                                    <Form.Control data-testid="password" type="password" value={password}
                                                  onChange={(event: ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)}/>
                                </Form.Group>
                                <Button className="btn btn-primary d-block w-100" type="submit" data-testid="submit">
                                    Login
                                </Button>
                            </Form>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
};

const mapStateToProps = (state: ReturnType<typeof reducer>) => {
    return {
        authenticated: state.authenticatedUser !== null
    }
};

const mapDispatchToProps = (dispatch: ThunkDispatch<ReturnType<typeof reducer>, never, Action>) => {
    return {
        login: (username: string, password: string) => {
            dispatch(handleLogin(username, password))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);