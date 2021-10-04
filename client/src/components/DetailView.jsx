import React, { useEffect, useState } from "react";
import "../style/detailview.css";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { Api } from "../API/Api";
import moment from "moment";
// import Cookies from "universal-cookie";

import {
  Dialog,
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Tooltip,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import NavTop from "./Navbar";

const DetailView = ({ match }) => {
  const [impActions, setImpActions] = useState(false);
  // const cookies = new Cookies();
  const [open, setOpen] = React.useState(false);
  const [blog, setBlog] = useState({});
  const [blogAdmin, setBlogAdmin] = useState({});

  const history = useHistory();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getBlog = async () => {
    const token = {
      // jwt: cookies.get("token"),
      jwt: localStorage.getItem("token"),
    };
    // const rootId = cookies.get("uid");
    const rootId = localStorage.getItem("uid");

    try {
      const res = await axios.post(
        `${Api.URL}/particular_blog/${match.params.id}`,
        token
      );
      // console.log(res);
      setBlog(res.data.blog);
      setBlogAdmin(res.data.user);
      if (rootId === res.data.blog.blogOwnerId) {
        setImpActions(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteBlog = async (id) => {
    try {
      const res = await axios.delete(`${Api.URL}/delete_blog/${id}`);
      console.log(res);
      setOpen(false);
      if (res.status === 200) {
        window.alert("Blog Deleted Successfuly");
        handleClose();
        history.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBlog();
  }, []);

  const blogImg = blog.blogImage
    ? Api.URL + "/" + blog.blogImage
    : "/images/blank-blogpic.jpg";

  return (
    <>
      <div className="detailview">
        <div className="full_blog_image">
          <img id="full_blog_image" src={blogImg} alt="not found" />
        </div>

        {impActions ? (
          <div className="full_blog_icons">
            <Link to={`/edit_blog/${blog._id}`}>
              <Tooltip title="Edit Blog">
                <Button variant="contained">
                  <EditIcon sx={{ fontSize: 17 }} />
                </Button>
              </Tooltip>
            </Link>

            <Tooltip title="Delete Blog">
              <Button
                variant="outlined"
                onClick={handleClickOpen}
                sx={{ marginLeft: 2 }}
                color="error"
              >
                <DeleteIcon sx={{ fontSize: 17 }} />
              </Button>
            </Tooltip>
          </div>
        ) : null}

        <div className="full_blog_title">
          <h2>{blog.blogTitle}</h2>
        </div>

        <div className="full_blog_description">
          <p>{blog.blogDescription}</p>
        </div>
        <div className="full_blog_other_details">
          <div className="full_blog_author">
            <p>
              Author-{" "}
              <span className="full_blog_author_name">
                <Link to={`/profile/${blog.blogOwnerId}`}>
                  {blogAdmin.username}{" "}
                </Link>
              </span>
            </p>
          </div>
          <div className="full_blog_date">
            <p> Publish Date- {moment(blog.blogTime).format("LL")}</p>
          </div>
        </div>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Delete Blog</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this blog ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>cancel</Button>

          <Button autoFocus onClick={() => deleteBlog(blog._id)}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DetailView;
