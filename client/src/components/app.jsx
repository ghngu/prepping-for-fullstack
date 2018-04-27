import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './home';
import Chirp from './chirp';
import Put from './put';

class App extends Component {

    render() {
        return (
            <Router>
                <Fragment>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/chirp/:id" component={Chirp} />
                        <Route exact path="/chirp/:id/update" component={Put} />
                    </Switch>
                </Fragment>
            </Router>
        )
    }
}

export default App;