import { ReactNode } from "react";
import User from "../data/user.ts";
import Question from "../data/question.ts";

export type AppProps = {
    user?: User;
    getAppData: () => Promise<void>;
}

export type LoginProps = {
    login: (username: string, password: string) => void;
    authenticated: boolean
}

export type HomeProps = {
    user?: User;
    users: Record<string, User>
}

export type DashBoardProps = {
    user?: User;
    users: Record<string, User>
    questions?: Question[];
}

export type LeaderBoardProps = {
    users?: User[];
}

export type NewPollProps = {
    addQuestion: (firstOption: string, secondOption: string) => void

}

export type PollPageProps = {
    questions?: Record<string, Question>,
    users?: Record<string, User>,
    user?: User,
    addAnswer?: (questionId: string, answer: string) => void,
}

export type LayoutProps = {
    children?: ReactNode;
    user?: User;
    logout?: () => void;
}

export type ErrorBoundaryProps = {
    children: ReactNode;
}

export type PrivateRouteProps = {
    authenticated: boolean;
    children?: ReactNode;
}