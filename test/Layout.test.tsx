import {fireEvent, render} from "@testing-library/react";
import {Provider} from "react-redux";
import {store} from "../src/store/store";
import {BrowserRouter} from "react-router-dom";
import Layout from "../src/components/Layout";
import {authenticateUserAction, getAppData} from "../src/actions/actions";
import Home from "../src/components/Home";
import LeaderBoard from "../src/components/LeaderBoard";
import NewPoll from "../src/components/NewPoll";

describe("Layout Component", () => {
    it("should be rendered successfully", () => {
        const component = render(
            <Provider store={store}>
                <BrowserRouter>
                    <Layout/>
                </BrowserRouter>
            </Provider>
        );
        expect(component).toBeDefined();
        expect(component).toMatchSnapshot();
    })
    it ("should have the navbar", () => {
        store.dispatch(authenticateUserAction({id: "sarahedo", password: "123456"}))
        const component = render(
            <Provider store={store}>
                <BrowserRouter>
                    <Layout/>
                </BrowserRouter>
            </Provider>
        );

        const navbarElement = component.getByTestId("navbar");

        expect(component).toBeDefined();
        expect(navbarElement).toBeInTheDocument();
    })
    it("should display the username", () => {
        store.dispatch(authenticateUserAction({id: "sarahedo", password: "123456"}))
        const component = render(
            <Provider store={store}>
                <BrowserRouter>
                    <Layout/>
                </BrowserRouter>
            </Provider>
        );

        const usernameElement = component.getByTestId("username");

        expect(component).toBeDefined();
        expect(usernameElement).toBeInTheDocument();
        expect(usernameElement.textContent).toBe("sarahedo")
    })
    it ("should have the logout button", async () => {
        store.dispatch(authenticateUserAction({id: "sarahedo", password: "123456"}))
        const component = render(
            <Provider store={store}>
                <BrowserRouter>
                    <Layout/>
                </BrowserRouter>
            </Provider>
        );

        const logoutElement = component.getByTestId("logout-btn");
        expect(component).toBeDefined();
        expect(logoutElement).toBeInTheDocument();
        expect(logoutElement.textContent).toBe("Log out")
    })

    it ("should click the logout button successfully", async () => {
        store.dispatch(authenticateUserAction({id: "sarahedo", password: "123456"}))
        const component = render(
            <Provider store={store}>
                <BrowserRouter>
                    <Layout/>
                </BrowserRouter>
            </Provider>
        );

        const logoutElement = component.getByTestId("logout-btn");
        expect(component).toBeDefined();
        expect(logoutElement).toBeInTheDocument();
        expect(logoutElement.textContent).toBe("Log out")
        fireEvent.click(logoutElement)
    })

})

describe("Home component", () => {
    it("should render the dashboard component", () => {
        store.dispatch(authenticateUserAction({id: "sarahedo", password: "123456"}))
        store.dispatch(getAppData())

        const component = render(
            <Provider store={store}>
                <BrowserRouter>
                    <Layout>
                        <Home />
                    </Layout>
                </BrowserRouter>
            </Provider>
        );
        const dashboardElement = component.getByTestId("dashboard")

        expect(component).toBeDefined();
        expect(component).toMatchSnapshot();
        expect(dashboardElement).toBeInTheDocument();
    })
})

describe("Leaderboard Component", async () => {
    it("should render the leaderboard table", () => {
        store.dispatch(authenticateUserAction({id: "sarahedo", password: "123456"}))
        store.dispatch(getAppData())

        const component = render(
            <Provider store={store}>
                <BrowserRouter>
                    <Layout>
                        <LeaderBoard />
                    </Layout>
                </BrowserRouter>
            </Provider>
        );
        const leaderboardElement = component.getByTestId("leaderboard-table")

        expect(component).toBeDefined();
        expect(component).toMatchSnapshot();
        expect(leaderboardElement).toBeInTheDocument();
    })
})

describe("NewPoll Component", () => {
    it("should render the create poll form", async () => {
        store.dispatch(authenticateUserAction({id: "sarahedo", password: "123456"}))
        store.dispatch(getAppData())

        const component = render(
            <Provider store={store}>
                <BrowserRouter>
                    <Layout>
                        <NewPoll />
                    </Layout>
                </BrowserRouter>
            </Provider>
        );

        const newPollElement = component.getByTestId("new-poll")

        expect(component).toBeDefined();
        expect(component).toMatchSnapshot();
        expect(newPollElement).toBeInTheDocument();

        const firstOptionLabelElement = component.getByTestId("first-option-label");
        const firstOptionInputElement = component.getByTestId("first-option-input");
        const secondOptionLabelElement = component.getByTestId("second-option-label");
        const secondOptionInputElement = component.getByTestId("second-option-input");
        const submitButtonElement = component.getByTestId("poll-submit-btn");

        expect(firstOptionLabelElement).toBeInTheDocument();
        expect(firstOptionLabelElement.textContent).toBe("First Option");
        fireEvent.change(firstOptionInputElement, {target: {value: 'A'}});
        expect(firstOptionInputElement.value).toBe("A");

        expect(secondOptionLabelElement).toBeInTheDocument();
        expect(secondOptionLabelElement.textContent).toBe("Second Option");
        fireEvent.change(secondOptionInputElement, {target: {value: 'B'}});
        expect(secondOptionInputElement.value).toBe("B");

        expect(submitButtonElement).toBeInTheDocument();
        expect(submitButtonElement.textContent).toBe("Submit");
        fireEvent.click(submitButtonElement)
    })
})