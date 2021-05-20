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
import { SnackbarProvider } from "notistack";

// @todo separate to other file
const routes = [
    {
        path: "/",
        Component: HomePage
    }
];

const App : React.FC = () => {
    return (
        <SnackbarProvider maxSnack={2}>
            <StyleProvider>
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
            </StyleProvider>
        </SnackbarProvider>
    );
};

export default App;
