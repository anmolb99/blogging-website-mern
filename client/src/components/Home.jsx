import React from "react";
import Blogs from "./Blogs";
import LeftMenu from "./LeftMenu";
import NavTop from "./Navbar";
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
