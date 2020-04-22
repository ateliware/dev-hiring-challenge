import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Index from "./pages/Index";

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Index} />
            <Route path="*" component={() => <h1>Page not found</h1>} />
        </Switch>
    </BrowserRouter>
);

export default Routes;