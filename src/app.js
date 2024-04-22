import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavigationBar from './navigation-bar';
import Home from './home/home';
import ErrorPage from './commons/errorhandling/error-page';
import styles from './commons/styles/project-style.css';
import Login from "./login/login";
import Register from "./register/register";
import ContactPage from "./contact/ContactPage";
import DatePickerPage from "./destinations/DatePickerPage";
import AgentPage from "./destinations/AgentPage";

class App extends React.Component {
    state = {
        isLoggedIn: localStorage.getItem('login_state') === 'true' || false, // Set to false if login_state is not set or false
        role: localStorage.getItem('role') || '' // Get user role from localStorage or set to empty string
    };

    render() {
        const { isLoggedIn, role } = this.state;

        return (
            <div className={styles.back}>
                <Router>
                    <div>
                         {/* Pass isLoggedIn and role as props */}

                        <Switch>
                            <Route
                                exact
                                path='/'
                                component={Home}
                            />
                            <Route
                                exact
                                path='/login'
                                render={() => <Login />} // Always render Login component
                            />
                            <Route
                                exact
                                path='/register'
                                render={() => <Register />} // Always render Register component
                            />
                            <Route
                                exact
                                path='/contact'
                                render={() => <ContactPage />}
                            />
                            {isLoggedIn && ( // Render protected routes only if user is logged in
                                <>
                                    <Route
                                        exact
                                        path='/destinations'
                                        component={() => <DatePickerPage filterDiscount={false} />}
                                    />
                                    <Route
                                        exact
                                        path='/discounts'
                                        component={() => <DatePickerPage filterDiscount={true} />}
                                    />
                                    <Route
                                        exact
                                        path='/agent'
                                        component={AgentPage}
                                    />
                                </>
                            )}
                            <Route
                                exact
                                path='/error'
                                component={ErrorPage}
                            />
                            <Route
                                render={() => <ErrorPage />}
                            />
                        </Switch>
                    </div>
                </Router>
            </div>
        );
    }
}

export default App;
