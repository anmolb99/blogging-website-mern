import React, { useEffect, useState } from "react";
import "../style/detailview.css";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { Api } from "../API/Api";
import moment from "moment";
import Cookies from "universal-cookie";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const DetailView = ({ match }) => {
  const [impActions, setImpActions] = useState(false);
  const cookies = new Cookies();
  const [open, setOpen] = React.useState(false);
  const [blog, setBlog] = useState({});

  const history = useHistory();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getBlog = async () => {
    const token = {
      jwt: cookies.get("token"),
    };
    const rootId = cookies.get("uid");

    try {
      const res = await axios.post(
        `${Api.URL}/particular_blog/${match.params.id}`,
        token
      );
      //console.log(res);
      setBlog(res.data);
      if (rootId === res.data.blogOwnerId) {
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
    : "https://media.istockphoto.com/photos/white-rough-paper-texture-background-picture-id672541502?k=20&m=672541502&s=170667a&w=0&h=GIS9KEBncPrIV81ULxaEURlfJq5-4cBWDwqemhkq8q0=";

  return (
    <>
      <div className="detailview">
        <div className="full_blog_image">
          <img id="full_blog_image" src={blogImg} alt="not found" />
        </div>

        {impActions ? (
          <div className="full_blog_icons">
            <Link to={`/edit_blog/${blog._id}`}>
              <i className="fas fa-edit"></i>
            </Link>

            <i className="fas fa-trash" onClick={handleClickOpen}></i>
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
                {" "}
                {blog.blogUsername}{" "}
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
