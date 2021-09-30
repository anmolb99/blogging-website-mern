import React, { useEffect, useState, useContext } from "react";
import {
  Card,
  CardBody,
  CardImg,
  CardTitle,
  CardText,
  Badge,
} from "reactstrap";
import { Link } from "react-router-dom";
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
import Cookies from "universal-cookie";
import axios from "axios";
import { Api } from "../API/Api";
import UpdateProfile from "./UpdateProfile";
import { UserContext } from "../App";

const Profile = ({ match }) => {
  const {
    state: { profileUpdateStatus },
    dispatch,
  } = useContext(UserContext);

  const cookies = new Cookies();

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

      if (cookies.get("uid") === res.data.user._id) {
        setImpActions(true);
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
          {userBlogs.map((blogs, index) => {
            const blogImg = blogs.blogImage
              ? Api.URL + "/" + blogs.blogImage
              : "https://media.istockphoto.com/photos/white-rough-paper-texture-background-picture-id672541502?k=20&m=672541502&s=170667a&w=0&h=GIS9KEBncPrIV81ULxaEURlfJq5-4cBWDwqemhkq8q0=";
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
          })}
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
          <Link to="/logout">
            <Button variant="outlined" color="error">
              Logout
            </Button>
          </Link>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Profile;
