import React, { useState } from "react";
import "../style/auth.css";
import { Button } from "reactstrap";
import { Api } from "../API/Api";

const Auth = () => {
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const [signinData, setSigninData] = useState({
    email: "",
    password: "",
  });

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const { name, email, password, cpassword } = signupData;

      if (!name || !email || !password || !cpassword) {
        window.alert("please fill all feilds");
      } else if (password != cpassword) {
        window.alert("passwords do not match");
      } else {
        const res = await fetch(`${Api.BASE_URL}/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(signupData),
        });
        if (res.status === 422) {
          console.log("User already exist");
          window.alert("User already exist");
        } else if (res.status === 201) {
          window.alert("User Resistered Successfully, Now signin to continue");
          console.log("user registered successfully");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignin = async (e) => {
    e.preventDefault();

    try {
      const { email, password } = signinData;

      if (!email || !password) {
        window.alert("Please fill all fields");
      } else {
        const res = await fetch(`${Api.BASE_URL}/signin`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(signinData),
        });
        if (res.status === 422) {
          window.alert("Invalid Credentials");
        } else {
          window.alert("Logged in successfully");
        }
      }
    } catch (error) {
      console.log(error);
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

            <i className="fas fa-envelope" />
            <input
              className="input_signin"
              type="email"
              placeholder="Your Email"
              onChange={(e) => {
                setSigninData({ ...signinData, email: e.target.value });
              }}
              value={signinData.email}
            />
            <br />

            <i className="fas fa-lock" />
            <input
              className="input_signin"
              type="password"
              placeholder="Password"
              onChange={(e) => {
                setSigninData({ ...signinData, password: e.target.value });
              }}
              value={signinData.password}
            />
            <br />

            <Button
              type="submit"
              className="final_signin_button"
              size="sm"
              color="primary"
              onClick={handleSignin}
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

            <i className="fas fa-user" />
            <input
              className="input_signup"
              type="text"
              placeholder="Your Name"
              onChange={(e) => {
                setSignupData({ ...signupData, name: e.target.value });
              }}
              value={signupData.name}
            />

            <i className="fas fa-envelope" />

            <input
              className="input_signup"
              type="email"
              placeholder="Your Email"
              onChange={(e) => {
                setSignupData({ ...signupData, email: e.target.value });
              }}
              value={signupData.email}
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
              value={signupData.password}
            />
            <i className="fas fa-lock" />
            <input
              className="input_signup"
              type="password"
              placeholder="Confirm Password"
              onChange={(e) => {
                setSignupData({ ...signupData, cpassword: e.target.value });
              }}
              value={signupData.cpassword}
            />
            <br />

            <Button
              type="submit"
              className="signup_button"
              color="success"
              onClick={handleRegister}
            >
              Register
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Auth;
