import React, { useEffect, useState, useContext } from "react";
import {
  Card,
  CardBody,
  CardImg,
  CardTitle,
  CardText,
  Badge,
} from "reactstrap";
import { Link, useHistory } from "react-router-dom";
import moment from "moment";
import "../style/profile.css";
import {
  Dialog,
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Tooltip,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
// import Cookies from "universal-cookie";
import axios from "axios";
import { Api } from "../API/Api";
import UpdateProfile from "./UpdateProfile";
import { UserContext } from "../App";

const Profile = ({ match }) => {
  const {
    state: { profileUpdateStatus, signinStatus },
    dispatch,
  } = useContext(UserContext);

  // const cookies = new Cookies();
  const history = useHistory();

  const [userData, setUserData] = useState({});
  const [userBlogs, setUserBlogs] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [impActions, setImpActions] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getProfile = async () => {
    try {
      const res = await axios.post(`${Api.URL}/get_user/${match.params.id}`);
      //console.log(res.data.blogs);
      setUserData(res.data.user);
      setUserBlogs(res.data.blogs);

      // if (cookies.get("uid") === res.data.user._id) {
      //   setImpActions(true);
      // }
      if (localStorage.getItem("uid") === res.data.user._id) {
        setImpActions(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const logoutUser = async () => {
    try {
      // const uid = cookies.get("uid");
      // const token = cookies.get("token");
      const uid = localStorage.getItem("uid");
      const token = localStorage.getItem("token");

      const data = {
        uid: uid,
        token: token,
      };

      const res = await axios.post(`${Api.URL}/logout `, data);

      console.log(res);

      if (res.status === 200) {
        // cookies.remove("uid");
        // cookies.remove("token");

        localStorage.removeItem("uid");
        localStorage.removeItem("token");

        dispatch({ signinStatus: !signinStatus });
        history.push("/signin");
        console.log("log out success");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProfile();
  }, [match.params.id, profileUpdateStatus]);

  const imgPre = userData.profilepic
    ? `${Api.URL}/${userData.profilepic}`
    : null;
  return (
    <>
      <div className="profile">
        <div className="profile_pic">
          <img
            src={imgPre || "/images/blank-profile.png"}
            alt="profilepic"
            id="user_profile_pic"
          />
        </div>
        <div className="user_name">
          <span>{userData.username}</span>
        </div>

        {impActions ? (
          <div className="full_blog_icons">
            <UpdateProfile
              uid={userData._id}
              uname={userData.username}
              profilepic={imgPre}
            />

            <Tooltip title="Logout">
              <Button
                variant="outlined"
                color="error"
                onClick={handleClickOpen}
                sx={{ marginLeft: 2 }}
              >
                <LogoutIcon sx={{ fontSize: 15 }} />
              </Button>
            </Tooltip>
          </div>
        ) : null}

        <hr />
        <div className="user_blogs">
          {userBlogs.length > 0 ? (
            userBlogs.map((blogs, index) => {
              const blogImg = blogs.blogImage
                ? Api.URL + "/" + blogs.blogImage
                : "/images/blank-blogpic.jpg";
              return (
                <div className="particular_blog" key={index}>
                  <Card>
                    <CardBody>
                      <CardTitle className="mini_blog_username">
                        {userData.username}{" "}
                        <Badge
                          color="success"
                          className="mini_blog_category_badge"
                        >
                          {blogs.blogCategory}
                        </Badge>
                      </CardTitle>

                      <p className="mini_blog_date">
                        {moment(blogs.blogTime).fromNow()}
                      </p>
                    </CardBody>
                    <Link to={`/full_blog/${blogs._id}`}>
                      <CardImg
                        id="mini_blog_image"
                        width="100%"
                        src={blogImg}
                        alt="Card image cap"
                      />
                      <CardBody>
                        <CardTitle className="mini_blog_title">
                          {blogs.blogTitle}
                        </CardTitle>

                        <CardText className="mini_blog_description">
                          {blogs.blogDescription}
                        </CardText>
                      </CardBody>
                    </Link>
                  </Card>
                </div>
              );
            })
          ) : (
            <p style={{ textAlign: "center", fontWeight: "500" }}>
              No Blogs Yet
            </p>
          )}
        </div>
      </div>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Are you sure you want to Logout ?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            If you logout your account will be romoved from this device and you
            have to relogin to access the sevices.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>cancel</Button>

          <Button variant="outlined" color="error" onClick={logoutUser}>
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Profile;
