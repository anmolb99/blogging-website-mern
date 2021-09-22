import axios from "axios";
import React, { useEffect } from "react";
import { useHistory } from "react-router";
import { Api } from "../API/Api";
import Cookies from "universal-cookie";

const LogOut = () => {
  const history = useHistory();
  const cookies = new Cookies();

  const logoutPage = async () => {
    try {
      const token = cookies.get("token");
      const data = {
        jwt: token,
      };
      const res = await axios.post(`${Api.URL}/logout`, data);

      console.log(res);

      if (res.status === 200) {
        cookies.remove("token");
        cookies.remove("username");
        history.push("/signin");
        console.log("log out success");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    logoutPage();
  }, []);

  return <div></div>;
};

export default LogOut;
