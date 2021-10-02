import React, { useState, useEffect, useContext } from "react";
import { Navbar } from "reactstrap";
import Button from "@mui/material/Button";
import "../style/navbar.css";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import axios from "axios";
import { Api } from "../API/Api";
import { Tooltip } from "@mui/material";
import { UserContext } from "../App";

const NavTop = () => {
  const {
    state: { signinStatus, profileUpdateStatus },
    dispatch,
  } = useContext(UserContext);
  // console.log(signinStatus);
  const cookies = new Cookies();
  const [user, setUser] = useState({});

  const getUsername = async () => {
    const token = {
      jwt: cookies.get("token"),
    };

    console.log("token", token);

    if (token.jwt) {
      try {
        const res = await axios.post(`${Api.URL}/get_username/`, token);
        console.log(res);
        setUser(res.data);
      } catch (error) {
        console.log(error);
      }
    } else {
      setUser("");
    }
  };

  useEffect(() => {
    getUsername();
  }, [signinStatus, profileUpdateStatus]);

  return (
    <div>
      <div className="navbar_main">
        <Navbar className="p-2 navbar_in">
          <div className="web_logo">
            <Link to="/">Mini Blogs </Link>
          </div>

          {console.log(user.username)}
          {user.username ? (
            <Link to={`/profile/${user._id}`}>
              <Tooltip title="My Profile">
                <div className="myprofile_button">
                  <span>{user.username}</span>
                  <img
                    id="homepage_profileimg"
                    src={
                      user.profilepic
                        ? `${Api.URL}/${user.profilepic}`
                        : "/images/blank-profile.png"
                    }
                    alt=""
                  />
                </div>
              </Tooltip>
            </Link>
          ) : (
            <Link to="/signin">
              <Button size="small" variant="contained">
                SIGN IN
              </Button>
            </Link>
          )}
          {/* <button
            onClick={() => {
              setReload(false);
            }}
          >
            click me{" "}
          </button> */}
        </Navbar>
      </div>
    </div>
  );
};

export default NavTop;
