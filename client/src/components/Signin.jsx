import React, { useState } from "react";
import "../style/signin.css";
import { Button } from "reactstrap";

const Signin = () => {
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  console.log(signupData);
  return (
    <>
      <div className="signin_main">
        <div className="signin_container">
          <div className="signin">
            <div className="signin_top">
              <p>Already regestered ?</p>
              <h2>Sign in</h2>
            </div>

            <i className="fas fa-envelope" />
            <input
              className="input_signin"
              type="email"
              placeholder="Your Email"
            />
            <br />

            <i className="fas fa-lock" />
            <input
              className="input_signin"
              type="password"
              placeholder="Password"
            />
            <br />

            <Button className="final_signin_button" size="sm" color="primary">
              SIGN IN
            </Button>
          </div>

          {/* SIGN UP */}

          <div className="signup">
            <div className="signup_top">
              <p>Dont have an account ?</p>
              <h2>Register</h2>
            </div>

            <i className="fas fa-user" />
            <input
              className="input_signup"
              type="text"
              placeholder="Your Name"
              onChange={(e) => {
                setSignupData({ ...signupData, name: e.target.value });
              }}
            />

            <i className="fas fa-envelope" />
            <input
              className="input_signup"
              type="email"
              placeholder="Your Email"
              onChange={(e) => {
                setSignupData({ ...signupData, email: e.target.value });
              }}
            />
            <br />

            <i className="fas fa-lock" />
            <input
              className="input_signup"
              type="password"
              placeholder="Password"
              onChange={(e) => {
                setSignupData({ ...signupData, password: e.target.value });
              }}
            />
            <i className="fas fa-lock" />
            <input
              className="input_signup"
              type="password"
              placeholder="Confirm Password"
              onChange={(e) => {
                setSignupData({ ...signupData, cpassword: e.target.value });
              }}
            />
            <br />

            <Button className="signup_button" color="success">
              Register
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signin;
