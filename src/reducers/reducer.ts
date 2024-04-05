import {combineReducers} from "redux";
import usersReducer from "./usersReducer.ts";
import authenticateReducer from "./authenticateReducer.ts";
import questionsReducer from "./questionsReducer.ts";

export const reducer = combineReducers({
    authenticatedUser: authenticateReducer,
    users: usersReducer,
    questions: questionsReducer,
})

