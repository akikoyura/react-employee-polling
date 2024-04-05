import {FC} from 'react';
import {DashBoardProps} from "../models/components/props.ts";
import {Button, Card, CardTitle, Col, Container, Row, Tab, Tabs} from "react-bootstrap";
import {reducer} from "../reducers/reducer.ts";
import {connect} from "react-redux";
import Question from "../models/data/question.ts";
import moment from "moment";
import User from "../models/data/user.ts";
import {Link, useNavigate} from "react-router-dom";

const DashBoard: FC<DashBoardProps> = ({user, questions}) => {
    const navigate = useNavigate()
    return (
        <Row data-testid="dashboard">
            <Col md={12}>
                <Tabs defaultActiveKey={"unanswered"} className="mb-3" fill>
                    <Tab title={"Unanswered Questions"} eventKey={"unanswered"}>
                        <Container>
                            <Row>
                                {questions?.filter((question: Question) => user && !question.optionOne.votes.includes(user.id)
                                    && !question.optionTwo.votes.includes(user.id)).map((question: Question) =>
                                    <Col md={4} className={"mt-2"} key={question.id}>
                                        <Link to={`/question/${question.id}`}>
                                            <Card>
                                                <Card.Body>
                                                    <CardTitle className={"text-center"}>{question.author}</CardTitle>
                                                    <Card.Text className={"text-center"}>
                                                        {moment(question.timestamp).format("hh:mm:A | MM/DD/YYYY")}
                                                    </Card.Text>
                                                    <Button variant={"danger"} className={"d-block w-100"}
                                                            onClick={() => navigate(`/question/${question.id}`)}>Show</Button>
                                                </Card.Body>
                                            </Card>
                                        </Link>
                                    </Col>)}
                            </Row>
                        </Container>
                    </Tab>
                    <Tab title={"Answered Questions"} eventKey={"answered"}>
                        <Container>
                            <Row>
                                {questions?.filter((question: Question) => user && (question.optionOne.votes.includes(user.id)
                                    || question.optionTwo.votes.includes(user.id))).map((question: Question) =>
                                    <Col md={4} className={"mt-2"} key={question.id}>
                                        <Link to={`/question/${question.id}`}>
                                            <Card>
                                                <Card.Body>
                                                    <Card.Title
                                                        className={"text-center"}>{question.author}</Card.Title>
                                                    <Card.Text className={"text-center"}>
                                                        {moment(question.timestamp).format("hh:mm:A | DD/MM/YYYY")}
                                                    </Card.Text>
                                                    <Button variant={"outline-danger"} className={"d-block w-100"}
                                                            onClick={() => navigate(`/question/${question.id}`)}>Show</Button>
                                                </Card.Body>
                                            </Card>
                                        </Link>
                                    </Col>)
                                }
                            </Row>
                        </Container>
                    </Tab>
                </Tabs>
            </Col>
        </Row>
    );
}

const mapStateToProps = (state: ReturnType<typeof reducer>): DashBoardProps => {
    return {
        user: state.authenticatedUser as User,
        users: state.users,
        questions: Object.values(state.questions as Question).sort((a, b) => b.timestamp - a.timestamp)
    }
}

export default connect(mapStateToProps)(DashBoard);