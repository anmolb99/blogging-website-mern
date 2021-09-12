import React, { useState } from "react";
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

const NavTop = () => {
  return (
    <div>
      <div className="navbar_main">
        <Navbar className="p-2 navbar_in">
          <NavbarBrand className="web_logo">
            <Link to="/">Mini Blogs </Link>
          </NavbarBrand>

          <Link to="/signin">
            <Button size="sm" color="primary" className="signin_button">
              SIGN IN
            </Button>
          </Link>

          <Link to="/profile">
            <div className="myprofile_button">
              <span>Anshuman Sharma </span>
              <img
                id="homepage_profileimg"
                src="https://w7.pngwing.com/pngs/340/956/png-transparent-profile-user-icon-computer-icons-user-profile-head-ico-miscellaneous-black-desktop-wallpaper.png"
                alt=""
              />
            </div>
          </Link>
        </Navbar>
      </div>
    </div>
  );
};

export default NavTop;
