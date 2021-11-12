import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Dashboard, SignIn, SignUp, AddNote, Update } from "./index";

import "./index.css";
export const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <SignIn />
        </Route>
        <Route exact path="/dashboard">
          <Dashboard />
        </Route>
        <Route exact path="/sign-up">
          <SignUp />
        </Route>
        <Route exact path="/add">
          <AddNote />
        </Route>
        <Route exact path="/update/:id">
          <Update />
        </Route>
      </Switch>
    </Router>
  );
};
