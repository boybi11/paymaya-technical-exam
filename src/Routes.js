import React from 'react';
import { withRouter, Router, Route, Switch } from 'react-router-dom';
import history from './History';

import ListView from './views/ListView/';
import BlogView from './views/BlogView/';
import BlogForm from './views/BlogForm';

const Routes = () => (
    <Router history={history}>
        <Switch>
            <Route 
                exact
                path="/"
            >
                <ListView />
            </Route>
            <Route  path="/blog/view/:uuid" >
                <BlogView />
            </Route>
            <Route  path="/blog/:action/:uuid?" >
                <BlogForm />
            </Route>
        </Switch>
    </Router>
);

export default withRouter(Routes);

