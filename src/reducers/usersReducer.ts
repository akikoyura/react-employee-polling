import {FETCH_USERS, SAVE_USER_ANSWERS, SAVE_USER_QUESTION} from "../constants/constants.ts";
import {Action} from "../models/components/action.ts";
import Question from "../models/data/question.ts";
import User from "../models/data/user.ts";
import Option from "../models/data/option.ts";

export default function usersReducer(state = {}, action: Action) {
    switch (action.type) {
        case FETCH_USERS:
            return {
                ...state,
                ...action.payload
            };
        case SAVE_USER_QUESTION:
            return {
                ...state,
                [(action.payload as Question).author]: {
                    ...(state as Record<string, User>)[(action.payload as Question).author],
                    questions: (state as Record<string, User>)[(action.payload as Question).author].questions.concat((action.payload as Question).id)
                }

            }
        case SAVE_USER_ANSWERS:
            return {
                ...state,
                [(action.payload as {
                    authedUser: string,
                    qid: string,
                    answer: string
                }).authedUser]: {
                    ...(state as Record<string, Question>)[(action.payload as {
                        authedUser: string,
                        qid: string,
                        answer: string
                    }).authedUser],
                    answers: {
                        ...(state as Record<string, Record<string, Option>>)[(action.payload as {
                            authedUser: string,
                            qid: string,
                            answer: string
                        }).authedUser].answers,
                        [(action.payload as {
                            authedUser: string,
                            qid: string,
                            answer: string
                        }).qid]: (action.payload as {
                            authedUser: string,
                            qid: string,
                            answer: string
                        }).answer
                    }
                }
            }
        default:
            return state;
    }
}