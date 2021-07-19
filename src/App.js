import React, { Component } from "react";
import "./styles/main.scss";
import Login from "./components/Login";
import Logout from "./components/Logout";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import HomePage from "./components/HomePage";
import DetailPost from "./components/DetailPost";
import Profile from './components/Profile';

export default class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={HomePage}></Route>
            <Route path="/login" component={Login}></Route>
            <Route path="/logout" component={Logout}></Route>
            <Route path="/postdetail" component={DetailPost}></Route>
            <Route path="/profile" component={Profile}></Route>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
