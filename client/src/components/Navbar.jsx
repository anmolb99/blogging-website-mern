import React, { useState, useEffect } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
  Button,
} from "reactstrap";
import "../style/navbar.css";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import axios from "axios";
import { Api } from "../API/Api";

const NavTop = () => {
  const cookies = new Cookies();
  const [loginStatus, setLoginStatus] = useState(false);
  const [refresh, setRefresh] = useState(null);
  const [user, setUser] = useState({});
  const token = cookies.get("token");

  // const loginStatusCheck = () => {
  //   if (token) {
  //     setLoginStatus(true);
  //   } else {
  //     setLoginStatus(false);
  //   }
  // };

  const getUsername = async () => {
    const token = {
      jwt: cookies.get("token"),
    };
    try {
      const res = await axios.post(`${Api.URL}/get_username`, token);
      console.log(res);
      setUser(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // loginStatusCheck();
    getUsername();
  }, []);

  return (
    <div>
      <div className="navbar_main">
        <Navbar className="p-2 navbar_in">
          <div className="web_logo">
            <Link to="/">Mini Blogs </Link>
          </div>
          {console.log(user)}

          {user.username ? (
            <Link to={`/profile/${user._id}`}>
              <div className="myprofile_button">
                <span>{user.username}</span>
                <img
                  id="homepage_profileimg"
                  src="https://w7.pngwing.com/pngs/340/956/png-transparent-profile-user-icon-computer-icons-user-profile-head-ico-miscellaneous-black-desktop-wallpaper.png"
                  alt=""
                />
              </div>
            </Link>
          ) : (
            <Link to="/signin">
              <Button size="sm" color="primary" className="signin_button">
                SIGN IN
              </Button>
            </Link>
          )}
        </Navbar>
      </div>
    </div>
  );
};

export default NavTop;
