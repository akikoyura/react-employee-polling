import {FC} from "react";
import {PollPageProps} from "../models/components/props.ts";
import {connect} from "react-redux";
import {handleSaveAnswerQuestion} from "../actions/actions.ts";
import {Navigate, useNavigate, useParams} from "react-router-dom";
import Question from "../models/data/question.ts";
import {ThunkDispatch} from "redux-thunk";
import {reducer} from "../reducers/reducer.ts";
import {Action} from "../models/components/action.ts";
import {Button, Card, CardBody, Col, Container, Row} from "react-bootstrap";
import User from "../models/data/user.ts";

const PollPage: FC<PollPageProps> = ({questions, users, user, addAnswer}) => {
    const navigate = useNavigate();
    const param = useParams();

    const question = Object.values(questions as Record<string, Question>).find((question: Question) => question.id === param.id) as Question;
    console.log(question)
    if (!question) {
        return (<Navigate to={"/notfound"}/>)
    }

    const currentUser = Object.values(users as Record<string, User>).find((user: User) => user.id === question.author) as User

    const handleQuestionOne = () => {
        addAnswer && addAnswer(question.id, "optionOne");
        navigate("/")
    }
    const handleQuestionTwo = () => {
        addAnswer && addAnswer(question.id, "optionTwo");
        navigate("/")
    }

    const calculatePercentage = (option: string, question: Question) => {
        const numberVotesTotal = question.optionOne.votes.length + question.optionTwo.votes.length;
        switch (option) {
            case "optionOne":
                return question.optionOne.votes.length / numberVotesTotal * 100 + " %";
            case "optionTwo":
                return question.optionTwo.votes.length / numberVotesTotal * 100 + " %";
            default:
                return "";
        }
    };

    const hasVotedForOptionOne = user && question.optionOne.votes.includes(user?.id);
    const hasVotedForOptionTwo = user && question.optionTwo.votes.includes(user?.id);
    const hasVoted = hasVotedForOptionOne || hasVotedForOptionTwo;

    return (
        <Container style={{width: '512px'}}>
            <Card>
                <CardBody>
                    <Row>
                        <Col md={12} className={"text-center"}>
                            <h3>Poll by {currentUser?.id}</h3>
                        </Col>
                        <Col md={12} className={"d-flex justify-content-center"}>
                            <img src={currentUser?.avatarURL ?? "./src/assets/images/default.jpg"} alt="logo" width={100}
                                 height={100}/>
                        </Col>
                        <Col md={12} className={"text-center"}>
                            <h5>Would You Rather</h5>
                        </Col>
                        <Col md={12} className={"d-flex justify-content-evenly"}>
                            <Button disabled={hasVoted} variant={hasVotedForOptionOne ? "success" : ""}
                                    onClick={handleQuestionOne}>
                                {question.optionOne.text} {hasVoted && <><p>{question.optionOne.votes.length}</p>
                                <p>{calculatePercentage("optionOne", question)}</p></>}
                            </Button>
                            <Button disabled={hasVoted} variant={hasVotedForOptionTwo ? "success" : ""}
                                    onClick={handleQuestionTwo}>
                                {question.optionTwo.text} {hasVoted && <><p>{question.optionTwo.votes.length}</p>
                                <p>{calculatePercentage("optionTwo", question)}</p></>}
                            </Button>
                        </Col>
                    </Row>
                </CardBody>
            </Card>

        </Container>
    );
};

const mapStateToProps = (state: ReturnType<typeof reducer>, props: PollPageProps): PollPageProps => {
    return {
        ...props,
        users: state.users,
        user: state.authenticatedUser as User,
        questions: state.questions as Record<string, Question>
    }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<ReturnType<typeof reducer>, never, Action>) => {
    return {
        addAnswer: (questionId: string, answer: string) => {
            dispatch(handleSaveAnswerQuestion(questionId, answer))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PollPage);