import React, { createContext, useState, useReducer } from "react";
import "./App.css";
import NavTop from "./components/Navbar";
import Home from "./components/Home";
import { Route, Switch } from "react-router-dom";
import CreateBlog from "./components/CreateBlog";
import Auth from "./components/Auth";
import DetailView from "./components/DetailView";
import EditBlog from "./components/EditBlog";
import Profile from "./components/Profile";
import LogOut from "./components/LogOut";
import { initialState, reducer } from "./reducer/UseReducer";

export const UserContext = createContext();

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      <UserContext.Provider value={{ state, dispatch }}>
        <NavTop />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/signin" component={Auth} />
          <Route exact path="/create_blog" component={CreateBlog} />
          <Route exact path="/full_blog/:id" component={DetailView} />
          <Route exact path="/edit_blog/:id" component={EditBlog} />
          <Route exact path="/profile/:id" component={Profile} />
          <Route exact path="/logout" component={LogOut} />
        </Switch>
      </UserContext.Provider>
    </>
  );
};

export default App;
