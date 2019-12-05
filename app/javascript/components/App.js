import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from './Home';
import Favorites from './Favorites';

export class NoMatch extends Component{
    render(){
        return(
            <div>404 page</div>
        )
    }
}

class App extends Component {
    render() {
        return (
            <>
                <div className='app'>
                    <Switch>

                        <Route
                            exact
                            path={"/"}
                            render={props => (
                                <Home {...props} />
                            )}
                        />

                        <Route
                            path={"/favorites"}
                            render={props => (
                                <Favorites {...props} />
                            )}
                        />

                        <Route component={NoMatch} />
                    </Switch>
                </div>
            </>
        );
    }
}

export default App;