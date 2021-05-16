import * as React from "react";
import {StyleProvider} from "./Providers";
import {CssBaseline} from "@material-ui/core";
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

import HomePage from "pages/HomePage";
import MainLayout from "pages/MainLayout";
import { StoreProvider } from "pages/HomePage/store/StoreProvider";

// @todo separate to other file
const routes = [
    {
        path: "/",
        Component: HomePage
    }
];

const App : React.FC = () => {
    return (
        <StyleProvider>
            <StoreProvider>
                <CssBaseline />
                <MainLayout>
                    <Router>
                        <Switch>
                            {
                                routes.map(({path, Component}) => (
                                    <Route path={path} key={path}><Component /></Route>
                                ))
                            }
                        </Switch>
                    </Router>
                </MainLayout>
            </StoreProvider>
        </StyleProvider>
    );
};

export default App;
