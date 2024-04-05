import {
    AUTHENTICATE_USER,
    FETCH_QUESTIONS,
    FETCH_USERS,
    LOGOUT,
    STORE_ANSWERS_QUESTION,
    STORE_QUESTION, SAVE_USER_ANSWERS, SAVE_USER_QUESTION
} from "../constants/constants.ts";
import {Action} from "../models/components/action.ts";
import {Dispatch} from "redux";
import {_getQuestions, _getUsers, _saveQuestion, _saveQuestionAnswer} from "../mocks/_DATA.ts";
import User from "../models/data/user.ts";
import {reducer} from "../reducers/reducer.ts";
import Question from "../models/data/question.ts";

export const authenticateUserAction = (payload: object): Action => {
    return {type: AUTHENTICATE_USER, payload}
}

export const logoutAction = (): Action => {
    return {type: LOGOUT}
}

export const getUsersAction = (payload: object): Action => {
    return {type: FETCH_USERS, payload}
}

export const getQuestions = (payload: object) => {
    return {type: FETCH_QUESTIONS, payload}
}

export const saveUserQuestionAction = (payload: object) => {
    return {type: SAVE_USER_QUESTION, payload}
}

export const saveUserAnswerAction = (payload: object) => {
    console.log(payload)
    return {type: SAVE_USER_ANSWERS, payload,}
}

export const saveQuestionAction = (payload: Question) => {
    return {type: STORE_QUESTION, payload}
}

export const saveAnswerQuestionAction = (payload: object) => {
    return {type: STORE_ANSWERS_QUESTION, payload}
}

export const getAppData = () : (dispatch: Dispatch<Action>) => Promise<void> => {
    return async (dispatch: Dispatch<Action>) => {
        const [users, questions] = await Promise.all([_getUsers(), _getQuestions()]);
        const {users: users_1, questions: questions_1} = ({
            users,
            questions
        });
        dispatch(getQuestions(questions_1));
        dispatch(getUsersAction(users_1));
    }
}

export function handleLogin(username: string, password: string) {
    return (dispatch: Dispatch<Action>, getState: () => ReturnType<typeof reducer>) => {
        const {users} = getState();
        const user = Object.values(users as User).find((user: User) => user.id === username && user.password === password);
        if (user) {
            return dispatch(authenticateUserAction(user));
        } else {
            return dispatch(authenticateUserAction({
                user: null,
                errorMessage: "Wrong username or password"
            }))
        }
    };
}

export function handleLogout(): (dispatch: Dispatch<Action>) => Action {
    return (dispatch: Dispatch<Action>) => {
        return dispatch(logoutAction());
    };
}

export function handleSaveQuestion(optionOne: string, optionTwo: string) {
    return async (dispatch: Dispatch<Action>, getState: () => ReturnType<typeof reducer>) => {
        const {authenticatedUser} = getState();
        const user = authenticatedUser as User
        const question = await _saveQuestion({
            optionOneText: optionOne,
            optionTwoText: optionTwo,
            author: user
        }) as Question;

        dispatch(saveQuestionAction(question));
        dispatch(saveUserQuestionAction({
            author: question.author,
            id: question.id
        }));

    }
}

export function handleSaveAnswerQuestion(questionId: string, answer: string) {
    return (dispatch: Dispatch<Action>, getState: () => ReturnType<typeof reducer>) => {
        const {authenticatedUser} = getState();
        const user: User = authenticatedUser as User;

        _saveQuestionAnswer({
            authedUser: user.id,
            qid: questionId,
            answer: answer
        }).then(() => {
            dispatch(saveAnswerQuestionAction({
                author: user.id,
                qid: questionId,
                answer: answer
            }));
            dispatch(saveUserAnswerAction({
                authedUser: user.id,
                qid: questionId,
                answer: answer
            }))
        })
    }
}