import {Action} from "../models/components/action.ts";
import {AUTHENTICATE_USER, LOGOUT} from "../constants/constants.ts";

export default function authenticateReducer (state = null, action: Action) {
    switch (action.type) {
        case AUTHENTICATE_USER:
            return action.payload;
        case LOGOUT:
            return null
        default:
            return state;
    }
}