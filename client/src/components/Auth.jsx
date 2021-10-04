import React, { useState, useContext } from "react";
import "../style/auth.css";
import { Button, Alert, Stack } from "@mui/material";
import { Api } from "../API/Api";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Cookies from "universal-cookie";
import { UserContext } from "../App";

const Auth = () => {
  const {
    state: { signinStatus, rootUser },
    dispatch,
  } = useContext(UserContext);
  const history = useHistory();
  const cookies = new Cookies();

  const [signupData, setSignupData] = useState({
    username: "",
    email: "",
    password: "",
    cpassword: "",
    showPassword: false,
  });

  const [signinData, setSigninData] = useState({
    email: "",
    password: "",
  });

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const { username, email, password, cpassword } = signupData;
      const pattern = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
      );

      if (!username || !email || !password || !cpassword) {
        window.alert("please fill all fields");
      } else if (password !== cpassword) {
        window.alert("passwords do not match");
      } else if (!pattern.test(signupData.email)) {
        window.alert("please enter valid email");
      } else {
        const res = await axios.post(`${Api.URL}/register`, signupData);
        console.log(res.status);
        if (res.status === 201) {
          window.alert("User Resistered Successfully, Now signin to continue");
          console.log("user registered successfully");
        }
      }
    } catch (error) {
      if (error.response.status === 422) {
        window.alert(error.response.data.msg);
        console.log(error.response.data.msg);
      }
      console.log("error while posting", error);
    }
  };

  const handleSignin = async (e) => {
    e.preventDefault();

    try {
      const { email, password } = signinData;

      if (!email || !password) {
        window.alert("Please fill all fields");
      } else {
        const res = await axios.post(`${Api.URL}/signin`, signinData);
        // console.log(res);

        if (res.status === 201) {
          window.alert("Login successfully");
          cookies.set("token", res.data.token, {
            expires: new Date(Date.now() + 2592000000),
          });
          cookies.set("uid", res.data.uid, {
            expires: new Date(Date.now() + 2592000000),
          });

          history.push("/");
          // console.log(res.data);
          dispatch({ signinStatus: !signinStatus });
          console.log("login successfully");
        }
      }
    } catch (error) {
      console.log("error while log in", error);
      if (error.response.status === 422) {
        window.alert("Invalid credentials");

        console.log("Invalid credentials");
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === " ") {
      e.preventDefault();
    }
  };
  return (
    <>
      <div className="auth_main">
        <div className="auth_container">
          {/* SIGN IN */}
          <div className="signin">
            <div className="signin_top">
              <p>Already regestered ?</p>
              <h2>Sign in</h2>
            </div>
            <label>
              <i className="fas fa-envelope" />
              <input
                className="input_signin"
                type="email"
                placeholder="Your Email"
                onChange={(e) => {
                  setSigninData({ ...signinData, email: e.target.value });
                }}
                value={signinData.email}
                autoComplete="off"
              />
            </label>
            <br />

            <form>
              <label>
                <i className="fas fa-lock" />
                <input
                  className="input_signin"
                  type="password"
                  placeholder="Password"
                  onChange={(e) => {
                    setSigninData({ ...signinData, password: e.target.value });
                  }}
                  value={signinData.password}
                  autoComplete="off"
                />
              </label>
            </form>
            <br />

            <Button
              type="submit"
              className="final_signin_button"
              size="small"
              color="primary"
              onClick={handleSignin}
              variant="contained"
            >
              SIGN IN
            </Button>
          </div>
          {/* SIGN UP */}
          <div className="signup">
            <div className="signup_top">
              <p>Dont have an account ?</p>
              <h2>Register</h2>
            </div>
            <label>
              <i className="fas fa-user" />
              <input
                style={{ textTransform: "lowercase" }}
                className="input_signup"
                type="text"
                placeholder="Username"
                onChange={(e) => {
                  setSignupData({ ...signupData, username: e.target.value });
                }}
                onKeyDown={handleKeyDown}
                value={signupData.username}
                autoComplete="off"
              />
            </label>
            <label>
              <i className="fas fa-envelope" />

              <input
                className="input_signup"
                type="email"
                placeholder="Email"
                onChange={(e) => {
                  setSignupData({ ...signupData, email: e.target.value });
                }}
                value={signupData.email}
                autoComplete="off"
              />
            </label>
            <br />
            <form>
              <label>
                <i className="fas fa-lock" />
                <input
                  className="input_signup"
                  type="password"
                  placeholder="Password"
                  onChange={(e) => {
                    setSignupData({ ...signupData, password: e.target.value });
                  }}
                  value={signupData.password}
                  autoComplete="off"
                />
              </label>
              <label>
                <i className="fas fa-lock" />
                <input
                  className="input_signup"
                  type="password"
                  placeholder="Confirm Password"
                  onChange={(e) => {
                    setSignupData({ ...signupData, cpassword: e.target.value });
                  }}
                  value={signupData.cpassword}
                  autoComplete="off"
                />
              </label>
            </form>
            <br />

            <Button
              type="submit"
              className="signup_button"
              variant="contained"
              onClick={handleRegister}
              color="success"
            >
              Register
            </Button>
          </div>
        </div>
        {/* <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert severity="error">This is an error alert — check it out!</Alert>
        </Stack> */}
      </div>
    </>
  );
};

export default Auth;
