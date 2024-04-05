import {render} from './test-utils'
import {Provider} from "react-redux";
import {store} from "../src/store/store";
import {BrowserRouter} from "react-router-dom";
import {authenticateUserAction} from "../src/actions/actions";
import App from "../src/App";

describe('App', () => {
    it('should set up the application correctly', () => {
        const renderedComponent = render(
            <Provider store={store}>
                <BrowserRouter>
                    <App/>
                </BrowserRouter>
            </Provider>
        )
        expect(renderedComponent).toBeDefined();
        expect(renderedComponent).toMatchSnapshot()
    })
})

describe("Login Component", () => {
    it("should display the Login page when the user is not authenticated", () => {
        const renderedComponent = render(
            <Provider store={store}>
                <BrowserRouter>
                    <App/>
                </BrowserRouter>
            </Provider>
        )
        const loginHeadingElement = renderedComponent.getByTestId("login-heading");
        expect(renderedComponent).toBeDefined();
        expect(loginHeadingElement).toBeInTheDocument();
    })

})

describe("Layout Component", () => {
    it("should display the navigation bar upon successful login", () => {
        store.dispatch(authenticateUserAction({id: "johndoe", password: "123456"}))
        const renderedComponent = render(
            <Provider store={store}>
                <BrowserRouter>
                    <App/>
                </BrowserRouter>
            </Provider>
        )
        const navbarElement = renderedComponent.getByTestId("navbar");
        expect(renderedComponent).toBeDefined();
        expect(navbarElement).toBeInTheDocument();
    })
})