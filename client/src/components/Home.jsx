import React from "react";
import { Route, Switch } from "react-router";
import Blogs from "./Blogs";
import LeftMenu from "./LeftMenu";
import "../style/home.css";

const Home = () => {
  return (
    <>
      <div className="home">
        <LeftMenu />
        <Blogs />
      </div>
    </>
  );
};

export default Home;
